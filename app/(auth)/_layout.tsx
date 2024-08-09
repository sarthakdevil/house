import { Stack } from 'expo-router';
import { View, Text } from 'react-native';
import React from 'react';

export default function Layout() {
  return (
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
    </Stack>
  );
}
