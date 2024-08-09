import { View, Text, StyleSheet, TextInput } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from 'react-native-paper';
import { Link, useRouter } from 'expo-router';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { account } from "../appwrite/appwrite";
import Toast from 'react-native-toast-message';

// Define validation schema using Yup
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
});

export default function Register() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#070475', '#333190', '#1814CF']}
        style={styles.linearGradient}
      >
        <Text style={styles.gradientText}>Sign up to your account</Text>
        <Text style={styles.gradientsubtext}>Welcome to property house</Text>
        <View style={styles.circle} />
        <View style={styles.circle} />
        <View style={styles.circle} />
      </LinearGradient>
      
      <View style={styles.logincontainer}>
        <Formik
          initialValues={{ email: '', password: '', confirmPassword: '' }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting, setErrors }) => {
            try {
              await account.createEmailPasswordSession(values.email, values.password);
              Toast.show({
                type: 'success',
                position: 'top',
                text1: 'Success',
                text2: 'Account created successfully!',
                visibilityTime: 600,
                autoHide: true,
              });
              router.push('/Login'); // Navigate to Login screen
            } catch (error) {
              setErrors({ email: 'Failed to create session' });
              Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Error',
                text2: 'Failed to create account!',
                visibilityTime: 600,
                autoHide: true,
              });
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <>
              <View style={styles.emailcontainer}>
                <Text>Email</Text>
                <TextInput
                  style={styles.textInput}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                />
                {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
              </View>
              <View style={styles.passcontainer}>
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
              <View style={styles.cpasscontainer}>
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
              <Button style={styles.button} onPress={handleSubmit}>Signup</Button>
              <Link href="/Login">Already have an account?</Link>
            </>
          )}
        </Formik>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  linearGradient: {
    width: "100%",
    flex: 1,
  },
  gradientText: {
    position: "relative",
    top: "25%",
    color: '#D0CFCF',
    fontSize: 28,
    fontWeight: 'bold',
  },
  gradientsubtext: {
    position: "relative",
    top: "25.5%",
    color: '#D0CFCF',
    fontSize: 20,
    fontWeight: 'bold',
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
  cpasscontainer: {
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
    backgroundColor: "green",
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
  circle: {
    position: "absolute",
    top: 10,
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    backgroundColor: "rgb(12,11,58,0.5)",
  },
});
