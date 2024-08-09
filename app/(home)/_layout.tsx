import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'skyblue',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: 'white',
          borderTopWidth: 0,
          shadowOpacity: 0.25,
          shadowOffset: { width: 0, height: 2 },
          shadowColor: '#000',
          elevation: 50,
          borderRadius: 10,
          height: 55,
          bottom:10,
          width:'95%',
          alignSelf:'center'
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: 'bold',
        },
        tabBarItemStyle: {
          paddingVertical: 5,
        }, 
        headerShown: false
      }}

    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="home" size={18} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="knowprice"
        options={{
          title: 'Price of Your House',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="dollar" size={18} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="listhouse"
        options={{
          title: 'List Your House',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="list" size={18} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

// Additional styles for screen content
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
