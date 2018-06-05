import React from 'react'
import { 
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity
 } from 'react-native'
 import { connect } from 'react-redux'
 import { landlordHotels } from '../../reducers/shortRent.redux'
 import RefreshListView, {RefreshState} from 'react-native-refresh-list-view'
 import ViewUtils from '../../utils/viewUtils'
 import ListCell from '../../components/listCellCom'
 import InphoneXHoc from '../../hoc/inphoneXhoc'

 @InphoneXHoc
 @connect(
  state => ({landlord: state.landlord}),
  {
    landlordHotels
  }
)
 class LandlordHotelsPage extends React.Component {
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
    return (
       <View key={order.id}>
       <ListCell
         image={order.mainPicture}
         p1={order.name}
         p1Style={{color: '#333',fontSize: 16}}
         p2={order.address}
         p3={'共'+order.houseCounts+'间'+' 已出租'+order.leaseCounts+'间'}
       ></ListCell>
        <View style={{flexDirection:'row',padding:10,justifyContent:'space-around'}}>
          <TouchableOpacity style={styles.btn} onPress={()=>this.props.navigation.navigate('LandlordHouses',{hotelId:order.id,title:order.name})}>
            <Text style={{color:'#616161'}}>详情</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={()=>this.props.navigation.navigate('LandlordOrders',{hotelId:order.id})}>
            <Text style={{color:'#616161'}}>订单</Text>
          </TouchableOpacity>
        </View>
       </View>
    
    )
  }
 
  onHeaderRefresh(){
   this.setState({refreshState: RefreshState.HeaderRefreshing})
   this.props.landlordHotels({pageNo:1},(RefreshState)=>{this.setState({refreshState: RefreshState})})
 }
 onFooterRefresh() {
   const hotels = this.props.landlord.landlordHotels
   if(hotels.pageNo + 1 <= hotels.totalPages) {
     this.setState({refreshState: RefreshState.FooterRefreshing})
     this.props.landlordHotels({pageNo:hotels.pageNo + 1},(RefreshState)=>{this.setState({refreshState: RefreshState})})
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
       this.props.landlord.landlordHotels?
       <RefreshListView
           data={this.props.landlord.landlordHotels.list}
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
 export default LandlordHotelsPage