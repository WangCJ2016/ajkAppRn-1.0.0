import React from 'react'
import { 
  View,
  Text
 } from 'react-native'
 
 export default function RectIconCom({width,height,backgroundColor}) {
   return (
     <View style={{width:width,height:height,backgroundColor: backgroundColor,marginRight:10,borderRadius:2}}>
     </View>
    )
 }