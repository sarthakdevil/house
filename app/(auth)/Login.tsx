import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native';
import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { Button } from 'react-native-paper';
import { Link } from 'expo-router';
import { useSelector, useDispatch } from 'react-redux';
export default function Index() {
  const dispatch = useDispatch();
  const { user, status, error } = useSelector(state => state.auth);
  const [buttonColor, setButtonColor] = useState('#007bff'); 
  const handlePressIn=()=>{
    setButtonColor('#0056b3');
  }
  const handlePressOut=()=>{
    setButtonColor('#0056b3');
  }
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#070475', '#333190', '#1814CF']}
        style={styles.linearGradient}
      >
        <Text style={styles.gradientText}>Sign up to your account</Text>
        <Text style={styles.gradientsubtext}>Welcome to property house</Text>
        {/* Adjust circles' positions as needed */}
        <View style={[styles.circle, { top: 10, left: 10 }]} />
        <View style={[styles.circle, { top: 100, right: 10 }]} />
        <View style={[styles.circle, { bottom: 10, left: 100 }]} />
      </LinearGradient>
      
      <View style={styles.logincontainer}>
        <View style={styles.emailcontainer}>
          <Text>Email</Text>
          <TextInput style={styles.textInput} />
        </View>
        <View style={styles.passcontainer}>
          <Text>Password</Text>
          <TextInput style={styles.textInput} secureTextEntry />
        </View>
        <Button
            mode="contained"
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Login</Text>
          </Button>
          <Link href={"/(auth)/register"}>Not registered</Link>
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
    width: '100%',
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
    justifyContent: "center",
    backgroundColor: "#0C0B3A",
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  circle: {
    position: "absolute",
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    backgroundColor: "rgb(12,11,58,0.5)",
  },
});
