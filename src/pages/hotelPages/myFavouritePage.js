import React from 'react'
import { 
  View,
  Text
 } from 'react-native'
 import { connect } from 'react-redux'
 import {customerCollectPage} from '../../reducers/customer.redux'
 import RefreshListView, {RefreshState} from 'react-native-refresh-list-view'
 import ViewUtils from '../../utils/viewUtils'
 import InphoneXHoc from '../../hoc/inphoneXhoc'

 @InphoneXHoc
 @connect(
   state => ({customer: state.customer}),
   {
    customerCollectPage
   }
 )
 class MyFavouritePage extends React.Component {
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
     this.props.customerCollectPage({pageNo:1})
   }
   componentDidMount() {
    this.onHeaderRefresh()
  }
  renderCell(data) {
    const order = data.item
    return (
      ViewUtils.collectionCell(order.hotel,this.props.navigation)
    )
  }
 
  onHeaderRefresh(){
   this.setState({refreshState: RefreshState.HeaderRefreshing})
   this.props.customerCollectPage({pageNo:1},(RefreshState)=>{this.setState({refreshState: RefreshState})})
 }
 onFooterRefresh() {
   const orders = this.props.customer.pageList
   if(orders.pageNo + 1 <= orders.totalPages) {
     this.setState({refreshState: RefreshState.FooterRefreshing})
     this.props.customerCollectPage({pageNo:orders.pageNo + 1},(RefreshState)=>{this.setState({refreshState: RefreshState})})
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
        this.props.customer.pageList?
        <RefreshListView
            data={this.props.customer.pageList.list}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderCell}
            refreshState={this.state.refreshState}
            onHeaderRefresh={this.onHeaderRefresh}
            onFooterRefresh={this.onFooterRefresh}

            // 可选
            footerRefreshingText= '玩命加载中 >.<'
            footerFailureText = '我擦嘞，居然失败了 =.=!'
            footerNoMoreDataText= '-我是有底线的-'
        />:null
      }
    </View>
     )
   }
 }
 
 export default MyFavouritePage