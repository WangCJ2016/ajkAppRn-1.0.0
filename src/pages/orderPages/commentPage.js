import React from 'react'
import { 
  View,
  Text,
  Image,
  StyleSheet,
  TextInput
 } from 'react-native'
 import StarsComponent from '../../components/starsComponent'
 import { Button } from 'antd-mobile'
 import { connect } from 'react-redux'
 import { customerFeedBack } from '../../reducers/shopcar.redux'
 import InphoneXHoc from '../../hoc/inphoneXhoc'

 @InphoneXHoc
 @connect(
  null,
  {
    customerFeedBack
  }
 )
 class CommentPage extends React.Component {
  static navigationOptions = ({navigation,screenProps}) => ({  
      headerTitle: navigation.state.params.hotel.hotelName
   });  
   constructor() {
     super()
     this.state = {
       stars:5,
       textContent:''
     }
     this.starPress = this.starPress.bind(this)
     this.onChangeText = this.onChangeText.bind(this)
     this.submit = this.submit.bind(this)
   }
   starPress(num) {
     this.setState({
       stars: num+1
     })
   }
   onChangeText(e) {
     this.setState({
      textContent:e
     })
   }
   submit() {
     const hotel = this.props.navigation.state.params.hotel
     this.props.customerFeedBack({
      hotelId:hotel.hotelId,
      houseId:hotel.houseId,
      content:encodeURI(this.state.textContent),
      stars:this.state.stars,
      subOrderCode:hotel.subOrderCode,
      picture:''
     },()=>this.props.navigation.goBack())
   }
   render() {
     const hotel = this.props.navigation.state.params.hotel
     return (
       <View >
         <View style={styles.view_wrap}>
            <Image style={{borderRadius: 32}} source={{uri:hotel.picture,width: 65,height: 65}}></Image>
            <Text style={{marginLeft:10,color:'#616161'}}>{hotel.hotelName}</Text>
         </View>
         <View style={{flexDirection:'row',alignItems:'center',backgroundColor: '#FFFFFF'}}>
           <View style={styles.border_view}></View>
           <View style={{borderWidth:0.5,borderRadius: 15,borderColor:'#d8d8d8',marginLeft:10,marginRight:10}}>
              <Text style={{padding:5,color:'#616161'}}>为酒店打分</Text>
           </View>
           <View style={styles.border_view}></View>
         </View>
         <View style={{height:20,backgroundColor: '#FFFFFF'}}></View>
         <View style={{backgroundColor: '#FFFFFF',height:50,alignItems:'center'}}>
           <StarsComponent num={this.state.stars} width={30} height={30} disabled={false} cb={this.starPress}></StarsComponent>
         </View>
         <View style={{backgroundColor: '#FFFFFF',padding:10}}>
          <TextInput 
          style={{borderWidth:0.5,borderColor: '#d8d8d8',height:100,borderRadius:3}} 
          multiline={true} 
          placeholder='说说哪里满意或不满意，帮助大家选择'
          onChangeText={this.onChangeText}></TextInput>
         </View>
         <View style={{padding:10}}>
          <Button type='primary' onClick={this.submit}>提交评价</Button>
         </View>
       </View>
     )
   }
 }
 const styles = StyleSheet.create({
   view_wrap: {
    flexDirection:'row',
    justifyContent:'center',
    padding:20,
    alignItems:'center',
    backgroundColor: '#FFFFFF'
   },
   border_view:{
     flex: 1,
     height: 0.5,
     backgroundColor: '#d8d8d8',
   }
 })
 export default CommentPage