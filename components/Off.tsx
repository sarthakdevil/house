import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

export default function OffButton() {
  return (
    <View style={styles.container}>
      <Text style={styles.off}>15% off</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  off: {
    color: "#8AA8DE",
    fontSize: 12, // Adjust font size as needed
    textAlign: 'center', // Center text
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "rgb(138,168,222,0.4)", // Slightly transparent background
    borderColor: "#8AA8DE", // Solid border color
    borderWidth: 1, // Add border width
    borderRadius: 5,
    paddingHorizontal: 10, // Add horizontal padding
    marginRight: 20, // Optional margin to space out from other elements
    marginVertical:20,
  }
});
