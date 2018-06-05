import React from 'react'
import { 
  View,
  Text,
  Image,
  TouchableHighlight,
  Platform
 } from 'react-native'
 import ScrollableTabView,{ScrollableTabBar} from 'react-native-scrollable-tab-view'
 import { connect } from 'react-redux'
 import RefreshListView, {RefreshState} from 'react-native-refresh-list-view'
 import { endOrders,payOrdersSuccess } from '../reducers/shopcar.redux'
 import { modifySubOrdersStatus,cancleSubOrder } from '../reducers/customer.redux'
 import { dataSuccess } from '../reducers/ctrl.redux'
 import ViewUtils from '../utils/viewUtils';
 import ListCell from '../components/listCellCom'
 import Modal from "react-native-modal"
 import { Button } from 'antd-mobile'
 import iphonexHoc from '../hoc/inphoneXhoc'

 @iphonexHoc
 @connect(
   state => ({order: state.order,customer: state.customer,ctrl:state.ctrl,user:state.user}),
   {endOrders,payOrdersSuccess,modifySubOrdersStatus,cancleSubOrder,dataSuccess}
 )
 class HomePage extends React.Component {
  
   constructor() {
     super()
     this.state ={ 
       type: 'waiting',
       dataList: [],
      refreshState:0,
      modalVisible:false
     }
     this.onChangeTab = this.onChangeTab.bind(this)
     this.renderCell = this.renderCell.bind(this)
     this.renderCellhas = this.renderCellhas.bind(this)
     this.hasinClick = this.hasinClick.bind(this)
     this.onHeaderRefresh = this.onHeaderRefresh.bind(this)
     this.onFooterRefresh = this.onFooterRefresh.bind(this)
     this.openModal = this.openModal.bind(this)
     this.inHouse = this.inHouse.bind(this)
     this.cancelOrder = this.cancelOrder.bind(this)
   }
  
   onChangeTab(e){
       this.setState({
         type:e.i===1?'already':'waiting'
       },()=>{
        if(e.i===0&&!this.props.order.payOrders){
          this.onHeaderRefresh()
        }
        if(e.i===1&&!this.props.order.alreadyOrders) {
          this.onHeaderRefresh()
        }
       })
   }
   componentDidMount() {
      if(this.props.user.token) {
        cb()
        this.onHeaderRefresh()
      }else{
        this.props.navigation.navigate('Login')
      }
  }
  componentWillUnmount() {
    this.props.payOrdersSuccess({payOrders:null})
   }
   openModal(subOrderCode) {
     this.setState({
      modalVisible: true,
      subOrderCode:subOrderCode
     })
   }
   inHouse() {
     this.props.modifySubOrdersStatus({
      subOrderCode:this.state.subOrderCode,
      operate: 'in'
     })
     this.setState({
      modalVisible:false
     })
   }
   cancelOrder() {
     this.props.cancleSubOrder({
      subOrderCode:this.state.subOrderCode,
     })
     this.state({
      modalVisible:false
     })
   }
  renderCell(data) {
    const order = data.item
    return ( 
        <View>
        {order.hotelsx.map((hotel,index)=>(   
            <View key={hotel.hotelId}>
            {ViewUtils.orderTitle(hotel.hotelName)}
            {hotel.houses.map(house=>(
              <View  key={house.subOrderCode}>
              <ListCell
                image={house.picture}
                p1={house.houseName}
                p1Style={{color: '#333'}}
                p2={house.inTimes}
                p3={'¥'+house.totalFee}
                p3Style={{color: '#ffb354'}}
                cb={()=>this.openModal(house.subOrderCode)}
             ></ListCell>
              </View>
            ))}
            </View>
        ))}
        </View>
    )
  }
  renderCellhas(data) {
    const order = data.item
    return ( 
        <View>
        {order.hotelsx.map((hotel,index)=>(   
            <View key={hotel.hotelId}>
            {ViewUtils.orderTitle(hotel.hotelName)}
            {hotel.houses.map(house=>(
              <View  key={house.subOrderCode}>
              <ListCell
                image={house.picture}
                p1={house.houseName}
                p1Style={{color: '#333'}}
                p2={house.inTimes}
                p3={'¥'+house.totalFee}
                p3Style={{color: '#ffb354'}}
                cb={()=>this.hasinClick(house)}
             ></ListCell>
              </View>
            ))}
            </View>
        ))}
        </View>
    )
  }
  hasinClick(house) {
    this.props.dataSuccess({hasInHouse: house})
    this.props.navigation.navigate('HomeCtrl',{id: house.houseId})
  }
  onHeaderRefresh(){
   this.setState({refreshState: RefreshState.HeaderRefreshing})
   this.props.endOrders({type:this.state.type,pageNo:1},(RefreshState)=>{this.setState({refreshState: RefreshState})})
  }
  loginVertify= (cb) => {
    if(this.props.user.token) {
     cb()
    }else{
      this.props.navigation.navigate('Login')
    }
  }
 onFooterRefresh(key) {
   const orders = this.props.order[key]
   if(orders.pageNo + 1 <= orders.totalPages) {
     this.setState({refreshState: RefreshState.FooterRefreshing})
     this.props.endOrders({type:this.state.type,pageNo:orders.pageNo + 1},(RefreshState)=>{this.setState({refreshState: RefreshState})})
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
            Platform.OS === 'ios' ? 
            <View style={{height:10,backgroundColor:'#fff'}}></View> 
            : null
          }
          <ScrollableTabView
            style={{flex:1}}
            tabBarUnderlineStyle={{backgroundColor: '#ffb354', height: 2}}
            tabBarInactiveTextColor='mintcream'
            tabBarActiveTextColor='#ffb354'
            tabBarInactiveTextColor='#333'
            ref="scrollableTabView"
            tabBarBackgroundColor="#fff"
            initialPage={0}
            onChangeTab={this.onChangeTab}
            renderTabBar={() => <ScrollableTabBar 
              style={{height: 50, borderWidth: 0.5, elevation: 2}} />}
              >
              <View tabLabel="待入住" >
              {
                this.props.order.payOrders?
                <RefreshListView
                    
                    data={this.props.order.payOrders.list}
                    keyExtractor={this.keyExtractor}
                    renderItem={this.renderCell}
                    refreshState={this.state.refreshState}
                    onHeaderRefresh={this.onHeaderRefresh}
                    onFooterRefresh={this.onFooterRefresh.bind(this,'payOrders')}
        
                    // 可选
                    footerRefreshingText= '玩命加载中 >.<'
                    footerFailureText = '我擦嘞，居然失败了 =.=!'
                    footerNoMoreDataText= '-我是有底线的-'
                />:null
              }
              </View>
              <View tabLabel="已入住" >
              {
                this.props.order.alreadyOrders?
                <RefreshListView
                    data={this.props.order.alreadyOrders.list}
                    keyExtractor={this.keyExtractor}
                    renderItem={this.renderCellhas}
                    refreshState={this.state.refreshState}
                    onHeaderRefresh={this.onHeaderRefresh}
                    onFooterRefresh={this.onFooterRefresh.bind(this,'alreadyOrders')}
        
                    // 可选
                    footerRefreshingText= '玩命加载中 >.<'
                    footerFailureText = '我擦嘞，居然失败了 =.=!'
                    footerNoMoreDataText= '-我是有底线的-'
                />:null
              }
              </View>
          </ScrollableTabView>
          <Modal
            onBackdropPress={()=>{this.setState({modalVisible:false})}}
            isVisible={this.state.modalVisible}>
            <View style={{height:200,backgroundColor: '#FFFFFF',padding:10,justifyContent:'space-around'}}>
              <Button type='primary' onClick={this.inHouse}>入住</Button>
              <Button type='primary' onClick={this.cancelOrder}>取消订房</Button>
            </View>
          </Modal>
       </View>
 
     )
   }
 }
 
 export default HomePage