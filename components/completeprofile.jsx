import { View, Text, Image, TextInput, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { Client, ID, Databases, Storage, Account } from 'appwrite';

export default function CompleteProfile() {
  const [profilePic, setProfilePic] = useState("");
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    address: '',
    email: '',
  });

  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  const client = new Client();
  const storage = new Storage(client);
  const database = new Databases(client);
  const account = new Account(client);

  client
    .setEndpoint('YOUR_APPWRITE_ENDPOINT') // Replace with your Appwrite endpoint
    .setProject('YOUR_PROJECT_ID'); // Replace with your Appwrite project ID

  useEffect(() => {
    if (user?.preferences?.profile) {
      setProfilePic(user.profile);
    } else {
      setProfilePic('https://cloud.appwrite.io/v1/storage/buckets/66c7648a00005b91c03e/files/66c7669600016b6af7de/view?project=66b61304002acfa544c9&mode=admin');
    }
  }, [user]);

  const handleSelectImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, response => {
      if (!response.didCancel && !response.errorCode && response.assets?.[0]?.uri) {
        setProfilePic(response.assets[0].uri);
      }
    });
  };

  const handleTakePhoto = () => {
    launchCamera({ mediaType: 'photo' }, response => {
      if (!response.didCancel && !response.errorCode && response.assets?.[0]?.uri) {
        setProfilePic(response.assets[0].uri);
      }
    });
  };

  const handleInputChange = (name, value) => {
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      // Step 1: Upload the profile picture to Appwrite Storage
      const fileUploadResponse = await storage.createFile(
        '66c7648a00005b91c03e', // Replace with your bucket ID
        ID.unique(),
        profilePic
      );

      const profilePicUrl = storage.getFileView(
        '66c7648a00005b91c03e', 
        fileUploadResponse.$id
      );

      // Step 2: Save the user details along with the profile picture URL to Appwrite Database
      const documentResponse = await database.createDocument(
        'YOUR_DATABASE_ID', // Replace with your database ID
        'YOUR_COLLECTION_ID', // Replace with your collection ID
        ID.unique(),
        {
          name: formData.name,
          age: formData.age,
          address: formData.address,
          email: formData.email,
          profilePic: profilePicUrl, // Save the profile picture URL in the database
        }
      );

      console.log('Document created:', documentResponse);

      // Step 3: Update user preferences in Appwrite's Account with the profile picture URL
      const userPreferences = {
        ...user.preferences,
        profilePic: profilePicUrl, // Add the profile picture URL to user preferences
      };

      const updateResponse = await account.updatePrefs(userPreferences);
      console.log('User preferences updated:', updateResponse);

      // Success message
      alert('Profile updated successfully!');

    } catch (error) {
      console.error('Error uploading data:', error);
      alert('Error updating profile.');
    }
  };

  return (
    <View>
      <Image
        source={{ uri: profilePic }}
        style={{ width: 100, height: 100, borderRadius: 50, marginBottom: 10 }}
      />
      <Button title="Select from Gallery" onPress={handleSelectImage} />
      <Button title="Take a Photo" onPress={handleTakePhoto} />
      
      <TextInput
        placeholder="Name"
        value={formData.name}
        onChangeText={(text) => handleInputChange('name', text)}
        style={{ marginBottom: 10 }}
      />
      <TextInput
        placeholder="Age"
        value={formData.age}
        onChangeText={(text) => handleInputChange('age', text)}
        style={{ marginBottom: 10 }}
      />
      <TextInput
        placeholder="Address"
        value={formData.address}
        onChangeText={(text) => handleInputChange('address', text)}
        style={{ marginBottom: 10 }}
      />
      <TextInput
        placeholder="Email"
        value={formData.email}
        onChangeText={(text) => handleInputChange('email', text)}
        style={{ marginBottom: 10 }}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        style={{ marginBottom: 10 }}
      />
      <Button
        title="Submit"
        onPress={handleSubmit}
      />
    </View>
  );
}
