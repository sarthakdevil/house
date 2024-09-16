import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from 'react-native-paper';
import { Link, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';
import { loginFailure, loginRequest, loginSuccess } from '@/redux/slices/authslice';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { account } from '../appwrite/appwrite';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Required'),
});

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [buttonColor, setButtonColor] = useState('#007bff');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('details');
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          if (parsedData?.email && parsedData?.password) {
            Formik.setValues(parsedData);
          }
        }
      } catch (error) {
        console.error('Error parsing JSON from AsyncStorage:', error);
      }
    };
    fetchData();
  }, []);

  const handlePressIn = useCallback(() => setButtonColor('#0056b3'), []);
  const handlePressOut = useCallback(() => setButtonColor('#007bff'), []);

  const handleLogin = useCallback(async (values, { setSubmitting }) => {
    try {
      dispatch(loginRequest());
  
      try {
        // Attempt to create a new session
        const response = await account.createEmailPasswordSession(values.email, values.password);
        
        if (response && response.userId) {
          const user = await account.get(); // Fetches the authenticated user's data
          dispatch(loginSuccess(user)); // Dispatch success action with user data
          Toast.show({
            type: 'success',
            position: 'top',
            text1: 'Success',
            text2: 'Account logged in successfully!',
            visibilityTime: 3000,
            autoHide: true,
          });
          router.push('/(home)');
        }
      } catch (error) {
        if (error.message.includes('session')) {
          // User already exists, so just fetch the user data
          const user = await account.get();
          dispatch(loginSuccess(user)); // Dispatch success action with user data
          Toast.show({
            type: 'info',
            position: 'top',
            text1: 'Welcome back',
            text2: 'You are already logged in!',
            visibilityTime: 3000,
            autoHide: true,
          });
          router.push('/(home)');
        } else {
          throw error; // Re-throw the error if it's not the "User already exists" case
        }
      }
    } catch (error) {
      dispatch(loginFailure(error.message)); // Dispatch failure action on error
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error',
        text2: 'Failed to login: ' + error.message,
        visibilityTime: 3000,
        autoHide: true,
      });
    } finally {
      setSubmitting(false);
    }
  }, [dispatch, router]);
  

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={handleLogin}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
        <View style={styles.container}>
          <LinearGradient
            colors={['#070475', '#333190', '#1814CF']}
            style={styles.linearGradient}
          >
            <Text style={styles.gradientText}>
              Sign in{"\n"}to your account
            </Text>
            <Text style={styles.gradientsubtext}>Welcome to property house</Text>
            <View style={[styles.circle, { top: "-8%", left: "75%" }]} />
            <View style={[styles.circle, { top: "20%", right: "2%" }]} />
            <View style={[styles.circle, { top:"10%", left: "-20%" }]} />
          </LinearGradient>
          
          <View style={styles.logincontainer}>
            <View style={styles.emailcontainer}>
              <Text>Email</Text>
              <TextInput 
                style={styles.textInput}
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
              />
              {errors.email && touched.email && <Text style={styles.errorText}>{errors.email}</Text>}
            </View>
            <View style={styles.passcontainer}>
              <Text>Password</Text>
              <TextInput 
                style={styles.textInput}
                secureTextEntry
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
              />
              {errors.password && touched.password && <Text style={styles.errorText}>{errors.password}</Text>}
            </View>
            <Button
              mode="contained"
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              onPress={handleSubmit}
              style={[styles.button, { backgroundColor: buttonColor }]}
              disabled={isSubmitting}
            >
              <Text style={styles.buttonText}>Login</Text>
            </Button>
            <Link href={"/(auth)/register"}>Not registered?</Link>
          </View>
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'inter',
  },
  linearGradient: {
    width: '100%',
    flex: 1,
  },
  gradientText: {
    position: "relative",
    top: "20%",
    left: "5%",
    color: '#D0CFCF',
    fontSize: 35,
  },
  gradientsubtext: {
    position: "relative",
    top: "20%",
    color: '#D0CFCF',
    left: "5%",
    fontSize: 20,
  },
  logincontainer: {
    position: "absolute",
    height: "60%",
    bottom: 0,
    padding: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: '#f5f5f5',
    width: '100%',
    alignItems: 'center',
  },
  emailcontainer: {
    marginVertical: 10,
    width: '100%',
  },
  passcontainer: {
    marginVertical: 10,
    width: '100%',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
    width: '100%',
  },
  button: {
    justifyContent: "center",
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  circle: {
    position: "absolute",
    width: 150,
    height: 150,
    borderRadius: 100,
    backgroundColor: "rgba(12,11,58,0.25)",
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
});
