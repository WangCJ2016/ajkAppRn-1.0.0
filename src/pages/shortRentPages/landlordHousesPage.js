import React from 'react'
import { 
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity
 } from 'react-native'
 import { connect } from 'react-redux'
 import { landlordHouses,pageSuccess } from '../../reducers/shortRent.redux'
 import RefreshListView, {RefreshState} from 'react-native-refresh-list-view'
 import ListCell from '../../components/listCellCom'
 import InphoneXHoc from '../../hoc/inphoneXhoc'

 @InphoneXHoc
 @connect(
  state => ({landlord: state.landlord}),
  {
    landlordHouses,pageSuccess
  }
)
 class LandlordHousesPage extends React.Component {
  static navigationOptions = ({navigation,screenProps}) => ({  
    headerTitle: navigation.state.params.title,
  })
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
    this.props.pageSuccess({landlordLists:null})
  }
  renderCell(data) {
    const order = data.item
    return (
       <View key={order.id}>
       <ListCell
         image={order.picture}
         p1={order.name}
         p1Style={{color: '#333',fontSize: 16}}
         p2={'¥'+order.defaultPrice}
         p2Style={{color: '#ffb354'}}
         rightRender={()=>(
              <Text style={{color:'#ffb354'}}>更改房价</Text>
         )}
         cb={()=>this.props.navigation.navigate('LandlordHouseCalendar',{houseId:order.id,defaultPrice:order.defaultPrice})}
       ></ListCell>
       </View>
    
    )
  }
 
  onHeaderRefresh(){
   this.setState({refreshState: RefreshState.HeaderRefreshing})
   this.props.landlordHouses({pageNo:1,hotelId:this.props.navigation.state.params.hotelId},(RefreshState)=>{this.setState({refreshState: RefreshState})})
 }
 onFooterRefresh() {
   const hotels = this.props.landlord.landlordLists
   if(hotels.pageNo + 1 <= hotels.totalPages) {
     this.setState({refreshState: RefreshState.FooterRefreshing})
     this.props.landlordHouses({pageNo:hotels.pageNo + 1,hotelId:this.props.navigation.state.params.hotelId},(RefreshState)=>{this.setState({refreshState: RefreshState})})
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
 export default LandlordHousesPage