import { View, Text } from 'react-native'
import React from 'react'

export default function Profile({route, navigation}) {

    const {userName, userEmail, userPassword} = route.params;
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View>
        <Text> Name: {userName} </Text>
        <Text> Email : {userEmail}</Text>
        <Text> Password: {userPassword}</Text>
      </View>
    </View>
  )
}