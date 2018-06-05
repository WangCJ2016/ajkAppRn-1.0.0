import React from 'react'
import { 
  View,
  Image,
  Text
 } from 'react-native'

export default function BlankPage() {
  return (
    <View style={{flex: 1,backgroundColor:'#fff',justifyContent:'center',alignItems:'center'}}>
      <Image source={require('../assets/images/kongbai.png')}></Image>
      <Text style={{fontSize:18,color:'#333',marginTop: 10}}>列表空空如也</Text>
    </View>
  )
}