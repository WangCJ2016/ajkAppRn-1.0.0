import React from 'react'
import { 
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableHighlight,
  TouchableWithoutFeedback
 } from 'react-native'
 import { List,Toast } from 'antd-mobile';
 import { connect } from 'react-redux'
 import ViewUtils from '../utils/viewUtils'
 import { getInfo } from '../reducers/user.redux'
 const Item = List.Item;

 @connect(
   state=>({user:state.user}),
   {getInfo}
 )
 class UserCenterPage extends React.Component {
  static navigationOptions = ({navigation,screenProps}) => ({
    header:null
  })
  constructor() {
    super()
    this.headerClick = this.headerClick.bind(this)
  }
  loginVertify= (cb) => {
    if(this.props.user.token) {
     cb()
    }else{
      this.props.navigation.navigate('Login')
    }
  }
   userStatusMenuRender(icon,text,cb) {
      return  <TouchableHighlight
      style={{flex:1}}
      activeOpacity={1}
      underlayColor={'#e8e8e8'}
      onPress={()=>cb()}
      >
        <View  style={styles.statusMenuItem}>
          <Image source={icon}></Image>
          <Text style={{marginTop:10,fontSize:15}}>{text}</Text>
        </View>
      </TouchableHighlight>
   }
   headerClick() {
     this.props.user.token?this.props.navigation.navigate('UserSetting'):this.props.navigation.navigate('Login')
   }
   render() {
     const user = this.props.user
     return (
       <View style={styles.container} >
           <ImageBackground 
            style={styles.topheader}
            source={require('../assets/images/header_bg.png')}
            resizeMode='center'>
            <TouchableWithoutFeedback onPress={()=>this.headerClick()}>
              <View style={{alignItems:'center'}}>
                <View>
                   {
                     user.headPicture?<Image style={styles.header_logo} source={{uri:this.props.user.headPicture}}></Image>
                     :<Image style={styles.header_logo} source={require('../assets/images/header_logo.png')}></Image>
                   }
                </View>
                <Text style={styles.header_name} >{user.telephone?user.telephone:'注册/登录'}</Text>
              </View>
            </TouchableWithoutFeedback>
           </ImageBackground>
           <View style={styles.statusMenu}>
            {this.userStatusMenuRender(require('../assets/images/ic_notpay.png'),'代付款',()=>this.loginVertify(()=>this.props.navigation.navigate('NoPayOrders')))}
            {this.userStatusMenuRender(require('../assets/images/ic_pay.png'),'已付款', ()=>this.loginVertify(()=>this.props.navigation.navigate('PayOrders')))}
            {this.userStatusMenuRender(require('../assets/images/ic_not_evalute.png'),'待评价',()=>this.loginVertify(()=>this.props.navigation.navigate('OrderBeComment')))}
            {this.userStatusMenuRender(require('../assets/images/ic_invalid.png'),'已结束',()=>this.loginVertify(()=>this.props.navigation.navigate('EndOrders')))}
           </View>
           <View style={{marginTop:10}}>
           <List>
              {ViewUtils.itemhasArr(require('../assets/images/ic_account.png'),'消费流水',()=> this.loginVertify(()=>this.props.navigation.navigate('ConsumeRecords')),22,19)}
              {/* ViewUtils.itemhasArr(require('../assets/images/ic_join.png'),'加入我们',()=>this.props.navigation.navigate('LandlordMenu'),23,22) */}
              {ViewUtils.itemhasArr(require('../assets/images/zkyx.png'),'我的意向',()=> this.loginVertify(()=>this.props.navigation.navigate('CustomerIntent')),22,21)}
              {ViewUtils.itemhasArr(require('../assets/images/fdyx.png'),'房东意向',()=>this.loginVertify(()=>this.props.navigation.navigate('LandlordInternt')),21,23)}
              {ViewUtils.itemhasArr(require('../assets/images/ic_about.png'),'关于','',22,22)}
            </List>
           </View>
       </View>
     )
   }
 }
 
 const styles = StyleSheet.create({
   container: {
     flex:1
   },
   topheader: {
     height: 200,
     backgroundColor: '#ffb354',
     alignItems:'center',
     justifyContent: 'center'
   },
   header_logo:{
     width: 65,
     height: 65,
     borderRadius: 32.5,
     borderWidth:0.5,
     borderColor: '#d8d8d8',
     alignItems:'center',
     justifyContent:'center'
   },
   header_name:{
     marginTop: 10,
     color: '#fff',
     fontSize:16
   },
   statusMenu:{
     height:65,
     flexDirection: 'row',
     backgroundColor:'#fff',
     justifyContent:'space-between'
   },
   statusMenuItem: {
     justifyContent:'center',
     alignItems:'center',
     height:65
   }
 })
 export default UserCenterPage