import React from 'react'
import { 
  View,
  Text,
  Image,
  StyleSheet,
  DeviceEventEmitter
 } from 'react-native'
 import {List,Checkbox,Button} from 'antd-mobile'
 import { createForm } from 'rc-form'
 import Modal from "react-native-modal"
 import { connect } from 'react-redux'
 import { getAlipayParams } from '../../reducers/shopcar.redux'
 import { dataSuccess } from '../../reducers/longRent.redux'
 const Item = List.Item
 import InphoneXHoc from '../../hoc/inphoneXhoc'
 
 @InphoneXHoc
 @connect(
   state => ({longRent: state.longRent}),
   {
    getAlipayParams,dataSuccess
   }
 )
 class PayInfoPage1 extends React.Component {
   constructor() {
     super()
     this.state = {
       isVisible: false
     }
     this.handlePay = this.handlePay.bind(this)
     this.handleCb = this.handleCb.bind(this)
   }
   handlePay() {
     const deviceOrderData = this.props.longRent.deviceOrderData
     this.props.getAlipayParams({orderCode:deviceOrderData.code,totalFee:0.01},this.handleCb)
   }
   handleCb() {
     this.props.navigation.goBack()
     DeviceEventEmitter.emit('REFRESH')
     this.props.dataSuccess({deviceOrderData:{},houseAssorts:[],houseCertificationInfo:{},idInfo:{},rentHouseInfo:{}})
   }
   render() {
     const { getFieldProps } = this.props.form;
     const totalPrice = this.props.longRent.deviceOrderData.totalPrice
     return (
       <View >
          <List style={{marginTop:10}}>
            <Item arrow="horizontal" onClick={()=>this.setState({isVisible:true})}>支付方式</Item>
          </List>
          <Modal
            isVisible={this.state.isVisible}
            swipeDirection='down'
            onBackdropPress={()=>this.setState({isVisible:false})}
            
            >
            <View style={{backgroundColor:'#fff',position:'absolute',bottom:0,left:0,right:0}} >
              <View style={{borderBottomColor:'#d8d8d8',borderBottomWidth:0.5}}>
                <Text style={{height:55,textAlign:'center',lineHeight:55,fontSize:17}}>房源套餐押金</Text>
              </View>
              <View style={[styles.flex_row,styles.border_bottom,{height:40,paddingLeft:15,paddingRight:15}]}>
                <Text>需付款</Text>
                <Text style={{color:'#f2080d'}}>{totalPrice}元</Text>
              </View>
              <View style={[styles.flex_row,styles.border_bottom,{height:50,paddingLeft:15,paddingRight:15}]}>
                 <View style={[styles.flex_row]}>
                   <Image source={require('../../assets/images/alipay_icon.png')}></Image>
                   <Text style={{marginLeft:10}}>支付宝</Text>
                 </View>
                 <Checkbox disabled={true} checked={true}></Checkbox>
              </View>
              <View style={{padding:15}}>
                <Button type='primary' onClick={this.handlePay}>确认付款 ¥<Text style={{fontSize:20,fontWeight:'bold'}}>{totalPrice}</Text></Button>
              </View>
            </View>
          </Modal>
        </View>
     )
   }
 }
 
 const PayInfoPage = createForm()(PayInfoPage1)

 const styles = StyleSheet.create({
   flex_row: {
     flexDirection: 'row',
     justifyContent: 'space-between',
     alignItems: 'center'
   },
   border_bottom:{
     borderBottomColor:'#d8d8d8',
     borderBottomWidth:0.5
   }
 })
 export default PayInfoPage