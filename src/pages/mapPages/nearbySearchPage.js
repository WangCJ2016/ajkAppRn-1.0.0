import React from 'react'
import { 
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
  StyleSheet,
  TextInput,
  Dimensions,
  SafeAreaView
 } from 'react-native'
 import DropdownMenu from '../../components/react-native-dropdown-menu/DropdownMenu'
 import NavigationBar from '../../components/navigationBar'
 import TypeSearchPage from './typeSearchPage'
 import { connect } from 'react-redux'
 import { searchHotelPages,queryNearbySearch,longRentSearchPage,dataSuccess } from '../../reducers/map.redux'
 import { dataSuccess as dataSuccess2 } from '../../reducers/longRent.redux'
 import RefreshListView, {RefreshState} from 'react-native-refresh-list-view'
 import ViewUtils from '../../utils/viewUtils'
 import HotelModal from '../../components/nearbySearchModal/hotelModal'
 const WIDTH = Dimensions.get('window').width
 import { isIphoneX } from '../../utils/fnUtils'

 @connect(
   state => ({map:state.map}),
   {
    searchHotelPages,queryNearbySearch,longRentSearchPage,dataSuccess,dataSuccess2
   }
 )
 class NearbySearchPage extends React.Component {
   constructor(props) {
     super(props)
     this.state = {
       modalVisible: false,
       conditionModalVisible: false,
       dataList: [],
       refreshState:0,
       searchType:props.map.searchInfo.type,
     }
     this.modalAction = this.modalAction.bind(this)
     this.renderCell = this.renderCell.bind(this)
     this.onHeaderRefresh = this.onHeaderRefresh.bind(this)
     this.onFooterRefresh = this.onFooterRefresh.bind(this)
     this.onChangeText = this.onChangeText.bind(this)
     this.onSubmitEditing = this.onSubmitEditing.bind(this)
   }
   static navigationOptions = ({navigation,screenProps}) => ({  
    header: <NavigationBar
      style={{paddingTop: isIphoneX()?20:0}}
      titleView={
        <View style={styles.searchView}>
          <Image style={{marginLeft:10,marginRight:15}} source={require('../../assets/images/sousuo.png')}></Image>
          <TextInput style={{fontSize:16,flex:1}} 
            placeholder='小区或地址' 
            returnKeyType='search'
            onSubmitEditing={()=>navigation.state.params.onSubmitEditing()}
            numberOfLines={1}
            onChangeText={(e)=>navigation.state.params.onChangeText(e)}></TextInput>
        </View>  
      }
      leftButton={<TouchableOpacity onPress={()=>navigation.goBack()} style={{marginLeft: 5,padding:10}}>
          <Image style={{tintColor:'#333'}}  source={require('../../assets/images/left_arr_icon.png')}></Image>
        </TouchableOpacity>}
      ></NavigationBar>
   })
   componentDidMount() {
     this.onHeaderRefresh()
     this.props.navigation.setParams({onChangeText: this.onChangeText})
     this.props.navigation.setParams({onSubmitEditing: this.onSubmitEditing})
   }
   componentWillUnmount() {
     this.props.dataSuccess({searchInfo:{
      address:'',
      price:'',
      keyword:'',
      leaseMode:'',
      layout:'',
      addressMark:''
    }})
   }
   onChangeText(e) {
     this.setState({
      keyword: encodeURI(e)
     })
   }
   onSubmitEditing() {
      this.props.dataSuccess({searchInfo:{...this.props.map.searchInfo,keyword: encodeURI(this.state.keyword)}})
      this.props.searchHotelPages({...this.props.map.searchInfo,keyword: encodeURI(this.state.keyword)})
   }
   modalAction(name) {
     this.setState({
       modalVisible:!this.state.modalVisible
     })
     if(this.props.map.searchInfo.type==='酒店') {
      this.props.dataSuccess({searchInfo:{...this.props.map.searchInfo,addressMark: encodeURI(name)}})
      this.props.searchHotelPages({
        ...this.props.map.searchInfo,
        addressMark: encodeURI(name)  
      })
     }
   }
   
   threeClickFn() {
      this.setState({
        conditionModalVisible:true
      })
   }
   conditionModalVisibleHandle(info) {
     this.props.dataSuccess({searchInfo:{...this.props.map.searchInfo,...info}})
     this.setState({
      conditionModalVisible: false
     })
     if(this.state.searchType === '长租') {
      this.props.longRentSearchPage({...info})
     }
   }
   conditionSearch(name) {
       this.props.dataSuccess({searchInfo:{...this.props.map.searchInfo,type:name}})
       this.setState({
         searchType: name
       },()=>{
        this.onHeaderRefresh()
       })
   }
  
   
   renderCell(data) {
     const hotel = data.item
     if(this.props.map.searchInfo.type==='长租'){ 
       return ViewUtils.longRentSearchItem(hotel,()=>{
         this.props.navigation.navigate('LandlordHouseDetail',{houseId: hotel.id,type:'wait'});
         this.props.dataSuccess2({
           DetailFromSource:'search'
         })
        })
     }
     if(this.props.map.searchInfo.type==='酒店'){ 
      return  (
        ViewUtils.homehotelCell(hotel,this.props.navigation)
      )
     }
   }
   onHeaderRefresh(){
      const type = this.state.searchType
      this.setState({refreshState: RefreshState.HeaderRefreshing})
      if(type==='长租') {
        const searchInfo = this.props.map.searchInfo
        this.props.longRentSearchPage(searchInfo,(RefreshState)=>{this.setState({refreshState: RefreshState})})
      }
      if(type==='酒店') {
        const searchInfo = this.props.map.searchInfo
        this.props.searchHotelPages(searchInfo,(RefreshState)=>{this.setState({refreshState: RefreshState})})
      }
  }
   onFooterRefresh() {
    let  hotels
    const searchInfo = this.props.map.searchInfo
    if(searchInfo.type==='长租') {
      hotels = this.props.map.longRentSearchList
    }
    if(searchInfo.type==='酒店') {
      hotels = this.props.map.hotelSearchList
    }
    if(hotels.pageNo + 1 <= hotels.totalPages) {
      this.setState({refreshState: RefreshState.FooterRefreshing})
      if(this.props.map.searchInfo.type==='长租') {
        this.props.longRentSearchPage(searchInfo,(RefreshState)=>{this.setState({refreshState: RefreshState})})
      }
      if(this.props.map.searchInfo.type==='酒店') {
        this.props.searchHotelPages(searchInfo,(RefreshState)=>{this.setState({refreshState: RefreshState})})
      }
      
    }else{
      this.setState({refreshState: RefreshState.NoMoreData})
    }
   }
    keyExtractor = (item, index) => {
      return item.id
    }
   render() {
     
     const data = [["地址区域"],['酒店','长租','短租'],["更多筛选"]];
     return (
      <SafeAreaView style={{flex: 1}}>
       <View style={{flex: 1}} >
        
        <DropdownMenu style={{flex: 1}}
          bgColor={"#fff"}                            //the background color of the head, default is grey
          tintColor={"#333"}                        //the text color of the head, default is white
          selectItemColor={"#ffb354"}                    //the text color of the selected item, default is red
          data={data}                                
          maxHeight={410}     
          firstClickFn={this.modalAction.bind(this)}
          secondTitle={this.props.map.searchInfo.type}
          threeClickFn={this.threeClickFn.bind(this)}        
          handler={(selection, row) => this.conditionSearch(data[selection][row])} >

          <View style={{flex:1}}>
            {
              this.props.map.searchInfo.type==='酒店'&&this.props.map.hotelSearchList?
              <RefreshListView
                    data={this.props.map.hotelSearchList.list}
                    keyExtractor={this.keyExtractor}
                    renderItem={this.renderCell}
                    refreshState={this.state.refreshState}
                    onHeaderRefresh={this.onHeaderRefresh}
                    onFooterRefresh={this.onFooterRefresh}

                    // 可选
                    footerRefreshingText= '玩命加载中 >.<'
                    footerFailureText = '我擦嘞，居然失败了 =.=!'
                    footerNoMoreDataText= '-我是有底线的-'
                />:
                null
            }
            {
              this.props.map.searchInfo.type==='长租'&&this.props.map.longRentSearchList?
              <RefreshListView
                    data={this.props.map.longRentSearchList.list}
                    keyExtractor={this.keyExtractor}
                    renderItem={this.renderCell}
                    refreshState={this.state.refreshState}
                    onHeaderRefresh={this.onHeaderRefresh}
                    onFooterRefresh={this.onFooterRefresh}

                    // 可选
                    footerRefreshingText= '玩命加载中 >.<'
                    footerFailureText = '我擦嘞，居然失败了 =.=!'
                    footerNoMoreDataText= '-我是有底线的-'
                />:
                null
            }
            </View>
        </DropdownMenu>

        <Modal
          onBackdropPress={()=>{this.setState({modalVisible:false})}}
          animationType={'slide'}
          visible={this.state.modalVisible}>
          <View style={{flex:1,backgroundColor: '#FFFFFF'}}>
            <NavigationBar
            style={{backgroundColor:'#f8f8f8'}}
            title='区域位置'
            leftButton={
              <TouchableOpacity 
              onPress={this.modalAction}
              style={{marginLeft:20}}>
                <Image style={{tintColor:'#333'}} source={require('../../assets/images/close_icon.png')}></Image>
              </TouchableOpacity>
            }
            ></NavigationBar>
            <TypeSearchPage modal={true} modalAction={this.modalAction}></TypeSearchPage>
          </View>
        </Modal>
          
        <HotelModal 
         conditionModalVisible={this.state.conditionModalVisible}
         conditionModalVisibleHandle={this.conditionModalVisibleHandle.bind(this)}
         type={this.props.map.searchInfo.type}
        ></HotelModal>  
        
      </View>
      </SafeAreaView>
     )
  }
}
 const styles = StyleSheet.create({
   searchView:{
     position: 'absolute',
     left:10,
     right:-10,
     backgroundColor:'#fff',
    height:35,
    borderRadius:5,
    borderColor:'#aaa',
    borderWidth:0.5,
    alignItems: 'center',
    flexDirection: 'row',
   },
   moreModalTitle:{
     fontSize:16,
     marginTop: 20,
     marginBottom: 20,
     marginLeft:10
   }
 })

 export default NearbySearchPage