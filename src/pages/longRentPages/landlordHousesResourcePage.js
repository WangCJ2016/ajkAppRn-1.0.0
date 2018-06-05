import React from 'react'
import { 
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  DeviceEventEmitter,
  SafeAreaView
 } from 'react-native'
 import { connect } from 'react-redux'
 import { landlordResource,landlordHouseDetail,dataSuccess } from '../../reducers/longRent.redux'
 import { getInfo } from '../../reducers/user.redux'
 import { modifyLandlordHouseStatus }  from '../../reducers/longRent-hasRent.redux'
 import ScrollableTabView,{ScrollableTabBar} from 'react-native-scrollable-tab-view'
 import ViewUtils from '../../utils/viewUtils'
 import { Popover, NavBar,Icon,Modal,Toast } from 'antd-mobile'
 import RefreshListView, {RefreshState} from 'react-native-refresh-list-view'
 import BlankPage  from '../../components/blankPage'
 const Item = Popover.Item

 @connect(
   state => ({longRent: state.longRent,user:state.user}),
   {
    landlordResource,landlordHouseDetail,dataSuccess,modifyLandlordHouseStatus,getInfo
   }
 )
 class LandlordHousesResourcePage extends React.Component {
   constructor() {
     super()
     this.state = {
      dataList: [],
      refreshState:0,
      type:'already',
      visible: false
     }
     this.rentTypeSelect = this.rentTypeSelect.bind(this)
     this.renderCell1 = this.renderCell1.bind(this)
     this.renderCell2 = this.renderCell2.bind(this)
     this.renderCell3 = this.renderCell3.bind(this)
     this.onHeaderRefresh = this.onHeaderRefresh.bind(this)
     this.onFooterRefresh = this.onFooterRefresh.bind(this)
     this.onChangeTab = this.onChangeTab.bind(this)
     this.handleWaitPublish = this.handleWaitPublish.bind(this)
     this.publishCb = this.publishCb.bind(this)
   }
  static navigationOptions = ({navigation,screenProps}) => ({  
    headerTitle:'我的房源',  
    headerRight: (  
      <TouchableOpacity onPress={()=>navigation.state.params.rentTypeSelect()}> 
        <View style={{flexDirection:'row',alignItems:'center',marginRight:10}}>
          <Image source={require('../../assets/images/addHouse_icon.png')}></Image> 
        </View>
      </TouchableOpacity>   
        
    ),  
  })
   componentDidMount() {
     this.listener =  DeviceEventEmitter.addListener('REFRESH',(action,params) => this.onHeaderRefresh())
     this.props.getInfo(()=>this.props.navigation.navigate('Login'))
     this.onHeaderRefresh()
     this.props.navigation.setParams({rentTypeSelect:this.rentTypeSelect})
     this.props.dataSuccess({
      DetailFromSource:'landlord'
     })
   }
   componentWillUnmount(){  
    this.listener.remove();  
   }   
   rentTypeSelect() {
    if(!this.props.user.token) {
      this.props.navigation.navigate('Login')
      return
    }
     this.props.dataSuccess({
        auditFail:'',
        houseStatus:0,
        deviceOrderData:{
          wireCount: '',
          wireMeter: '',
          airCount: '',
          airInfrareCount: '',
          airType: '',
          tvCount: '',
          tvInfrareCount: '',
          lightCount: '',
          lightInfrareCount: '',
          totalPrice:'0.01'
          },
          idInfo: {
            name: '',
            cardNo: '',
            cardPictureFront: '',
            cardPictureBack: '',
          },
          houseCertificationInfo: {
            certificateX: '',
            rentalAptitudeX: '',
            fireAptitudeX: '',
            recordAptitudeX: ''
          },
          rentHouseInfo:{
            pictures:'',
            address:'',
            leaseMode:'',
            assorts:'',
            area:'',
            layout:'',
            decorate:'',
            orientation:'',
            rent:'',
            depositType:'',
            leastIn:"",
            title:'',
            profile:'',
            additional:''
          },
     })
     if(this.props.user.landlord.id){
      this.props.navigation.navigate('SignAgree')
     }else{
      this.props.navigation.navigate('IDInfo')
     }
   }
   onChangeTab(e) {
     if(e.i === 0) {
      if(!this.props.longRent.alreadyPages||this.props.longRent.alreadyPages.list.length===0) {
        this.setState({
          type: 'already'
        },()=>{
          this.onHeaderRefresh()
        })
      }else{
        this.setState({
          type: 'already'
        })
      }
     }
     if(e.i === 1) {
       if(!this.props.longRent.waitLeasePages||this.props.longRent.waitLeasePages.list.length===0) {
          this.setState({
            type: 'waitLease'
          },()=>{
            this.onHeaderRefresh()
          })
       }else{
         this.setState({
          type: 'waitLease'
         })
       }
     }
     if(e.i === 2) {
      if(!this.props.longRent.waitPublishPages||this.props.longRent.waitPublishPages.list.length===0) {
         this.setState({
           type: 'waitPublish'
         },()=>{
           this.onHeaderRefresh()
         })
      }else{
        this.setState({
         type: 'waitPublish'
        })
      }
    }
   }
   // 待发布的处理
   handleWaitPublish(order) {
     if(order.status === 1) {
      this.props.landlordHouseDetail({houseId: order.id,type:'wait'}, ()=>this.props.navigation.navigate('JoinHouseMes'))
      this.props.dataSuccess({houseStatus:order.status})
      return
     }
    
     if(order.status === 3) {
       this.props.navigation.navigate('LandlordHouseDetail',{houseId: order.id,type:'wait'});
       this.props.dataSuccess({DetailFromSource:'passShenHe'})
     }
     if(order.status === 5||order.status===2||order.status === 11 || order.status === 12) {
      this.props.landlordHouseDetail({houseId: order.id,type:'wait'}, ()=>this.props.navigation.navigate('JoinHouseMes'))
      this.props.dataSuccess({houseStatus:order.status})
        return
      }
     
     if(order.status === 7||order.status === 6) {
       this.setState({
         visible: true,
         selectHouse: order
       })
       return
    }
     if(order.status === 8) {
      Alert.alert(
        '请与我们联系，说明原因',
        '',
        [
          {text: '确认'},
        ],
        { cancelable: false }
      )
      return
     }
   }
   // publishCb
   publishCb() {
     Toast.info('已成功发布')
     this.setState({
      visible: false
     })
     this.onHeaderRefresh()
   }
   renderCell1(data) {
    const order = data.item
    return ViewUtils.alreadyRentedItem(order,()=>this.props.navigation.navigate('RentHouse',{houseId: order.id,type:'already'}))
   }
   renderCell2(data) {
    const order = data.item
    return ViewUtils.waitRentedItem(order,()=>{
      this.props.navigation.navigate('LandlordHouseDetail',{houseId: order.id,type:'wait'});
      this.props.dataSuccess({DetailFromSource:'landlord'})
    })
   }
   renderCell3(data) {
    const order = data.item
    if(order.status>0) {
      return ViewUtils.alreadyReleaseItem(order,()=>this.handleWaitPublish(order))
    }
    return null
   }
   onHeaderRefresh(){
    this.setState({refreshState: RefreshState.HeaderRefreshing})
    this.props.landlordResource({type: this.state.type,pageNo:1},(RefreshState)=>{this.setState({refreshState: RefreshState})})
   }
  onFooterRefresh() {
    const orders = this.props.longRent[this.state.type+'Pages']
    if(orders.pageNo + 1 <= orders.totalPages) {
      this.setState({refreshState: RefreshState.FooterRefreshing})
      this.props.endOrders({type: this.state.type,pageNo:orders.pageNo + 1},(RefreshState)=>{this.setState({refreshState: RefreshState})})
    }else{
      this.setState({refreshState: RefreshState.NoMoreData})
    }
  }
   keyExtractor = (item, index) => {
     return item.id
   }
   render() {
     return (
      <SafeAreaView style={{flex:1}}>
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
            initialPage={0}
            onChangeTab={this.onChangeTab}
            renderTabBar={() => <ScrollableTabBar 
            style={{height: 50, borderWidth: 0.5, elevation: 2}}
                                                  />}
          >
          <View tabLabel="已出租" style={{flex:1}}>
          {this.props.longRent.alreadyPages&&this.props.longRent.alreadyPages.list.length>0?
            <RefreshListView
            data={this.props.longRent.alreadyPages.list}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderCell1}
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
          <View tabLabel="待出租" style={{flex:1}}>
          {this.props.longRent.waitLeasePages&&this.props.longRent.waitLeasePages.list.length>0?
            <RefreshListView
            data={this.props.longRent.waitLeasePages.list}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderCell2}
            refreshState={this.state.refreshState}
            onHeaderRefresh={this.onHeaderRefresh}
            onFooterRefresh={this.onFooterRefresh}

            // 可选
            footerRefreshingText= '玩命加载中 >.<'
            footerFailureText = '我擦嘞，居然失败了 =.=!'
            footerNoMoreDataText= '-我是有底线的-'
          />:<BlankPage></BlankPage>}
          </View>
          <View tabLabel="待发布" style={{flex:1}}>
          {this.props.longRent.waitPublishPages&&this.props.longRent.waitPublishPages.list.length>0?
            <RefreshListView
            data={this.props.longRent.waitPublishPages.list}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderCell3}
            refreshState={this.state.refreshState}
            onHeaderRefresh={this.onHeaderRefresh}
            onFooterRefresh={this.onFooterRefresh}

            // 可选
            footerRefreshingText= '玩命加载中 >.<'
            footerFailureText = '我擦嘞，居然失败了 =.=!'
            footerNoMoreDataText= '-我是有底线的-'
          />:<BlankPage></BlankPage>}
          </View>
        </ScrollableTabView>
        <Modal
          title="测试设备"
          transparent
          maskClosable={false}
          visible={this.state.visible}
          footer={[{ text: '取消',style: { color:"#ccc" }, onPress: () => this.setState({visible: false})},
          { text: '房源发布',style: { fontWeight: 'bold' }, onPress: () => {
            this.props.modifyLandlordHouseStatus({houseId: this.state.selectHouse.id,type:'release'},this.publishCb)} }]}
        > 
          <View style={{paddingTop: 20,paddingBottom: 20}}>
            <Text style={{fontSize:15,lineHeight:20}}>点击确定后房源将在平台上发布，请仔细测试设备安装情况</Text>
          </View>
        </Modal>
       </View>
       </SafeAreaView>
     )
   }
 }
 
 export default LandlordHousesResourcePage