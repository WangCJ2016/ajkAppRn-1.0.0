import React from 'react'
import { 
  View,
  Text,
  Image,
 } from 'react-native'
 import { connect } from 'react-redux'
 import { consumeRecords,consumeHotelsSuccess } from '../../reducers/shopcar.redux'
 import RefreshListView, {RefreshState} from 'react-native-refresh-list-view'
 import ViewUtils from '../../utils/viewUtils'
 import InphoneXHoc from '../../hoc/inphoneXhoc'
 import BlankPage from '../../components/blankPage'

 @InphoneXHoc
 @connect(
  state => ({order: state.order}),
  {
    consumeRecords,consumeHotelsSuccess
  }
)
 class ConsumeRecordsPage extends React.Component {
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
  
  renderCell(data) {
    const order = data.item
    if(!order.hotels) return
    return (
     
       <View key={order.id}>
         {ViewUtils.orderTitle('订单号:'+order.orderCode)}
         {
          ViewUtils.orderDetailItem(order.hotels[0].picture,order.gmtCreate,order.hotels[0].hotelName,'¥'+order.amount)
         }
       </View>
    
    )
  }
 
  onHeaderRefresh(){
   this.setState({refreshState: RefreshState.HeaderRefreshing})
   this.props.consumeRecords({pageNo:1},(RefreshState)=>{this.setState({refreshState: RefreshState})})
 }
 onFooterRefresh() {
   const orders = this.props.order.consumeHotels
   if(orders.pageNo + 1 <= orders.totalPages) {
     this.setState({refreshState: RefreshState.FooterRefreshing})
     this.props.consumeRecords({pageNo:orders.pageNo + 1},(RefreshState)=>{this.setState({refreshState: RefreshState})})
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
       this.props.order.consumeHotels&&this.props.order.consumeHotels.list.length>0?
       <RefreshListView
           data={this.props.order.consumeHotels.list}
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
 
 export default ConsumeRecordsPage