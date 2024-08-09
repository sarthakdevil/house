import { View, Text, Image, StyleSheet, Button } from 'react-native';
import React from 'react';
import OffButton from './Off';

export default function HouseCard() {
  return (
    <View style={styles.container}>
      <Image 
        source={require('../assets/images/house.jpeg')} // Adjust the path if needed
        style={styles.image}
      />
      <View style={styles.content}>
      <View style={styles.textContainer}>
        <Text style={styles.price}>price :- 1cr.</Text>  
        <Text style={styles.title}>Title: LOREM IPSUM DOLOR SIT AMET........</Text>   
      </View>
      <OffButton />   
      </View>
      <Button title='buy'></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 330, // Adjust width as needed
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: 'white', // Background color for the card
    shadowColor: '#000', // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.2, // Shadow opacity
    shadowRadius: 4, // Shadow radius
    elevation: 5, // Elevation for Android
    margin: 10, // Margin around the card
  },
  image: {
    width: '100%', // Full width
    height: 200, // Adjust height as needed
    borderRadius: 10,
  },
  textContainer: {
    justifyContent:"space-between",
    padding: 10, // Add padding inside the text container
  },
  price: {
    fontSize: 20,
    color:"#8AA8DE",
    fontWeight: 'bold',
  },
  title: {
    fontSize: 12,
    marginVertical: 5,
  },
  content:{
    display:'flex',
    flexDirection:"row",
  }
});
