import React from 'react'
import { 
  View,
  Text,
  Image,
  TouchableHighlight
 } from 'react-native'
 import { connect } from 'react-redux'
 import { payOrders,payOrdersSuccess } from '../../reducers/shopcar.redux'
 import RefreshListView, {RefreshState} from 'react-native-refresh-list-view'
 import ViewUtils from '../../utils/viewUtils'
 import BlankPage from '../../components/blankPage'
 import InphoneXHoc from '../../hoc/inphoneXhoc'

 @InphoneXHoc
 @connect(
   state => ({order: state.order}),
   {
    payOrders,payOrdersSuccess
   }
 )
 class PayOrdersPage extends React.Component {
   constructor() {
     super()
     this.state = {
       dataList: [],
       refreshState:0
     }
     this.renderCell = this.renderCell.bind(this)
     this.onHeaderRefresh = this.onHeaderRefresh.bind(this)
     this.onFooterRefresh = this.onFooterRefresh.bind(this)
   }
   componentWillUnmount() {
    this.props.payOrdersSuccess({payOrders:null})
   }
   componentDidMount() {
     this.onHeaderRefresh()
   }
   renderCell(data) {
     const order = data.item
     return (
      <TouchableHighlight key={order.id} onPress={()=>{this.props.navigation.navigate('PayOrderDetail',{orderCode:order.orderCode})}}>
        <View>
          <Text style={{padding:10,color:'#616161',backgroundColor: '#FFFFFF'}}>订单号:{order.orderCode}</Text>
          {
          <View style={{flexDirection:'row',padding:10,alignItems:'center',backgroundColor: '#faf9f9'}}>
              <Image source={{uri:order.hotelsx[0].houses[0].picture,width:75,height:60}}></Image>
              <View style={{flex:1,marginLeft:10}}>
                <Text style={{color:'#ababab'}}>下单时间：{order.orderTime}</Text>
                <Text style={{color:'#ffb354'}}>¥{order.totalFee}</Text>
              </View>
          </View>
          }
        </View>
      </TouchableHighlight>
     )
   }
  
   onHeaderRefresh(){
    this.setState({refreshState: RefreshState.HeaderRefreshing})
    this.props.payOrders({status:1,pageNo:1},(RefreshState)=>{this.setState({refreshState: RefreshState})})
  }
  onFooterRefresh() {
    const orders = this.props.order.payOrders
    if(orders.pageNo + 1 <= orders.totalPages) {
      this.setState({refreshState: RefreshState.FooterRefreshing})
      this.props.payOrders({status:1,pageNo:orders.pageNo + 1},(RefreshState)=>{this.setState({refreshState: RefreshState})})
    }else{
      this.setState({refreshState: RefreshState.NoMoreData})
    }
  }
  keyExtractor = (item, index) => {
    return item.id
  }

   render() {
     return (
      <View style={{flex:1}}>
      {
        this.props.order.payOrders&&this.props.order.payOrders.list.length>0?
          <RefreshListView
            data={this.props.order.payOrders.list}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderCell}
            refreshState={this.state.refreshState}
            onHeaderRefresh={this.onHeaderRefresh}
            onFooterRefresh={this.onFooterRefresh}

            // 可选
            footerRefreshingText= '玩命加载中 >.<'
            footerFailureText = '我擦嘞，居然失败了 =.=!'
            footerNoMoreDataText= '-我是有底线的-'
          />:<BlankPage></BlankPage>  
      }
    </View>
     )
   }
 }
 
 export default PayOrdersPage