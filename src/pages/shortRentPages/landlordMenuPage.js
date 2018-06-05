import React from 'react'
import { 
  View,
  Text,
  ImageBackground,
  Image,
  StyleSheet,
  TouchableOpacity,
 } from 'react-native'
 import {connect} from 'react-redux'
 import {getInfo} from '../../reducers/user.redux'
 import InphoneXHoc from '../../hoc/inphoneXhoc'

 @InphoneXHoc
@connect(
  state => ({user:state.user}),
  {getInfo}
)
 class LandlordMenuPage extends React.Component {
   state = {  }
   componentDidMount() {
     this.props.getInfo()
   }
   render() {
     const type = this.props.user.type
     return (
       <ImageBackground style={{flex:1,alignItems:'center',justifyContent:'center'}} source={require('../../assets/images/landlord_bg.png')}>
          <ImageBackground style={{width: 280,height:280,borderRadius:70}} source={require('../../assets/images/landlord_round.png')}>
             <TouchableOpacity 
               style={[styles.figure_btn,{left:'50%',marginTop:5,transform:[{translateX:-25}]}]}
               disabled={type===1?false:true} 
               onPress={()=>{this.props.navigation.navigate('LandLoadAccount')}}>
              <View style={{alignItems:'center'}}>
                <Image style={{tintColor:type===1?'#ffb354':'#ababab'}} source={require('../../assets/images/myacount_icon.png')}></Image>
                <Text style={[styles.figure_text,{color:type===1?'#ffb354':'#ababab'}]}>我的收入</Text>
              </View>
             </TouchableOpacity>
             <TouchableOpacity 
               style={[styles.figure_btn,{left:5,top:'50%',marginTop:-10}]}
               disabled={type===1?false:true} 
               onPress={()=>{}}>
              <View style={{alignItems:'center'}}>
                <Image style={{tintColor:'#ffb354'}} source={require('../../assets/images/join_icon.png')}></Image>
                <Text style={[styles.figure_text,{color:'#ffb354'}]}>加盟我们</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.figure_btn,{right:5,top:'50%',marginTop:-10}]}
              disabled={type===1?false:true} 
              onPress={()=>{this.props.navigation.navigate('LandlordHotels')}}>
              <View style={{alignItems:'center'}}>
                <Image style={{tintColor:type===1?'#ffb354':'#ababab'}} source={require('../../assets/images/myhouse_icon.png')}></Image>
                <Text style={[styles.figure_text,{color:type===1?'#ffb354':'#ababab'}]}>我的房子</Text>
              </View>
           </TouchableOpacity>
          </ImageBackground>
       </ImageBackground>
     )
   }
 }
 
 const styles = StyleSheet.create({
   figure_btn:{
     alignItems:'center',
     position: 'absolute',
   },
   figure_text:{
     color: '#ababab',
     marginTop: 5,
     fontSize: 13,
   }
 })
 export default LandlordMenuPage