import React from 'react'
import { 
  View,
  Text,
  TouchableHighlight,
  Image,
 } from 'react-native'
 import { connect } from 'react-redux'
 import { endOrders,payOrdersSuccess } from '../../reducers/shopcar.redux'
 import RefreshListView, {RefreshState} from 'react-native-refresh-list-view'
import ViewUtils from '../../utils/viewUtils';
import BlankPage from '../../components/blankPage'
import InphoneXHoc from '../../hoc/inphoneXhoc'

 @InphoneXHoc
 @connect(
  state => ({order: state.order}),
  {
    endOrders,payOrdersSuccess
  }
)
 class EndOrdersPage extends React.Component {
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
  componentDidMount() {
    this.onHeaderRefresh()
  }
  componentWillUnmount() {
    this.props.payOrdersSuccess({payOrders:null})
   }
  renderCell(data) {
    const order = data.item
    return (
     <TouchableHighlight key={order.id} onPress={()=>{this.props.navigation.navigate('EndOrderDetail',{order:order})}}>
       <View>
       {ViewUtils.orderTitle('订单号:'+order.orderCode)}
         {
         ViewUtils.orderContent(order.hotelsx[0].houses[0].picture,'下单时间'+order.orderTime,order.orderTime)
         }
       </View>
     </TouchableHighlight>
    )
  }
 
  onHeaderRefresh(){
   this.setState({refreshState: RefreshState.HeaderRefreshing})
   this.props.endOrders({type:'end',pageNo:1},(RefreshState)=>{this.setState({refreshState: RefreshState})})
 }
 onFooterRefresh() {
   const orders = this.props.order.payOrders
   if(orders.pageNo + 1 <= orders.totalPages) {
     this.setState({refreshState: RefreshState.FooterRefreshing})
     this.props.endOrders({type:'end',pageNo:orders.pageNo + 1},(RefreshState)=>{this.setState({refreshState: RefreshState})})
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
       />: <BlankPage></BlankPage>
     }
   </View>
    )
  }
 }
 
 export default EndOrdersPage