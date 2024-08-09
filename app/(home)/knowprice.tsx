import { View, Text, TextInput, SafeAreaView, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { ScrollView } from 'react-native';

export default function Knowprice() {
  const [text, setText] = useState('');

  return (
    <ScrollView contentContainerStyle={styles.container}>
    <SafeAreaView style={styles.container}>
      <TextInput
        editable
        placeholder='Enter your house size'
        onChangeText={text => setText(text)}
        style={styles.input}
        value={text}
      />
      <Text style={styles.text}>You entered: {text}</Text>
    </SafeAreaView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  
  container: {
    flexGrow: 1,
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 8,
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
  },
})
