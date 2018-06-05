import React from 'react'
import { 
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground
 } from 'react-native'
 import { getDeviceWays, smartHostCtrl } from '../../reducers/ctrl.redux'
 import { connect } from 'react-redux'

 @connect(
   state=>({ctrl: state.ctrl}),
   {
    getDeviceWays,smartHostCtrl
   }
 )
 class ServicePage extends React.Component {
   constructor() {
     super()
     this.state = {
       clean:'CLOSE',
       disturb:'CLOSE'
     }
     this.click = this.click.bind(this)
   }
   click(type) {
     const houseHostInfo = this.props.ctrl.houseHostInfo
     const deviceWays = this.props.ctrl.deviceWays
     const way = deviceWays.filter(function(data) {
        return data.name == type;
      })
      let _type
      let data
      if(type==='请即清理') {
        this.setState({
          clean:this.state.clean==='CLOSE'?'OPEN':'CLOSE',
          disturb:'CLOSE'
        },()=>{
         _type=this.state.clean
         data = {
          houseId: houseHostInfo.houseId,
          deviceType: 'SWITCH',
          port: houseHostInfo.port,
          serverId: houseHostInfo.serverId,
          actionType: _type,
          wayId: way[0].wayId,
          brightness: 90
         }
         this.props.smartHostCtrl(data)
        })
      }else{
        this.setState({
          clean:'CLOSE',
          disturb:this.state.disturb==='CLOSE'?'OPEN':'CLOSE'
        },()=>{
          _type=this.state.disturb
          data = {
            houseId: houseHostInfo.houseId,
            deviceType: 'SWITCH',
            port: houseHostInfo.port,
            serverId: houseHostInfo.serverId,
            actionType: _type,
            wayId: way[0].wayId,
            brightness: 90
         }
         this.props.smartHostCtrl(data)
         })
      }
   }
   componentDidMount() {
     const houseHostInfo = this.props.ctrl.houseHostInfo
     this.props.getDeviceWays({
       ip:houseHostInfo.ip,
       deviceType: 'SWITCH',
       houseId:houseHostInfo.houseId
     })
   }
   render() {
     return (
       <ImageBackground style={{flex:1,backgroundColor: '#333'}} source={require('../../assets/images/service_bg.png')}>
         <View style={styles.wrap}>
           <TouchableOpacity 
            onPress={()=>this.click('请即清理')}>
             <View style={{alignItems: 'center'}}>
                <Image source={require('../../assets/images/swipe_icon.png')}></Image>
                <Text style={styles.text}>请即清理</Text>
                {
                  this.state.clean==='CLOSE'?
                  <Image source={require('../../assets/images/service_off_icon.png')}></Image>
                  :<Image source={require('../../assets/images/service_on_icon.png')}></Image>
                }
             </View>
           </TouchableOpacity>
           <TouchableOpacity
           onPress={()=>this.click('请勿打扰')}>
             <View style={{alignItems: 'center'}}>
              <Image source={require('../../assets/images/disturb_icon.png')}></Image>
              <Text style={styles.text}>请勿打扰</Text>
              {
                this.state.disturb==='CLOSE'?
                <Image source={require('../../assets/images/service_off_icon.png')}></Image>
                :<Image source={require('../../assets/images/service_on_icon.png')}></Image>
              }
             </View>
           </TouchableOpacity>
         </View>
       </ImageBackground>
     )
   }
 }
 
 const styles = StyleSheet.create({
  wrap:{
    position: 'absolute',
    left:20,
    right:20,
    top:20,
    height: 210,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 3,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  text:{
    color: '#FFFFFF',
    paddingTop: 10,
    paddingBottom: 10
  }
 })
 export default ServicePage