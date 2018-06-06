import React from 'react'
import { 
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback
 } from 'react-native'
 import { List,Toast } from 'antd-mobile';
 import { connect } from 'react-redux'
 import { getInfo } from '../reducers/user.redux'

 @connect(
   state=>({user:state.user}),
   {getInfo}
 )
 class UserCenterPage extends React.Component {
  
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
   payItemRender(text,image,press) {
     return (
       <TouchableOpacity onPress={()=>press()}>
        <View style={{justifyContent:'center',alignItems:'center'}}>
          <Image source={image}></Image>
          <Text style={{marginTop:10}}>{text}</Text>
        </View>
      </TouchableOpacity>)
   }
   listItemRender(text,cb) {
     return (
      <TouchableHighlight onPress={cb} underlayColor='#ccc' activeOpacity={0.8}>
        <View style={styles.list_item}>
          <Text style={{marginLeft: 15}}>{text}</Text>
          <Image source={require('../assets/images/left_arr_.png')}></Image>
        </View>
      </TouchableHighlight>
     )
   }
   render() {
     const user = this.props.user
     return (
       <ScrollView style={styles.container} >
         <View style={styles.user_info}>
          {
            user.headPicture?<Image style={styles.header_logo} source={{uri:user.headPicture}}></Image>
            :<Image source={require('../assets/images/head.png')}></Image>
          }
          <TouchableWithoutFeedback onPress={this.headerClick}>
            <View style={{marginLeft:20}}>
              <Text style={{fontSize:18,color:'#343434',fontWeight:'bold'}}>{user.telephone?user.telephone:'注册/登录'}</Text>
              <View style={{flexDirection:'row',alignItems:'center',marginTop:5}}>
                <Image source={require('../assets/images/vip.png')}></Image>
                <Text style={{marginLeft:6,marginRight:6}}>会员中心</Text>
                <Image source={require('../assets/images/left_arr_.png')}></Image>
              </View>
            </View>
          </TouchableWithoutFeedback>
         </View>
         <View style={styles.item_wrap}>
           <View style={{flexDirection:'row',justifyContent:'space-around'}}>
             {this.payItemRender('代付款',require('../assets/images/ic_notpay.png'),()=>this.loginVertify(()=>this.props.navigation.navigate('NoPayOrders')))}
             {this.payItemRender('已付款',require('../assets/images/ic_pay.png'),()=>this.loginVertify(()=>this.props.navigation.navigate('PayOrders')))}
             {this.payItemRender('待评价',require('../assets/images/ic_not_evalute.png'),()=>this.loginVertify(()=>this.props.navigation.navigate('OrderBeComment')))}
           </View>
           <View style={{flexDirection:'row',justifyContent:'space-around'}}>
           {this.payItemRender('已结束',require('../assets/images/ic_invalid.png'),()=>this.loginVertify(()=>this.props.navigation.navigate('EndOrders')))}
           {this.payItemRender('加盟我们',require('../assets/images/join.png'),()=>alert('敬请期待'))}
           {this.payItemRender('智能产品',require('../assets/images/smart_pro.png'),()=>alert('敬请期待'))}
           </View>
         </View>
         <View style={{marginTop:13}}>
           <Image source={require('../assets/images/ad.png')}></Image>
         </View>
         <View style={{padding:15}}>
           {this.listItemRender('消费流水',()=> this.loginVertify(()=>this.props.navigation.navigate('ConsumeRecords')))}
           {this.listItemRender('我的意向',()=> this.loginVertify(()=>this.props.navigation.navigate('CustomerIntent')))}
           {this.listItemRender('房东意向',()=> this.loginVertify(()=>this.props.navigation.navigate('LandlordInternt')))}
           {this.listItemRender('关于',()=>alert('敬请期待'))}
         </View>
       </ScrollView>
     )
   }
 }
 
 const styles = StyleSheet.create({
   container: {
     flex:1,
     backgroundColor:'#fff'
   },
   user_info:{
     height:99,
     flexDirection:'row',
     alignItems:'center',
     paddingLeft: 15,
     paddingRight: 15
   },
   item_wrap:{
     height:247,
     backgroundColor:'#FFF9F5',
     marginLeft: 15,
     marginRight: 15,
     justifyContent:'space-around'
   },
   list_item:{
    flexDirection:'row',
    justifyContent:'space-between',
    backgroundColor:'#FFF9F5',
    alignItems:'center',
    height:52,
    paddingRight:5,
    marginBottom: 5
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
 })
 export default UserCenterPage