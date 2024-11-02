import { TextInput, Button } from 'react-native-paper';
import { View, Image, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { client, database, storage, account } from '../appwrite/appwrite';
import { ID } from 'react-native-appwrite';
import * as FileSystem from 'expo-file-system';

export default function CompleteProfile() {
  const [profilePic, setProfilePic] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    address: '',
    email: '',
  });

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      // Pre-fill form data with user details
      setFormData({
        name: user.name || '',
        age: user.age || '',
        address: user.address || '',
        email: user.email || '',
      });

      // Pre-fill profile picture
      setProfilePic(user?.preferences?.profilePic || 'https://as2.ftcdn.net/v2/jpg/02/15/84/43/1000_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg');
    }
  }, [user]);

  const handleSelectImage = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert('Permission to access gallery is required!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setProfilePic(result.assets[0].uri);
    }
  };

  const handleTakePhoto = async () => {
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      alert('Permission to access camera is required!');
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setProfilePic(result.assets[0].uri);
    }
  };

  const handleInputChange = (name, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const fileUri = profilePic;
      const fileName = fileUri.split('/').pop();
      const fileType = fileName.split('.').pop();
      const fileContent = await FileSystem.readAsStringAsync(fileUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const fileBlob = new Blob([fileContent], { type: `image/${fileType}` });

      const fileUploadResponse = await storage.createFile(
        '66c7648a00005b91c03e',
        ID.unique(),
        fileBlob
      );

      const profilePicUrl = storage.getFileView(
        '66c7648a00005b91c03e',
        fileUploadResponse.$id
      );

      const documentResponse = await database.createDocument(
        '66e86b4e0030630221d6',
        '66e86b74003536d8f648',
        ID.unique(),
        {
          name: formData.name,
          age: formData.age,
          address: formData.address,
          email: formData.email,
          profilePic: profilePicUrl,
        }
      );
      const documentId = documentResponse.$id;

      const userPreferences = {
        ...user.preferences,
        userdetails: documentId,
      };

      const updateResponse = await account.updatePrefs(userPreferences);
      console.log('User preferences updated:', updateResponse);

      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error uploading data:', error);
      alert('Error updating profile.');
    }
  };

  return (
    <View style={styles.profile}>
      {profilePic ? (
        <Image
          source={{ uri: profilePic }}
          style={[{ width: 100, height: 100, borderRadius: 50, marginBottom: 10 }, styles.profileimage]}

        />
      ) : (
        <View style={{ width: 100, height: 100, borderRadius: 50, marginBottom: 10, backgroundColor: 'gray' }} />
      )}
      <View style={styles.items}>
      <View style={styles.buttoncontainer}>
        <Button mode="contained" onPress={handleSelectImage}>
          Select from Gallery
        </Button>
        <Button mode="contained" onPress={handleTakePhoto}>
          Take a Photo
        </Button>
      </View>
      <TextInput
        label="Name"
        value={formData.name}
        onChangeText={(text) => handleInputChange('name', text)}
        style={{ marginBottom: 10 }}
      />
      <TextInput
        label="Age"
        value={formData.age}
        onChangeText={(text) => handleInputChange('age', text)}
        style={{ marginBottom: 10 }}
      />
      <TextInput
        label="Address"
        value={formData.address}
        onChangeText={(text) => handleInputChange('address', text)}
        style={{ marginBottom: 10 }}
      />
      <TextInput
        label="Email"
        value={formData.email}
        onChangeText={(text) => handleInputChange('email', text)}
        style={{ marginBottom: 10 }}
      />
      <TextInput
        label="Phone number"
        value={formData.number}
        onChangeText={(text) => handleInputChange('Phone number', text)}
        style={{ marginBottom: 10 }}
      />
      <Button mode="contained" onPress={handleSubmit}>
        Submit
      </Button>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  profile: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent:"center",
    width:"100%",
    gap: 10,
    backgroundColor:"rgba(135, 206, 235,0.8)"
  },
  buttoncontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  profileimage:{
    display:"flex",
    alignContent:"center",
    alignSelf:"center",
    top:"15%",
    zIndex:99,
  },
  items:{
    position:"relative",
    width:"100%",
    height:"90%",
    top:"10%",
    gap:10,
    paddingTop:"10%",
    paddingHorizontal:"2%",
    alignSelf:"center",
    backgroundColor:"white",
    borderTopLeftRadius:20,
    borderTopRightRadius:20
  }
});
