import React from 'react'
import { 
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking
 } from 'react-native'
 import { Button } from 'antd-mobile'
 import InphoneXHoc from '../../hoc/inphoneXhoc'

 @InphoneXHoc
 class HotelInfoPage extends React.Component {
   state = {  }
   render() {
     const data = this.props.navigation.state.params
     return (
       <View style={{backgroundColor: '#FFFFFF'}}>
         <Text style={{padding:10,borderBottomWidth:0.5,borderBottomColor:'#d8d8d8',fontSize:16}}>酒店简介</Text>
         <View style={{flexDirection:'row',justifyContent:'space-between',padding:10}}>
            <View>
              <Text>联系方式：{data.telephone}</Text>
            </View>
            <TouchableOpacity 
            style={{flexDirection:'row',backgroundColor: '#ffb354',padding:10,borderRadius:3}}
            onPress={()=>{Linking.openURL(`tel:${data.telephone}`)}}>
              <Image source={require('../../assets/images/telephone_icon.png')}></Image>
              <Text style={{color:'#fff'}}>联系酒店</Text>
            </TouchableOpacity>
         </View>
         <Text style={{padding:10,color:'#616161',lineHeight:20,fontSize:12}}>{data.profiles}</Text>
       </View>
     )
   }
 }
 
 export default HotelInfoPage