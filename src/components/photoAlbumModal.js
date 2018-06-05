import React from 'react'
import { 
  View,
  Text,
  Image,
  Modal,
  TouchableHighlight
 } from 'react-native'
 import ImageSlider from 'react-native-image-slider'

 
 export default function PhotoAlbumModal(props) {
   return (
    <Modal
    animationType={"fade"}
    transparent={true}
    visible={props.visible}
    >
    <TouchableHighlight style={{flex:1}} onPress={props.onClose}>
      <View style={{flex:1,backgroundColor: '#000'}}>
        
      </View>
    </TouchableHighlight>
    <View style={{position:'absolute',left:0,right:0,top:'50%',height:220,transform:[{translateY:-110}]}}>
    <ImageSlider images={props.pics} />
      </View>
  </Modal>
   )
 }