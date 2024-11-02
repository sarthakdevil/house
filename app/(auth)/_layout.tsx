import { Stack } from 'expo-router';
import { View, Text } from 'react-native';
import React from 'react';
import { useFonts } from 'expo-font';
import Toast from 'react-native-toast-message';

export default function Layout() {
  return (
    <>
    <Toast ref={(ref) => Toast.setRef(ref)} />
    <Stack>
      <Stack.Screen
        name="Login" // This will correspond to the "index.js" file inside the folder
        options={{
          headerShown: false, // You can customize header visibility
        }}
      />
      <Stack.Screen
        name="register" // This will correspond to the "details.js" file
        options={{
            headerShown: false, // You can customize header visibility
        }}
      />
            <Stack.Screen
        name="profile" // This will correspond to the "details.js" file
        options={{
            headerShown: false, // You can customize header visibility
        }}
      />
    </Stack>
    </>
  );
}
