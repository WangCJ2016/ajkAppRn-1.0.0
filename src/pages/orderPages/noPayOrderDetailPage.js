import React from 'react'
import { 
  View,
  Text,
  StyleSheet,
  Image,
  Alert
 } from 'react-native'
 import { connect } from 'react-redux'
 import { Button } from 'antd-mobile'
 import ViewUtils from '../../utils/viewUtils'
 import { orderDetail,getAlipayParams,cancelOrder } from '../../reducers/shopcar.redux'
 import InphoneXHoc from '../../hoc/inphoneXhoc'

 @InphoneXHoc
 @connect(
   state => ({order: state.order}),
   {
    orderDetail,getAlipayParams,cancelOrder
   }
 )
 class NoPayOrderDetailPage extends React.Component {
   constructor() {
     super()
     this.pay = this.pay.bind(this)
     this.cancel = this.cancel.bind(this)
   }
   componentDidMount() {
      const params = this.props.navigation.state.params
      this.props.orderDetail({orderCode: params.orderCode})
   }
   pay() {
     this.props.getAlipayParams(this.props.order.orderDetail)
   }
   cancel() {
    Alert.alert(
      '确定取消订单?',
      '',
      [
        {text: '取消', onPress: () => {}, style: 'cancel'},
        {text: '确认', onPress: () => this.props.cancelOrder({orderCode:this.props.order.orderDetail.orderCode})},
      ],
      { cancelable: false }
    )
   }
   render() {
     return (
       <View style={{flex:1}}>
         <View style={[styles.flex_between,{height:40,padding:10}]}>
           <View style={styles.flex_row}>
             <Text style={styles.fontSize_16}>订单状态:</Text>
             <Text style={[styles.fontSize_16,{color:'#333'}]}>待付款</Text>
           </View>
           <Text style={{color:'#ffb354'}}>¥0:00</Text>
         </View>
         {this.props.order.orderDetail?this.props.order.orderDetail.hotels.map((hotel,index)=>(
          <View style={{marginTop:10}} key={index}>
             {ViewUtils.orderTitle(hotel.hotelName)}
             {hotel.houses.map(house => {
             return  ViewUtils.orderDetailItem(house.picture,house.houseName,house.inTimes,'¥'+house.fee)
             }
             )}
          </View>
        )):null}
          <View style={{padding:10}}>
            <Button type='primary' onClick={this.pay}>确认支付</Button>
            <Button style={{marginTop:10}} onClick={this.cancel}>取消支付</Button>
          </View>
          <View style={styles.warm_wrap}>
             <View style={[styles.flex_row,{alignItems:'center'}]}>
              <Text style={styles.fontSize_16}>特别提醒</Text>
              <Image source={require('../../assets/images/warm_icon.png')}></Image>
             </View>
             <Text style={{marginTop:5,marginBottom:5}}>请于12点后办理入住，如提前到店，视酒店空房情况安排。</Text>
             <Text>最晚退房时间:12:00</Text>
          </View>
          <View style={styles.warm_wrap}>
             <Text style={{marginBottom:5}}>本订单最晚取消时间和修改时间为:18:00</Text>
             <Text>当超过最晚取消时间和修改时间后，爱居客将不接受您的取消或修改请求，同时已支付的预付款项不予退还，优惠券订单一经修改或取消后无法恢复</Text>
          </View>
       </View>
     )
   }
 }
 
 const styles = StyleSheet.create({
   flex_row:{
    flexDirection: 'row',
   },
   flex_between:{
     flexDirection: 'row',
     justifyContent: 'space-between',
     alignItems: 'center',
     backgroundColor: '#FFFFFF'
   },
   fontSize_16:{
     fontSize: 16
   },
   warm_wrap:{
     borderStyle: 'dashed',
     borderWidth:1,
     borderColor: '#6eaade',
     marginLeft: 20,
     marginRight: 20,
     marginTop:15,
     padding:8
   }
 })
 export default NoPayOrderDetailPage