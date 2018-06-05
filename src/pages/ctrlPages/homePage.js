import React from 'react'
import { 
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageBackground
 } from 'react-native'
 import { connect } from 'react-redux'
 import { houseHostInfo } from '../../reducers/ctrl.redux'
 import { isIphoneX } from '../../utils/fnUtils'

 @connect(
   state => ({ctrl:state.ctrl}),
   {
    houseHostInfo
   }
 )
 class HomeCtrlPage extends React.Component {
   state = {  }
   componentDidMount() {
     this.props.houseHostInfo({houseId:this.props.navigation.state.params.id})
   }
   navigation(page) {
     this.props.navigation.navigate(page)
   }
   render() {
     return (
       <ImageBackground style={{flex:1,backgroundColor: '#333'}} source={require('../../assets/images/homectrl_bg.png')}>
        <TouchableOpacity
          onPress={()=>this.props.navigation.goBack()}
          style={{marginTop: isIphoneX()?30:20,marginLeft: 20,padding:10,width: 40,height:40}} 
        >
          <Image style={{tintColor:'#fff'}} source={require('../../assets/images/left_arr_icon.png')}></Image>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={()=>this.navigation('LockCtrl')}
          style={[styles.itemWrap,{width: 100,height:100,borderRadius:50,marginLeft:-50}]}>
           <View style={styles.viewWrap}>
             <Image style={{width: 41,height:60}} source={require('../../assets/images/key_icon.png')}></Image>
             <Text style={styles.text}>门锁</Text>
           </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={()=>this.navigation('CurtainCtrl')}
          style={[styles.itemWrap,{marginTop:-100}]}>
           <View style={styles.viewWrap}>
             <Image style={{width: 31,height:38}} source={require('../../assets/images/curtain_icon.png')}></Image>
             <Text style={styles.text}>窗帘</Text>
           </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={()=>this.navigation('LightCtrl')}
          style={[styles.itemWrap,{marginTop:120}]}>
           <View style={styles.viewWrap}>
             <Image style={{width: 31,height:38}} source={require('../../assets/images/light_icon.png')}></Image>
             <Text style={styles.text}>灯</Text>
           </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.itemWrap,{marginLeft:-150,marginTop:-40}]}
          onPress={()=>this.navigation('ServiceCtrl')}>
           <View style={styles.viewWrap}>
             <Image  source={require('../../assets/images/service_icon.png')}></Image>
             <Text style={styles.text}>服务</Text>
           </View>
        </TouchableOpacity>
        <TouchableOpacity
        onPress={()=>this.navigation('AirCtrl')}
        style={[styles.itemWrap,{marginLeft:-150,marginTop:50}]}>
         <View style={styles.viewWrap}>
           <Image  source={require('../../assets/images/air_icon.png')}></Image>
           <Text style={styles.text}>空调</Text>
         </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={()=>this.navigation('ModelCtrl')}
        style={[styles.itemWrap,{marginLeft:80,marginTop:50}]}>
         <View style={styles.viewWrap}>
           <Image  source={require('../../assets/images/model_icon.png')}></Image>
           <Text style={styles.text}>情景</Text>
         </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={()=>this.navigation('TvCtrl')}
        style={[styles.itemWrap,{marginLeft:80,marginTop:-40}]}>
         <View style={styles.viewWrap}>
           <Image  source={require('../../assets/images/tv_icon.png')}></Image>
           <Text style={styles.text}>电视</Text>
         </View>
      </TouchableOpacity>
      <View style={{flex:1,justifyContent:'space-between',alignItems: 'center',marginBottom:20}}>
       <Text></Text>
       <Image source={require('../../assets/images/bottom_pic.png')}></Image>
      </View>
       </ImageBackground>
     )
   }
 }
 
 const styles = StyleSheet.create({
   itemWrap:{
     width:80,
     height: 80,
     borderRadius: 40,
     borderColor: 'rgba(255,255,255,0.3)',
     borderWidth:1,
     position: 'absolute',
     marginLeft: -40,
     top:'35%',
     left:'50%',
     zIndex:9
   },
   viewWrap:{
     flex: 1,
     width: '100%',
     alignItems: 'center',
     justifyContent: 'space-around'
   },
   text:{
     color: '#FFFFFF'
   }
 })
 export default HomeCtrlPage