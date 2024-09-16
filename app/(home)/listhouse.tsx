import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { Button, RadioButton, TextInput } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'expo-router';
import Toast from 'react-native-toast-message';

export default function Listhouse() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, status } = useSelector((state) => state.auth);
  const handlesubmit=()=>{
    
  }
  const [formData, setFormData] = useState({
    size: '',
    bedroom: '',
    bathroom: '',
    stories: '',
    nearMainRoad: true,  // Now storing as true/false
  });

  const handleInputChange = (name, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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
    } else {
      console.log('User is logged in:', user);
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
          label="House size"
          placeholder="Enter your house size"
          onChangeText={(text) => handleInputChange('size', text)}
          style={styles.input}
          value={formData.size}
        />
        <TextInput
          editable
          mode="outlined"
          label="Bedrooms"
          placeholder="Enter number of bedrooms"
          onChangeText={(text) => handleInputChange('bedroom', text)}
          style={styles.input}
          value={formData.bedroom}
        />
        <TextInput
          editable
          mode="outlined"
          label="Bathrooms"
          placeholder="Enter number of bathrooms"
          onChangeText={(text) => handleInputChange('bathroom', text)}
          style={styles.input}
          value={formData.bathroom}
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
        <Button
        onPress={handlesubmit}
        >Submit</Button>
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
});
