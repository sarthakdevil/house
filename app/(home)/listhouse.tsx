import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'expo-router';
import Toast from 'react-native-toast-message';

export default function Listhouse() {
  const router = useRouter(); // Renamed from `navigation` to `router`
  const dispatch = useDispatch();
  const { user, status } = useSelector(state => state.auth);

  useEffect(() => {
    if (!user) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'You are not logged in',
        visibilityTime: 3000,
        autoHide: true,
      });
      // Navigate to login page
      router.push('/Login'); // Use `router.push` for navigation
    } else {
      console.log('User is logged in:', user);
    }
  }, [user, router]); // Include `router` in dependencies

  return (
    <View>
      <Text>Listhouse</Text>
      {status === 'loading' && <Text>Loading...</Text>}
      {!user && <Text>Please log in to see the content</Text>}
    </View>
  );
}
