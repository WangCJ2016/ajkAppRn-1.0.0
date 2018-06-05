import React from 'react'
import { 
  View,
  Text,
  Image,
  TouchableHighlight
 } from 'react-native'
 import { connect } from 'react-redux'
 import { orderBeComment,payOrdersSuccess } from '../../reducers/shopcar.redux'
 import RefreshListView, {RefreshState} from 'react-native-refresh-list-view'
 import ViewUtils from '../../utils/viewUtils'
 import BlankPage from '../../components/blankPage'
 import InphoneXHoc from '../../hoc/inphoneXhoc'

 @InphoneXHoc
 @connect(
  state => ({order: state.order}),
  {
    orderBeComment,payOrdersSuccess
  }
)
 class OrderBeCommentPage extends React.Component {
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
     this.props.orderBeComment({pageNo:1})
   }
   renderCell(data) {
    const hotel = data.item
    return (
       <View key={hotel.id}>
         {ViewUtils.orderTitle(hotel.hotelName)}
         {
         <View style={{flexDirection:'row',padding:10,alignItems:'center',backgroundColor: '#faf9f9'}}>
             <Image source={{uri:hotel.picture,width:75,height:60}}></Image>
             <View  style={{flex:1,marginLeft:10,justifyContent:'space-between',height:60}}>
               <Text numberOfLines={1} style={{color:'#ababab',fontSize:12}}>{hotel.address}</Text>
               <Text numberOfLines={1} style={{color:'#ababab',fontSize:12}}>{hotel.houseName}</Text>
               <Text numberOfLines={1} style={{color:'#ababab',fontSize:12}}>入住时间:{hotel.inTime.split(' ')[0]+" "+hotel.leaveTime.split(' ')[0]}</Text>
             </View>
             
             <Text 
             onPress={()=>this.props.navigation.navigate('CommentPage',{hotel:hotel})}
             style={{width:50,height:25,borderWidth:0.5,borderColor: '#ffb354',borderRadius:2,backgroundColor: '#FFFFFF',textAlign: 'center',lineHeight:25,color:'#ffb354'}}>评价</Text>
         </View>
         }
       </View>
    )
  }
 
  onHeaderRefresh(){
   this.setState({refreshState: RefreshState.HeaderRefreshing})
   this.props.orderBeComment({pageNo:1},(RefreshState)=>{this.setState({refreshState: RefreshState})})
 }
 onFooterRefresh() {
   const orders = this.props.order.commentHotels
   if(orders.pageNo + 1 <= orders.totalPages) {
     this.setState({refreshState: RefreshState.FooterRefreshing})
     this.props.orderBeComment({pageNo:orders.pageNo + 1},(RefreshState)=>{this.setState({refreshState: RefreshState})})
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
        this.props.order.commentHotels&&this.props.order.commentHotels.list.length?
        <RefreshListView
            data={this.props.order.commentHotels.list}
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
 
 export default OrderBeCommentPage