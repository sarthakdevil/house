import React from 'react';
import { View, Text, Image, StyleSheet, StatusBar, TouchableOpacity, Pressable } from 'react-native';
import { Stack } from 'expo-router';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { useRouter } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/redux/slices/authslice';
import { account } from './appwrite/appwrite';

const CustomHeader = ({ options }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  const handleProfile = () => {
    router.push('/(auth)/profile');
  };

  const handleLogout = async () => {
    await account.deleteSession('current');
    dispatch(logout()); // Dispatch logout action
    router.push('/Login');
    Toast.show({ type: 'success', text1: 'Logged out successfully' });
  };

  return (
    <View style={styles.headerContainer}>
      {!user ? (
        <TouchableOpacity style={styles.loginButton} onPress={() => router.push('/Login')}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
      ) : (
        <Pressable onPress={handleProfile}>
          <Image
            source={require('../assets/images/blank-profile.webp')}
            style={styles.leftImage}
          />
        </Pressable>
      )}
      <Image 
        source={require('../assets/images/favicon.png')}
        style={styles.centerImage}
      />
      {!user ? null : (
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default function RootLayout() {
  return (
    <Provider store={store}>
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
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="(home)"
          options={{
            title: 'Home',
          }}
        />
      </Stack>
      <Toast />
    </Provider>
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
    borderRadius: 100,
  },
  centerImage: {
    width: 30, // Adjust the size as needed
    height: 30,
    resizeMode: 'contain',
  },
  loginButton: {
    display: "flex",
    padding: 10,
    borderRadius: 5,
    alignContent: "flex-end",
    alignItems: "flex-end",
    top: "1%",
  },
  loginText: {
    color: '#007bff',
    fontSize: 16,
  },
  logoutText: {
    color: "#C8102E",
    fontSize: 16,
  }
});
