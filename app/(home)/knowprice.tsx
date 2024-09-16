import { View, Text,SafeAreaView, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { TextInput } from 'react-native-paper';

export default function Knowprice() {
  const [formData, setFormData] = useState({
    size: '',
    bedroom: '',
    bathroom: '',
    stories: '',
    nearMainRoad: true,  // Now storing as true/false
  });

  const handleInputChange = (name, value) => {
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <SafeAreaView style={styles.container}>
        <TextInput
          editable
          mode="outlined"
          label="House size"    
          placeholder='Enter your house size'
          onChangeText={text => handleInputChange('size', text)}
          style={styles.input}
          value={formData.size}
        />
        <TextInput
          editable
          placeholder='Enter your house bedroom'
          mode="outlined"
          label="House size"   
          onChangeText={text => handleInputChange('bedroom', text)}
          style={styles.input}
          value={formData.bedroom}
        />
        <TextInput
          editable
          mode="outlined"
          label="bathrooms"   
          placeholder='Enter your house bathroom'
          onChangeText={text => handleInputChange('bathroom', text)}
          style={styles.input}
          value={formData.bathroom}
        />
        <TextInput
          editable
          mode="outlined"
          label="House stories"   
          placeholder='Enter your house stories'
          onChangeText={text => handleInputChange('stories', text)}
          style={styles.input}
          value={formData.stories}
        />

        <View>
          <Text>Is your house near to main road?</Text>
          <View style={styles.radioGroup}>
            <Text>Yes</Text>
            <RadioButton
              value={true}
              status={formData.nearMainRoad === true ? 'checked' : 'unchecked'}
              onPress={() => handleInputChange('nearMainRoad', true)}
            />
            <Text>No</Text>
            <RadioButton
              value={false}
              status={formData.nearMainRoad === false ? 'checked' : 'unchecked'}
              onPress={() => handleInputChange('nearMainRoad', false)}
            />
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
  input: {

    marginBottom: 16,
    backgroundColor:"rgba(135, 206, 235,0.1)",
  },
  radioGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
