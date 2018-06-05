import React from 'react'
import { 
  View,
  Text,
  Alert
 } from 'react-native'
 import ViewUtils from '../utils/viewUtils'
 import { connect } from 'react-redux'
 import { intentRecord,delLeaseIntent } from '../reducers/main.redux'
 import { dataSuccess as dataSuccessCtrl} from '../reducers/ctrl.redux'
 import BlankPage from '../components/blankPage'
 import RefreshListView, {RefreshState} from 'react-native-refresh-list-view'
 import { Toast } from 'antd-mobile'
 import InphoneXHoc from '../hoc/inphoneXhoc'

 @InphoneXHoc
 @connect(
  state=>({main: state.main}),{
   intentRecord,delLeaseIntent,dataSuccessCtrl
  }
)
 class CustomerIntentPage extends React.Component {
  constructor() {
    super()
    this.state = {
      refreshState:0
    }
    this.renderCell = this.renderCell.bind(this)
    this.onHeaderRefresh = this.onHeaderRefresh.bind(this)
    this.onFooterRefresh = this.onFooterRefresh.bind(this)
    this.handlePress = this.handlePress.bind(this)
    this.handleDel = this.handleDel.bind(this)
  }
  componentDidMount() {
    this.onHeaderRefresh()
   }
   renderCell(data) {
    const order = data.item
    return ViewUtils.customerIntentItem(order,this.handleDel,this.handlePress)
  }
  handlePress(order) {
    if(order.status === 3) {
      this.props.dataSuccessCtrl({hasInHouse: order.house})
      this.props.navigation.navigate('HomeCtrl',{id:order.house.id})
      return
    }
  }
  handleDel(data) {
    Alert.alert(
      '确认删除意向',
      '',
      [
        {text: '取消'},
        {text: '确认', onPress: () => {
          this.props.delLeaseIntent({intentIds: data.id},()=>Toast.info('已同意看房'));
          this.onHeaderRefresh()
        }},
      ],
      { cancelable: false }
    )
  }
  onHeaderRefresh(){
   this.setState({refreshState: RefreshState.HeaderRefreshing})
   this.props.intentRecord({type:'customer',pageSize:10,pageNo:1},(RefreshState)=>{this.setState({refreshState: RefreshState})})
 }
 onFooterRefresh() {
   const orders = this.props.main.customerIntentList
   if(orders.pageNo + 1 <= orders.totalPages) {
     this.setState({refreshState: RefreshState.FooterRefreshing})
     this.props.intentRecord({type:'customer',pageSize:10,pageNo:orders.pageNo + 1},(RefreshState)=>{this.setState({refreshState: RefreshState})})
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
        this.props.main.customerIntentList&&this.props.main.customerIntentList.list.length>0?
        <RefreshListView
            data={this.props.main.customerIntentList.list}
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
 
 export default CustomerIntentPage