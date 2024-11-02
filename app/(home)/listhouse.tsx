import { View, Text, SafeAreaView, StyleSheet, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { Button, RadioButton, TextInput } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { useRouter } from 'expo-router';
import Toast from 'react-native-toast-message';
import * as ImagePicker from 'expo-image-picker';
import {storage} from "../firebase/firebase.js"

export default function Listhouse() {
  const router = useRouter();
  const { user, status } = useSelector((state) => state.auth);
  
  const [formData, setFormData] = useState({
    size: '',
    bedroom: '',
    bathroom: '',
    stories: '',
    nearMainRoad: true,
    houseImage: null,
  });

  const handlesubmit = async () => {
    try {
      if (formData.houseImage) {
        const fileUri = formData.houseImage;
        const fileName = fileUri.subString(fileUri.lastIndexOf('/') + 1);

        // Create a reference to the file location in Firebase Storage
        const reference = storage().ref(`houses/${fileName}`);

        // Upload the file
        await reference.putFile(fileUri);

        // Get the file URL
        const imageUrl = await reference.getDownloadURL();

        // Prepare data for database submission (implement your database logic)
        const data = {
          size: parseInt(formData.size, 10),
          bedroom: parseInt(formData.bedroom, 10),
          bathroom: parseInt(formData.bathroom, 10),
          stories: parseInt(formData.stories, 10),
          nearMainRoad: formData.nearMainRoad,
          houseImage: imageUrl, // Include the image URL
        };

        // Handle your database submission logic here...

        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'House information submitted successfully!',
          visibilityTime: 3000,
          autoHide: true,
        });

        // Reset form
        setFormData({
          size: '',
          bedroom: '',
          bathroom: '',
          stories: '',
          nearMainRoad: true,
          houseImage: null,
        });
      } else {
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Please upload a house image.',
          visibilityTime: 3000,
          autoHide: true,
        });
      }
    } catch (error) {
      console.error('Error submitting data:', error);
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Submission failed. Please try again.',
        visibilityTime: 3000,
        autoHide: true,
      });
    }
  };

  const handleInputChange = (name, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImagePicker = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Permission to access camera roll is required!',
        visibilityTime: 3000,
        autoHide: true,
      });
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setFormData((prevState) => ({
        ...prevState,
        houseImage: result.assets[0].uri,
      }));
    }
  };

  useEffect(() => {
    if (!user) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'You are not logged in',
        visibilityTime: 3000,
        autoHide: true,
      });
      router.push('/Login');
    }
  }, [user, router]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <SafeAreaView style={styles.container}>
        {status === 'loading' && <Text>Loading...</Text>}
        {!user && <Text>Please log in to see the content</Text>}

        <TextInput
          editable
          mode="outlined"
          label="House size (in acres)"
          placeholder="Enter your house size"
          onChangeText={(text) => handleInputChange('size', text)}
          style={styles.input}
          value={formData.size}
          keyboardType="numeric"
        />
        <TextInput
          editable
          mode="outlined"
          label="Bedrooms"
          placeholder="Enter number of bedrooms"
          onChangeText={(text) => handleInputChange('bedroom', text)}
          style={styles.input}
          value={formData.bedroom}
          keyboardType="numeric"
        />
        <TextInput
          editable
          mode="outlined"
          label="Bathrooms"
          placeholder="Enter number of bathrooms"
          onChangeText={(text) => handleInputChange('bathroom', text)}
          style={styles.input}
          value={formData.bathroom}
          keyboardType="numeric"
        />
        <TextInput
          editable
          mode="outlined"
          label="House stories"
          placeholder="Enter number of stories"
          onChangeText={(text) => handleInputChange('stories', text)}
          style={styles.input}
          value={formData.stories}
        />

        <View>
          <Text>Is your house near to the main road?</Text>
          <View style={styles.radioGroup}>
            <Text>Yes</Text>
            <RadioButton
              value={true}
              status={formData.nearMainRoad === true ? 'checked' : 'unchecked'}
              onPress={() => handleInputChange('nearMainRoad', true)}
            />
            <Text>No</Text>
            <RadioButton
              value={false}
              status={formData.nearMainRoad === false ? 'checked' : 'unchecked'}
              onPress={() => handleInputChange('nearMainRoad', false)}
            />
          </View>
        </View>

        <Button onPress={handleImagePicker} mode="outlined">
          Upload House Picture
        </Button>

        {formData.houseImage && (
          <Image source={{ uri: formData.houseImage }} style={styles.image} />
        )}

        <Button onPress={handlesubmit}>Submit</Button>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    marginBottom: 16,
  },
  radioGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  image: {
    width: 100,
    height: 100,
    marginVertical: 16,
    borderRadius: 8,
    resizeMode: 'cover',
  },
});
