import React from 'react'
import { 
  View,
  Text,
  ScrollView
 } from 'react-native'
 import { connect } from 'react-redux'
 import { orderDetail } from '../../reducers/shopcar.redux'
 import ViewUtils from '../../utils/viewUtils'
 import InphoneXHoc from '../../hoc/inphoneXhoc'

 @InphoneXHoc
 @connect(
  state => ({order: state.order}),
  {
    orderDetail
  }
)
 class EndOrderDetailPage extends React.Component {
   constructor() {
     super()
     this.state = {
      dataList: [],
      refreshState:0
    }
   }
  
   orderInfoRender() {
    const order = this.props.navigation.state.params.order
     return (
      <View style={{padding:10,backgroundColor: '#FFFFFF',}}>
        <Text style={{marginBottom:10,fontSize:15,color:'#616161',}}>订单信息</Text>
        <View style={{borderTopWidth:0.5,borderColor: '#d8d8d8',paddingTop:10}}>
            <Text style={{color:'#ababab'}}>订单编号：{order.orderCode}</Text>
            <Text style={{color:'#ababab'}}>下单时间：{order.orderTime}</Text>
            <Text style={{color:'#ababab'}}>合计：¥{order.hotelsx[0].houses[0].totalFee}</Text>
        </View>
      </View>
     )
   }
   render() {
     const order = this.props.navigation.state.params.order
     return (
       <ScrollView style={{flex:1}}>
         {order?order.hotelsx.map((hotel,index)=>(
           <View key={index}>
              {ViewUtils.orderTitle(hotel.hotelName)}
              {hotel.houses.map(house => {
              return  ViewUtils.orderDetailItem(house.picture,house.houseName,house.inTimes,'¥'+order.hotelsx[0].houses[0].totalFee)
              }
              )}
           </View>
         )):null}
         {
         this.orderInfoRender()
         }
       </ScrollView>
     )
   }
 }
 
 export default EndOrderDetailPage