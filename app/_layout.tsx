import React from 'react';
import { View, Text, Image, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { Stack } from 'expo-router';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import {store} from '../redux/store';
import { useRouter } from 'expo-router';
import { useDispatch,useSelector } from 'react-redux';
const CustomHeader = ({ options }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, status } = useSelector(state => state.auth);
  return (
    <View style={styles.headerContainer}>
         {!user ? (
        <TouchableOpacity style={styles.loginButton} onPress={() => router.push('/Login')}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
      ) : (
        <Image
          source={require('../assets/images/blank-profile.webp')}
          style={styles.leftImage}
        />
      )}
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
  loginButton: {
    display:"flex",
    padding: 10,
    borderRadius: 5,
    alignContent:"flex-end",
    alignItems:"flex-end",
    top:"1%"
  },
  loginText: {
    color: '#007bff',
    fontSize: 16,
  },
});
