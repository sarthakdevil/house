import { View, Text,Image, StyleSheet } from 'react-native'
import React from 'react'

export default function Profile() {
  return (
    <View>
        <view className='profilecontainer'>
        <Image
          source={require('../assets/images/blank-profile.webp')}
          style={styles.profileImage}
        />
        
        </view>
    </View>
  )
}
const styles = StyleSheet.create({
    profileImage: {
        width: 30, // Adjust the size as needed
        height: 30,
        resizeMode: 'contain',
        borderRadius:100
      },
      profilecontainer:{

      }
})