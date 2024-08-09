import React from 'react';
import { View, Text, Image, StyleSheet, StatusBar } from 'react-native';
import { Stack } from 'expo-router';
import Toast from 'react-native-toast-message';
const CustomHeader = ({ options }) => {
  return (
    <View style={styles.headerContainer}>
      <Image 
        source={require('../assets/images/blank-profile.webp')}
        style={styles.leftImage}
      />
      <Image 
        source={require('../assets/images/favicon.png')}
        style={styles.centerImage}
      />
      <Text style={styles.headerTitle}>{options.title || "Default Title"}</Text>
    </View>
  );
};

export default function RootLayout() {
  return (
    <>
      <StatusBar
        barStyle="light-content" // Set the text color to light for better contrast
        backgroundColor="rgba(203, 23, 218, 0.34)" // Set the background color of the status bar
      />
      <Stack
        screenOptions={{
          header: (props) => <CustomHeader {...props} />, // Use the custom header component
        }}
      >
      <Stack.Screen
          name="(auth)"
          options={{headerShown:false}}
        />
        
        <Stack.Screen
          name="(home)"
          options={{
            title: 'Home',
          }}
        />
      </Stack>
      <Toast/>
    </>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    backgroundColor: 'skyblue',
    padding: 10,
    height: 100, // Adjust the height as needed
  },
  leftImage: {
    width: 30, // Adjust the size as needed
    height: 30,
    resizeMode: 'contain',
    borderRadius:100
  },
  centerImage: {
    width: 30, // Adjust the size as needed
    height: 30,
    resizeMode: 'contain',
  },
  headerTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
