import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import React, { useCallback, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from 'react-native-paper';
import { Link, useRouter } from 'expo-router';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { account } from "../appwrite/appwrite";
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ID } from 'react-native-appwrite';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
  confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Required'),
});

export default function Register() {
  const router = useRouter();
  const [buttonColor, setButtonColor] = useState('#007bff');
  const handlePressIn = useCallback(() => setButtonColor('#0056b3'), []);
  const handlePressOut = useCallback(() => setButtonColor('#007bff'), []);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#070475', '#333190', '#1814CF']}
        style={styles.linearGradient}
      >
        <Text style={styles.gradientText}>Sign up to your account</Text>
        <Text style={styles.gradientsubtext}>Welcome to property house</Text>
        <View style={[styles.circle, { top: "-8%", left: "75%" }]} />
        <View style={[styles.circle, { top: "20%", right: "2%" }]} />
        <View style={[styles.circle, { top:"10%", left: "-20%" }]} />
      </LinearGradient>

      <View style={styles.logincontainer}>
        <ScrollView contentContainerStyle={styles.formContainer}>
          <Formik
            initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting, setErrors }) => {
              try {
                await account.create(ID.unique(), values.email, values.password, values.name);
                Toast.show({
                  type: 'success',
                  position: 'top',
                  text1: 'Success',
                  text2: 'Account created successfully!',
                  visibilityTime: 3000,
                  autoHide: true,
                });
                await AsyncStorage.setItem("details", JSON.stringify(values));
                router.push('/Login'); // Navigate to Login screen
              } catch (error) {
                setErrors({ email: 'Failed to create session' });
                Toast.show({
                  type: 'error',
                  position: 'top',
                  text1: 'Error',
                  text2: 'Failed to create account!',
                  visibilityTime: 3000,
                  autoHide: true,
                });
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <>
                <View style={styles.inputContainer}>
                  <Text>Name</Text>
                  <TextInput
                    style={styles.textInput}
                    onChangeText={handleChange('name')}
                    onBlur={handleBlur('name')}
                    value={values.name}
                  />
                  {touched.name && errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
                </View>
                <View style={styles.inputContainer}>
                  <Text>Email</Text>
                  <TextInput
                    style={styles.textInput}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                  />
                  {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
                </View>
                <View style={styles.inputContainer}>
                  <Text>Password</Text>
                  <TextInput
                    style={styles.textInput}
                    secureTextEntry
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                  />
                  {touched.password && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
                </View>
                <View style={styles.inputContainer}>
                  <Text>Confirm Password</Text>
                  <TextInput
                    style={styles.textInput}
                    secureTextEntry
                    onChangeText={handleChange('confirmPassword')}
                    onBlur={handleBlur('confirmPassword')}
                    value={values.confirmPassword}
                  />
                  {touched.confirmPassword && errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
                </View>
                <Button
                  mode="contained"
                  onPressIn={handlePressIn}
                  onPressOut={handlePressOut}
                  onPress={handleSubmit}
                  style={[styles.button, { backgroundColor: buttonColor }]}
                >
                  <Text>Register</Text>
                </Button>
                <Link href="/Login">Already have an account?</Link>
              </>
            )}
          </Formik>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  linearGradient: {
    width: "100%",
    height: "35%",  // Retain the height from the previous design
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradientText: {
    color: '#D0CFCF',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 40,
  },
  gradientsubtext: {
    color: '#D0CFCF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  logincontainer: {
    flex: 1,
    padding: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: '#f5f5f5',
    width: '100%',
  },
  formContainer: {
    paddingVertical: 20,
    flexGrow: 1,
    justifyContent: 'center',  // Center the form within the available space
  },
  inputContainer: {
    marginVertical: 10,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
  button: {
    marginTop: 20,
  },
  circle: {
    position: "absolute",
    width: 150,
    height: 150,
    borderRadius: 100,
    backgroundColor: "rgba(12,11,58,0.25)",
  },
});
