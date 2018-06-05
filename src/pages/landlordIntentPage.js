import React from 'react'
import { 
  View,
  Text,
  Alert,
  DeviceEventEmitter
 } from 'react-native'
 import { connect } from 'react-redux'
 import { Toast } from 'antd-mobile'
 import { intentRecord,modifyLeaseIntent } from '../reducers/main.redux'
 import { dataSuccess } from '../reducers/longRent.redux'
 import ViewUtils from '../utils/viewUtils'
 import RefreshListView, {RefreshState} from 'react-native-refresh-list-view'
 import BlankPage from '../components/blankPage'
 import InphoneXHoc from '../hoc/inphoneXhoc'

 @InphoneXHoc
 @connect(
   state=>({main: state.main}),{
    intentRecord, modifyLeaseIntent,dataSuccess
   }
 )
 class LandlordInterntPage extends React.Component {
   constructor() {
     super()
     this.state = {
      refreshState:0
    }
     this.renderCell = this.renderCell.bind(this)
     this.onHeaderRefresh = this.onHeaderRefresh.bind(this)
     this.onFooterRefresh = this.onFooterRefresh.bind(this)
     this.handleIntent = this.handleIntent.bind(this)
     this.handlePress = this.handlePress.bind(this)
   }
   componentDidMount() {
    this.onHeaderRefresh()
    this.listener = DeviceEventEmitter.addListener('REFRESHLANDLORDINTENT',(action,params) => this.onHeaderRefresh())
   }
   componentWillUnmount(){  
    this.listener.remove();  
   }   
   renderCell(data) {
    const order = data.item
    return ViewUtils.landlordIntentItem(order,this.handleIntent,this.handlePress)
   }
   handlePress(data) {
     this.props.dataSuccess({powerId: data.house.powerId})
     this.props.navigation.navigate('SmartTest')
   }
  handleIntent(data) {
    if(data.status === 1) {
      this.props.navigation.navigate('ContractInfo',{intentId: data.id,title:'确认看房'})
    }
    if(data.status === 2) {
      this.props.navigation.navigate('ContractInfo',{intentId: data.id,title:'确认租房'})
    }
  }
  onHeaderRefresh(){
   this.setState({refreshState: RefreshState.HeaderRefreshing})
   this.props.intentRecord({type:'landlord',pageSize:10,pageNo:1},(RefreshState)=>{this.setState({refreshState: RefreshState})})
 }
 onFooterRefresh() {
   const orders = this.props.main.landlordIntentList
   if(orders.pageNo + 1 <= orders.totalPages) {
     this.setState({refreshState: RefreshState.FooterRefreshing})
     this.props.intentRecord({type:'landlord',pageSize:10,pageNo:orders.pageNo + 1},(RefreshState)=>{this.setState({refreshState: RefreshState})})
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
        this.props.main.landlordIntentList&&this.props.main.landlordIntentList.list.length>0?
        <RefreshListView
            data={this.props.main.landlordIntentList.list}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderCell}
            refreshState={this.state.refreshState}
            onHeaderRefresh={this.onHeaderRefresh}
            onFooterRefresh={this.onFooterRefresh}
 
            // 可选
            footerRefreshingText= '玩命加载中 >.<'
            footerFailureText = '我擦嘞，居然失败了 =.=!'
            footerNoMoreDataText= '-我是有底线的-'
        />:<BlankPage  />
      }
    </View>
     )
   }
 }
 
 export default LandlordInterntPage