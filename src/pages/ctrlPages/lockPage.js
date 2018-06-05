import React from 'react'
import { 
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Image
 } from 'react-native'
 import { connect } from 'react-redux'
import { smartHostCtrl,lockData,elevatorHost } from '../../reducers/ctrl.redux'
import { Toast } from 'antd-mobile'
import { getId } from '../../reducers/user.redux'

@connect(
  state=>({ctrl:state.ctrl,customerId: getId(state)}),
  {
    smartHostCtrl,lockData,elevatorHost
  }
)
 class LockPage extends React.Component {
   state = {  }
   componentDidMount() {
     const houseHostInfo = this.props.ctrl.houseHostInfo
     this.props.lockData({houseId: houseHostInfo.houseId,deviceType:'FINGERPRINT_LOCK'})
   }
   door(){
     const houseHostInfo = this.props.ctrl.houseHostInfo
     const hasInHouse = this.props.ctrl.hasInHouse
    
     const lockDeviceId = this.props.ctrl.lockDeviceId
     this.props.smartHostCtrl({
      customerId: this.props.customerId,
      houseId: houseHostInfo.houseId,
      deviceType: 'FINGERPRINT_LOCK',
      port: houseHostInfo.port,
      deviceId: lockDeviceId,
      subOrderCode: hasInHouse.subOrderCode?hasInHouse.subOrderCode:'-'
     },()=>{
      Toast.info('开锁成功')
     })
   }
   elevator(){
    const hasInHouse = this.props.ctrl.houseHostInfo
    const basement = hasInHouse.basement ? hasInHouse.basement : 0
    const floor = hasInHouse.hotelHouse.floor + basement
     this.props.elevatorHost({hotelId:hotelId,floor:houseHostInfo.floor})
   }
   render() {
    
     const hasInHouse = this.props.ctrl.houseHostInfo
     return (
       <ImageBackground style={{flex:1,justifyContent:'center',alignItems: 'center'}} source={require('../../assets/images/lock_bg.png')}>
         <View style={styles.roundWrap}>
            <View>
              <Text style={styles.text}>{hasInHouse.name}</Text>
             
            </View>
            <TouchableOpacity 
           
            style={[styles.btn,{top:10,left:'50%',marginLeft:-34}]}>
              <View >
                <View style={styles.imageWrap}>
                  <Image source={require('../../assets/images/source_icon.png')}></Image>
                </View>
                <Text style={styles.text}>断电</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={()=>{this.elevator()}}
            style={[styles.btn,{left:10,top:'50%',marginTop:-10}]}>
              <View >
                <View style={styles.imageWrap}>
                  <Image source={require('../../assets/images/elevtor_icon.png')}></Image>
                </View>
                <Text style={styles.text}>电梯</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={()=>{this.door()}}
            style={[styles.btn,{right:10,top:'50%',marginTop:-10}]}>
            <View >
              <View style={styles.imageWrap}>
                <Image source={require('../../assets/images/door_icon.png')}></Image>
              </View>
              <Text style={styles.text}>门</Text>
            </View>
          </TouchableOpacity>
         </View>
       </ImageBackground>
     )
   }
 }
 const styles = StyleSheet.create({
   roundWrap:{
     width: 350,
     height: 350,
     borderRadius: 175,
     backgroundColor: 'rgba(0,0,0,0.3)',
     justifyContent:'center',
     alignItems: 'center'
   },
   btn:{
     position: 'absolute'
   },
   imageWrap:{
    width:68,
    height:68,
    borderRadius:34,
    borderWidth:1,
    borderColor:'#fff',
    justifyContent:'center',
    alignItems: 'center'
   },
   text:{
     color: '#FFFFFF',
     fontSize: 18,
     textAlign: 'center',
     marginTop:10
   }
 })
 export default LockPage