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
 class PayOrderDetailPage extends React.Component {
   constructor() {
     super()
     this.state = {
      dataList: [],
      refreshState:0
    }
   }
   componentDidMount() {
     const params = this.props.navigation.state.params
     this.props.orderDetail({orderCode: params.orderCode})
   }
   orderInfoRender() {
     const orderDetail = this.props.order.orderDetail
     return (
      <View style={{padding:10,backgroundColor: '#FFFFFF',}}>
        <Text style={{marginBottom:10,fontSize:15,color:'#616161',}}>订单信息</Text>
        <View style={{borderTopWidth:0.5,borderColor: '#d8d8d8',paddingTop:10}}>
            <Text style={{color:'#ababab'}}>订单编号：{orderDetail.orderCode}</Text>
            <Text style={{color:'#ababab'}}>下单时间：{orderDetail.orderTime}</Text>
            <Text style={{color:'#ababab'}}>合计：¥{orderDetail.totalFee}</Text>
        </View>
      </View>
     )
   }
   render() {
     const order = this.props.order
     return (
       <ScrollView style={{flex:1}}>
         <View style={{height:112,backgroundColor: '#ffb354'}}>
            <Text style={{fontSize:18,marginTop:20,marginLeft:20,color:'#fff'}}>等待入住</Text>
            <Text style={{fontSize:14,marginTop:10,marginLeft:20,color:'#fff'}}>距离入住还剩?天</Text>
         </View>
         {this.props.order.orderDetail?this.props.order.orderDetail.hotels.map((hotel,index)=>(
           <View key={index}>
              {ViewUtils.orderTitle(hotel.hotelName)}
              {hotel.houses.map(house => {
              return  ViewUtils.orderDetailItem(house.picture,house.houseName,house.inTimes,'¥'+house.fee)
              }
              )}
           </View>
         )):null}
         {
          order.orderDetail?this.orderInfoRender():null
         }
       </ScrollView>
     )
   }
 }
 
 export default PayOrderDetailPage