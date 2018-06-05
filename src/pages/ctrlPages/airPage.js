import React from 'react'
import { 
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ImageBackground,
  TouchableOpacity
 } from 'react-native'
 import { connect } from 'react-redux'
 import { queryDeviceType,smartHostCtrl, dataSuccess } from '../../reducers/ctrl.redux'
 import ViewSlider from '../../components/ViewSlider/viewSlider'

 const { width,height } = Dimensions.get('window')
 
 @connect(
  state=>({ctrl:state.ctrl}),
  {
    queryDeviceType,smartHostCtrl,dataSuccess
  }
)
 class AirCtrlPage extends React.Component {
   constructor() {
     super()
     this.renderView=this.renderView.bind(this)
   }
   componentDidMount() {
    const houseHostInfo = this.props.ctrl.houseHostInfo
     this.props.queryDeviceType({
       deviceName:encodeURI('空调'),
       houseId:houseHostInfo.houseId
     })
   }
   switch(index) {
    const airInfo = this.props.ctrl.airInfo
    const newairInfo = airInfo.map((air,_index)=>{
      if(index === _index) {
        air.status = air.status === 'ON'?'OFF':'ON'
        this.airSwitchCtrl(air)
      }
      return air
    })
    this.props.dataSuccess({airInfo:newairInfo})
   }
   temPlus(index) {
    const airInfo = this.props.ctrl.airInfo
    const newairInfo = airInfo.map((air,_index)=>{
      if(index === _index) {
        if(air.module === '制冷') {
          if(air.tempNowIndex + 1<=air.coolWays.length-1){
            air.tempNowIndex = air.tempNowIndex+1
            air.tempNow = air.coolWays[air.tempNowIndex]
          }
        }
        if(air.module === '制热') {
          if(air.tempNowIndex + 1<=air.warmWays.length-1){
            air.tempNowIndex = air.tempNowIndex+1
            air.tempNow = air.warmWays[air.tempNowIndex]
          }
        }
        this.temSmartCtrl(air)
      }
      return air
    })
    this.props.dataSuccess({airInfo:newairInfo})
   }
   temMinus(index){
    const airInfo = this.props.ctrl.airInfo
    const newairInfo = airInfo.map((air,_index)=>{
      if(index === _index) {
        if(air.module === '制冷') {
          if(air.tempNowIndex - 1>=0){
            air.tempNowIndex = air.tempNowIndex-1
            air.tempNow = air.coolWays[air.tempNowIndex].slice(-2)
          }
        }
        if(air.module === '制热') {
          if(air.tempNowIndex - 1>=0){
            air.tempNowIndex = air.tempNowIndex-1
            air.tempNow = air.warmWays[air.tempNowIndex].slice(-2)
          }
        }
        this.temSmartCtrl(air)
      }
      return air
    })
    this.props.dataSuccess({airInfo:newairInfo})
   }
   moduleChange(index) {
    const airInfo = this.props.ctrl.airInfo
    const newairInfo =  airInfo.map((air,_index)=>{
        if(index===_index) {
          air.module = air.module === '制冷'?'制热':'制冷'
          if(air.module === '制冷') {
              air.tempNowIndex = Math.floor(air.coolWays.length/2)
              air.tempNow = air.coolWays[air.tempNowIndex].slice(-2)
            } else {
              air.tempNowIndex = Math.floor(air.warmWays.length/2)
              air.tempNow = air.warmWays[air.tempNowIndex].slice(-2)
            }
            this.temSmartCtrl(air)
        }
        return air
    })
    this.props.dataSuccess({airInfo:newairInfo})
   }
   speedChange(index) {
    const airInfo = this.props.ctrl.airInfo
    const newairInfo = airInfo.map((air,_index)=>{
      if(index === _index) {
        air.speed = (air.speed + 1) % 4 
        this.temSmartCtrl(air) 
      }
      return air
    })
    this.props.dataSuccess({airInfo:newairInfo})
   }
   speedRender(num) {
     if(num === 0) {
       return (
        <View style={[styles.speed,{height:20}]}>
         <Image source={require('../../assets/images/speed1_icon.png')}></Image>
        </View>
       )
     }
     if(num === 1) {
      return (
        <View style={[styles.speed,{height:25}]}>
         <Image source={require('../../assets/images/speed1_icon.png')}></Image>
         <Image style={{marginLeft:10}} source={require('../../assets/images/speed2_icon.png')}></Image>
        </View>
      )
    }
    if(num === 2) {
      return (
        <View style={[styles.speed,{height:31}]}>
         <Image source={require('../../assets/images/speed1_icon.png')}></Image>
         <Image style={{marginLeft:10}} source={require('../../assets/images/speed2_icon.png')}></Image>
         <Image style={{marginLeft:10}} source={require('../../assets/images/speed3_icon.png')}></Image>
        </View>
      )
    }
   }
   airSwitchCtrl(air){
    const houseHostInfo = this.props.ctrl.houseHostInfo
    let data
    if(this.props.ctrl.airDeivceType==='VIRTUAL_AIR_REMOTE') {
      data = {
        houseId: houseHostInfo.houseId,
        deviceType: this.props.ctrl.airDeivceType,
        deviceId: air.deviceId,
        key: air.status=== 'ON'?'OFF':air.tempNow
      }
    }else{
      if (air.status === 'ON') {
        data = {
            houseId: houseHostInfo.houseId,
            deviceType: this.props.ctrl.airDeivceType,
            deviceId: air.deviceId,
            onOff : "OFF",
            mode: 'COOL',
            wind: 0,
            temp: 25
        }
    } else {
        data = {
            houseId: houseHostInfo.houseId,
            deviceType: this.props.ctrl.airDeivceType,
            deviceId: air.deviceId,
            mode: 'COOL',
            temp: air.tempNow,
            wind: 0
        }
    }
    }
    this.props.smartHostCtrl(data)
   }
   temSmartCtrl(air) {
     const houseHostInfo = this.props.ctrl.houseHostInfo
     if(this.props.ctrl.airDeivceType==='VIRTUAL_AIR_REMOTE') {
      const data = {
        houseId: houseHostInfo.houseId,
        deviceType:this.props.ctrl.airDeivceType,
        deviceId: air.deviceId,
        key:air.tempNow
      }
      this.props.smartHostCtrl(data)
     }else{
       const data = {
        houseId: houseHostInfo.houseId,
        deviceType: this.props.ctrl.airDeivceType,
        deviceId: air.deviceId,
        mode: air.module==='制冷'?'COOL':'WARM',
        temp: air.tempNow,
        wind: air.speed
       }
       this.props.smartHostCtrl(data)
     }
   }
   renderView(){
     const airInfo = this.props.ctrl.airInfo
     return airInfo.map((air,index) => (
       <View key={index} style={styles.viewWrap}>
         <View style={{flexDirection:'row',padding: 20,height:140,justifyContent:'space-between'}}>
           <View style={{justifyContent:'space-between',width:'40%'}}>
             <View style={styles.mintorItem}>
               <Text style={styles.mintorText}>风速</Text>
              
                 {this.speedRender(air.speed)}
             
             </View>
             <View style={{height:0.5,backgroundColor: '#FFFFFF'}}></View>
             <View style={[styles.mintorItem,{alignItems: 'flex-end'}]}>
               <Text style={styles.mintorText}>模式</Text>
               <View style={styles.mintorItem}>
                  {
                    air.module === '制热'?
                    <Image source={require('../../assets/images/hot_icon.png')}></Image>
                    :
                    <Image source={require('../../assets/images/cold_icon.png')}></Image>
                  }
                 <View style={{marginLeft:10}}>
                  <Text style={[styles.mintorText,{fontSize:16}]}>{air.module.slice(0,1)}</Text>
                  <Text style={[styles.mintorText,{fontSize:16}]}>{air.module.slice(1)}</Text>
                 </View>
               </View>
             </View>
           </View>
           <View style={{width:0.5,backgroundColor: '#FFFFFF'}}></View>
           <View style={{justifyContent:'space-between',width:'40%'}}>
             <View style={styles.mintorItem}>
               <Text style={styles.mintorText}>当前</Text>
               <Text style={[styles.mintorText,styles.temNum]}>20℃</Text>
             </View>
             <View style={{height:0.5,backgroundColor: '#FFFFFF'}}></View>
             <View style={[styles.mintorItem,{alignItems: 'flex-end'}]}>
               <Text style={styles.mintorText}>设置</Text>
               <Text style={[styles.mintorText,styles.temNum]}>{air.tempNow.slice(-2)}℃</Text>
             </View>
           </View>
         </View>
         <View style={{alignItems: 'center',padding:20}}>
           <ImageBackground style={{width:230,height:230,justifyContent:'center',alignItems: 'center'}} source={require('../../assets/images/air_round.png')}>
            <TouchableOpacity 
            onPress={()=>this.switch(index)}>
               <Text style={[styles.mintorText,styles.temNum,{fontSize:22}]}>{air.status}</Text>
            </TouchableOpacity>
           </ImageBackground>
         </View>
         <View style={{flexDirection:'row',justifyContent:'space-between',padding: 20}}>
            <TouchableOpacity
            onPress={()=>this.temMinus(index)}>
              <View>
                 <Image source={require('../../assets/images/tem_muis_icon.png')}></Image>
                 <Text style={[styles.btnText]}>温度-</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
             onPress={()=>this.temPlus(index)}>
              <View>
                 <Image source={require('../../assets/images/tem_plus_icon.png')}></Image>
                 <Text style={[styles.btnText]}>温度+</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={()=>this.speedChange(index)}>
              <View>
                 <Image source={require('../../assets/images/speed_icon.png')}></Image>
                 <Text style={[styles.btnText]}>风速</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
             onPress={()=>this.moduleChange(index)}>
              <View>
                 <Image source={require('../../assets/images/module_icon.png')}></Image>
                 <Text style={[styles.btnText]}>模式</Text>
              </View>
            </TouchableOpacity>
         </View>
       </View>
     ))
   }
   render() {
     return (
      <ViewSlider
        renderView={this.renderView}
        backgroundImage={require('../../assets/images/air_bg.png')}
      ></ViewSlider>
     )
   }
 }
 
 const styles = StyleSheet.create({
  viewWrap:{
    width: width,
    flex:1,
    justifyContent:'space-around'
  },
  mintorItem:{
    flexDirection:'row',
    justifyContent:'space-between',
    height: '49%'
  },
  mintorText:{
    color: '#FFFFFF',
    fontSize: 18
  },
  btnText:{
    color: '#6095f0',
    fontSize: 16,
    marginTop: 10
  },
  speed:{
    width:50,
    flexDirection:'row',
    alignItems: 'flex-end'
  },
  temNum:{
    fontSize:20,
    color:'#6095f0',
    textShadowColor:'rgba(255,255,255,0.2)',
    textShadowRadius:4,
    textShadowOffset:{width:4,height:4}
  }
})
 export default AirCtrlPage