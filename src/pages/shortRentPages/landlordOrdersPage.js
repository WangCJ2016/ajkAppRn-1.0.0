import React from 'react'
import { 
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity
 } from 'react-native'
 import { connect } from 'react-redux'
 import { landlordOrders,pageSuccess } from '../../reducers/shortRent.redux'
 import RefreshListView, {RefreshState} from 'react-native-refresh-list-view'
 import ListCell from '../../components/listCellCom'
 import ViewUtils from '../../utils/viewUtils'
 import ScrollableTabView,{ScrollableTabBar} from 'react-native-scrollable-tab-view'
 import InphoneXHoc from '../../hoc/inphoneXhoc'

 @InphoneXHoc
 @connect(
  state => ({landlord: state.landlord}),
  {
    landlordOrders,pageSuccess
  }
)
 class LandlordOrdersPage extends React.Component {
  static navigationOptions = ({navigation,screenProps}) => ({  
    headerTitle: navigation.state.params.title,
  })
  constructor() {
    super()
    this.state = {
      dataList: [],
      refreshState:0,
      type:'ongoing'
    }
    this.renderCell = this.renderCell.bind(this)
    this.onHeaderRefresh = this.onHeaderRefresh.bind(this)
    this.onFooterRefresh = this.onFooterRefresh.bind(this)
    this.onChangeTab = this.onChangeTab.bind(this)
  }
  componentDidMount() {
    this.onHeaderRefresh()
  }
  componentWillUnmount() {
    this.props.pageSuccess({landlordLists:null})
  }
  renderCell(data) {
    const order = data.item
    return (
       <View key={order.orderCode}>
       {ViewUtils.orderTitle('订单号'+order.orderCode)}
       {order.hotelsx.map(hotel=>(
        <View key={hotel.hotelId}>
          {
            hotel.houses.map(house=>(
              <View key={house.subOrderId}>
                <ListCell
                  image={house.picture}
                  p1={hotel.hotelName}
                  p1Style={{color: '#333',fontSize: 16}}
                  p2={house.houseName}
                  p3Style={{color: '#ffb354'}}
                  p3={'¥'+house.totalFee}
                ></ListCell>
              </View>
             ))
          }
        </View>
       ))}
       </View>
    
    )
  }
 
  onHeaderRefresh(){
   this.setState({refreshState: RefreshState.HeaderRefreshing})
   this.props.landlordOrders({pageNo:1,type:this.state.type,hotelId:this.props.navigation.state.params.hotelId},(RefreshState)=>{this.setState({refreshState: RefreshState})})
 }
  onFooterRefresh() {
    const hotels = this.props.landlord.landlordLists
    if(hotels.pageNo + 1 <= hotels.totalPages) {
      this.setState({refreshState: RefreshState.FooterRefreshing})
      this.props.landlordOrders({pageNo:hotels.pageNo + 1,type:this.state.type,hotelId:this.props.navigation.state.params.hotelId},(RefreshState)=>{this.setState({refreshState: RefreshState})})
    }else{
      this.setState({refreshState: RefreshState.NoMoreData})
    }
  }
  onChangeTab(e) {
    this.setState({
      type:e.i===0?'ongoing':'end'
    },()=>{
      this.props.pageSuccess({landlordLists:null})
      this.onHeaderRefresh()
    })
  }
 keyExtractor = (item, index) => {
   return item.id
 }

  render() {
    return (
     <View style={{flex:1}}>
     <ScrollableTabView
          style={{flex:1}}
          tabBarUnderlineStyle={{backgroundColor: '#ffb354', height: 2}}
          tabBarInactiveTextColor='mintcream'
          tabBarActiveTextColor='#ffb354'
          tabBarInactiveTextColor='#333'
          tabBarTextStyle={{fontSize:16}}
          ref="scrollableTabView"
          tabBarBackgroundColor="#fff"
          onChangeTab={this.onChangeTab}
          initialPage={0}
          renderTabBar={() => <ScrollableTabBar 
            style={{height: 50, borderWidth: 0.5, elevation: 2}}
                                                        />}
              >
                <View tabLabel="进行中">
                  {
                    this.props.landlord.landlordLists?
                    <RefreshListView
                        data={this.props.landlord.landlordLists.list}
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
                <View tabLabel="已结束" >
                {
                    this.props.landlord.landlordLists?
                    <RefreshListView
                        data={this.props.landlord.landlordLists.list}
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
     </ScrollableTabView>
        
     
   </View>
    )
  }
 }
 

 const styles = StyleSheet.create({
   btn:{
    width: 50,
    height:25,
    borderWidth:0.5,
    borderColor:'#ffb354',
    justifyContent: 'center',
    alignItems: 'center'
   }
 })
 export default LandlordOrdersPage