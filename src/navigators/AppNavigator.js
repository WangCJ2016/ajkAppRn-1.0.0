import React from 'react';
import { 
  Text,
  Image
 } from 'react-native'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator,TabNavigator,withNavigation,NavigationActions } from 'react-navigation';

import HomePage from '../pages/homePage'
import DiscoverPage from '../pages/discoverPage'
import MainPage from '../pages/MainPage'
import ShopCarPage from '../pages/orderPages/shopcarPage'
import UserCenterPage from '../pages/usercenterPage'
//user
import LoginPage from '../pages/userPages/loginPage'
import UserSettingPage from '../pages/userPages/userSettingPage'
import RegisterPage from '../pages/userPages/registerPage'
import ForgetPswPage from '../pages/userPages/forgetPswPage'
import IdentifyPage from '../pages/userPages/identifyPage'
import BindPhonePage from '../pages/userPages/bingPhonePage'
import ModifyPswPage from '../pages/userPages/modifyPswPage'
// hotel
import HotelDetailPage from '../pages/hotelPages/hotelDetailPage'
import HotelInfoPage from '../pages/hotelPages/hotelInfoPage'
import HotelAssortPage from '../pages/hotelPages/hotelAssortsPage'
import HotelPicPage from '../pages/hotelPages/hotelPicPage'
import HotelRoomDetailPage from '../pages/hotelPages/hotelRoomDetailPage'
import RoomDateSelectPage from '../pages/hotelPages/roomDateSelectPage'
import MyFavouritePage from '../pages/hotelPages/myFavouritePage'
// order
import OrderDetailPage from '../pages/orderPages/orderDetailPage'
import NoPayOrdersPage from '../pages/orderPages/noPayOrdersPage'
import NoPayOrderDetailPage from '../pages/orderPages/noPayOrderDetailPage'
import PayOrdersPage from '../pages/orderPages/payOrdersPage'
import PayOrderDetailPage from '../pages/orderPages/payOrdersDetailPage'
import OrderBeCommentPage from '../pages/orderPages/orderBeCommentPage'
import CommentPage from '../pages/orderPages/commentPage'
import EndOrdersPage from '../pages/orderPages/endOrdersPage'
import EndOrderDetailPage from '../pages/orderPages/endOrderDetailPage'
import ConsumeRecordsPage from '../pages/orderPages/consumeRecordsPage'
// shortrent
import LandlordMenuPage from '../pages/shortRentPages/landlordMenuPage'
import LandLoadAccountPage from '../pages/shortRentPages/landlordAcountPage'
import LandlordHotelsPage from '../pages/shortRentPages/landlordHotelsPage'
import LandlordHousesPage from '../pages/shortRentPages/landlordHousesPage'
import LandlordOrdersPage from '../pages/shortRentPages/landlordOrdersPage'
import LandlordHouseCalendarPage from '../pages/shortRentPages/landlordHouseCalendarPage'
// // longrent
import LandlordHouseDetailPage from '../pages/longRentPages/landlordHouseDetailPage'
import LandlordHousesResourcePage from '../pages/longRentPages/landlordHousesResourcePage'
import SignAgreePage from '../pages/longRentPages/signAgreementPage'
import JoinHouseMesPage from '../pages/longRentPages/joinHouseMesPage'
import DeviceChoosePage from '../pages/longRentPages/devicesChoosePage'
import AddPicPage from '../pages/longRentPages/addPicPage'
import HouseInfoPage from '../pages/longRentPages/houseInfoPage'
import PayInfoPage from '../pages/longRentPages/payInfoPage'
import IDInfoPage from '../pages/longRentPages/idInfoPage'
import RentHousePage from '../pages/longRentPages/rentHousePage'
import SmartTestPage from '../pages/longRentPages/smartTestPage'
import AddPowerWarnDevicePage from '../pages/longRentPages/addPowerWarnDevicePage'
import EndAgreeMentPage from '../pages/longRentPages/endAgreementPage'
import ContinueAgreeMentPage from '../pages/longRentPages/continueAgreeMentPage'
import HouseCertificationPage from '../pages/longRentPages/houseCertificationPage'
import OffLineLeasePage from '../pages/longRentPages/offLineLeasePage'
import ContractInfoPage from '../pages/longRentPages/contractInfo'
// map
   import TypeSearchPage from '../pages/mapPages/typeSearchPage'
   import CitySelectPage from '../pages/mapPages/citySelectPage'
   import NearbySearchPage from '../pages/mapPages/nearbySearchPage'
 import SearchSetPage from '../pages/mapPages/searchSetPage'
// // ctrl
import HomeCtrlPage from '../pages/ctrlPages/homePage'
import ServicePage from '../pages/ctrlPages/servicePage'
import ModelPage from '../pages/ctrlPages/modelPage'
import TvCtrlPage from '../pages/ctrlPages/tvPage'
import AirCtrlPage from '../pages/ctrlPages/airPage'
import LightCtrlPage from '../pages/ctrlPages/lightPage'
import LockPage from '../pages/ctrlPages/lockPage'
import CurtainCtrlPage from '../pages/ctrlPages/curtainPage'

import LandlordInterntPage from '../pages/landlordIntentPage'
import CustomerIntentPage from '../pages/customerIntentPage'

import HomeTabItem from './homeTabItem'


const MainScreenNavigator = TabNavigator({
  MainPage: { 
    screen: MainPage,
    navigationOptions: {
      title:'首页',
      header: false,
      headerTintColor: '#fff',
      tabBarIcon: ({focused,tintColor}) =>(
        <Image style={[{tintColor: tintColor},{width:22,height:22}]} source={require('../assets/images/main.png')} />
      ),
    },
  },
  DiscoverPage: { 
    screen: DiscoverPage,
    navigationOptions: {
      header:null,
      tabBarLabel: '发现',
      tabBarIcon: ({focused,tintColor}) =>(
        <Image style={[{tintColor: tintColor},{width:22,height:22}]} source={require('../assets/images/discover.png')} />
      ),
    },
  },
  HomePage: { 
    screen: HomePage,
    navigationOptions: {
      header:false,
      tabBarLabel:(<Text></Text>),
      tabBarIcon: ({focused,tintColor}) =>(
        <HomeTabItem  focused={focused}/>
      ),
    },
   
  },
  ShopCarPage: { 
    screen: ShopCarPage,
    navigationOptions: {
      title:'购物车',
      tabBarLabel: '购物车',
      tabBarIcon: ({focused,tintColor}) =>(
        <Image style={[{tintColor: tintColor},{width:22,height:22}]} source={require('../assets/images/shopcar.png')} />
      ),
    },
  },
  UserCenterPage: { 
    screen: UserCenterPage,
    navigationOptions: {
      title:'我的',
      tabBarLabel: '我的',
      tabBarIcon: ({focused,tintColor}) =>(
        <Image style={[{tintColor: tintColor},{width:22,height:22}]} source={require('../assets/images/usercenter.png')} />
      ),
    },
   },
   },{
    initialRouteName:'MainPage',
    lazy:true,
    TabBarTop: true,
    swipeEnabled:false,
    animationEnabled:false,
    tabBarOptions: {
        style: {
            height:49
        },
      activeBackgroundColor:'white',
      activeTintColor:'#ffb354',
      inactiveBackgroundColor:'white',
      inactiveTintColor:'#aaa',
      labelStyle:{fontSize:13}
  }
})


export const AppNavigator = StackNavigator({
  Main: { screen: MainScreenNavigator },
  Login: { 
    screen: LoginPage,
    navigationOptions: {
      title:'登录',
      }
  },
  UserSetting: { 
    screen: UserSettingPage,
    navigationOptions: {
      title:'个人设置',
      }
  },
  Register: {
    screen: RegisterPage,
    navigationOptions: {
      title:'注册',
      }
  },
  ForgetPsw: {
    screen: ForgetPswPage,
    navigationOptions: {
      title:'找回密码',
      }
  },
  Identify: {
    screen: IdentifyPage,
    navigationOptions: {
      title:'身份绑定',
      }
  },
  BindPhone: {
    screen: BindPhonePage,
    navigationOptions: {
      title:'绑定手机',
      }
  },
  ModifyPsw: {
    screen: ModifyPswPage,
    navigationOptions: {
      title:'修改密码',
      }
  },
  MyFavourite:{
    screen:MyFavouritePage,
    navigationOptions: {
      title:'我的收藏',
      }
  },
  HotelDetail: {
    screen: HotelDetailPage,
    navigationOptions: {
      header: false
    }
  },
  HotelInfo: {
    screen: HotelInfoPage,
    navigationOptions: {
      title:'酒店详情',
    }
  },
  HotelAssort: {
    screen: HotelAssortPage,
    navigationOptions: {
      title:'酒店设施',
    }
  },
  HotelPic: {
    screen: HotelPicPage,
    navigationOptions: {
      title:'酒店图片',
    }
  },
  HotelRoomDetail:{
    screen: HotelRoomDetailPage,
    navigationOptions: {
      header: false
    }
  },
  RoomDateSelect:{
    screen:RoomDateSelectPage,
    navigationOptions: {
      title:'日期选择',
    }
  },
  OrderDetail:{
    screen: OrderDetailPage,
    navigationOptions: {
      header: false
    }
  },
  NoPayOrders: {
    screen: NoPayOrdersPage,
    navigationOptions: {
      title:'代付款',
    }
  },
  NoPayOrderDetail:{
    screen: NoPayOrderDetailPage,
    navigationOptions: {
      title:'代付款订单详情',
    }
  },
  PayOrders: {
    screen: PayOrdersPage,
    navigationOptions: {
      title:'已付款',
    }
  },
  PayOrderDetail:{
    screen:PayOrderDetailPage,
    navigationOptions: {
      title:'已付款订单详情',
    }
  },
  OrderBeComment: {
    screen: OrderBeCommentPage,
    navigationOptions: {
      title:'待评价',
    }
  },
  CommentPage: {
    screen:CommentPage
  },
  EndOrders:{
    screen: EndOrdersPage,
    navigationOptions: {
      title:'已结束',
    }
  },
  EndOrderDetail: {
    screen: EndOrderDetailPage,
    navigationOptions: {
      title:'已结束',
    }
  },
  ConsumeRecords: {
    screen: ConsumeRecordsPage,
    navigationOptions: {
      title:'消费流水',
    }
  },
  LandlordMenu: {
    screen: LandlordMenuPage,
    navigationOptions: {
      title:'我是房东',
    }
  },
  LandLoadAccount: {
    screen: LandLoadAccountPage,
  },
  LandlordHotels: {
    screen: LandlordHotelsPage,
    navigationOptions: {
      title:'房源',
    }
  },
  LandlordHouses: {
    screen: LandlordHousesPage,
  },
  LandlordOrders:{
    screen: LandlordOrdersPage,
    navigationOptions: {
      title:'我的订单',
    }
  },
  LandlordHouseCalendar:{
    screen: LandlordHouseCalendarPage,
    navigationOptions: {
      title:'房态日历',
    }
  },
  LandlordHouseDetail:{
    screen: LandlordHouseDetailPage,
    navigationOptions: {
      title:'房源信息',
    }
  },
  LandlordHousesResource:{
    screen:LandlordHousesResourcePage,
  },
  SignAgree:{
    screen: SignAgreePage,
  },
  TypeSearch: {
    screen:TypeSearchPage
  },
  CitySelect:{
    screen:CitySelectPage,
    navigationOptions: {
      title:'选择城市',
    }
  },
  NearbySearch:{
    screen:NearbySearchPage,
  },
  SearchSet:{
    screen: SearchSetPage,
    navigationOptions: {
      title:'搜索设置',
    }
  },
  HomeCtrl:{
    screen:HomeCtrlPage,
    navigationOptions: {
      header:false,
    }
  },
  ServiceCtrl:{
    screen:ServicePage,
    navigationOptions: {
      title:'服务',
    }
  },
  ModelCtrl:{
    screen:ModelPage,
    navigationOptions: {
      title:'情景模式',
    }
  },
  TvCtrl:{
    screen:TvCtrlPage,
    navigationOptions: {
      title:'电视机',
    }
  },
  AirCtrl:{
    screen:AirCtrlPage,
    navigationOptions: {
      title:'空调',
    }
  },
  LightCtrl:{
    screen:LightCtrlPage,
    navigationOptions: {
      title:'灯',
    }
  },
  LockCtrl: {
    screen:LockPage,
    navigationOptions: {
      title:'房卡',
    }
  },
  CurtainCtrl: {
    screen:CurtainCtrlPage,
    navigationOptions: {
      title:'窗帘',
    }
  },
  JoinHouseMes: {
    screen: JoinHouseMesPage,
    navigationOptions: {
      title:'房源信息',
    }
  },
  DeviceChoose:{
    screen:DeviceChoosePage,
    navigationOptions: {
      title:'配套设施',
    }
  },
  AddPic: {
    screen:AddPicPage,
    navigationOptions: {
      title:'添加照片',
    }
  },
  HouseInfo:{
    screen: HouseInfoPage
  },
  PayInfo:{
    screen:PayInfoPage,
    navigationOptions: {
      title:'支付信息',
    }
  },
  IDInfo: {
    screen:IDInfoPage,
    navigationOptions: {
      title:'身份信息',
    }
  },
  RentHouse:{
    screen: RentHousePage,
  },
  SmartTest:{
    screen:SmartTestPage,
    navigationOptions: {
      title:'智能检测',
    }
  },
  AddPowerWarnDevice:{
    screen: AddPowerWarnDevicePage,
    navigationOptions: {
      title:'预警设置',
    }
  },
  EndAgreeMent: {
    screen: EndAgreeMentPage
  },
  ContinueAgreeMent:{
    screen:ContinueAgreeMentPage,
  },
  HouseCertification: {
    screen: HouseCertificationPage
  },
  LandlordInternt:{
    screen: LandlordInterntPage,
    navigationOptions: {
      title:'房东意向',
    }
  },
  CustomerIntent:{
    screen: CustomerIntentPage,
    navigationOptions: {
      title:'我的意向',
    }
  },
  OffLineLease:{
    screen: OffLineLeasePage,
  },
  ContractInfo: {
    screen: ContractInfoPage,
  }
},{
  initialRouteName:'Main',
  navigationOptions: {
    headerTitleStyle: {fontSize: 20, color: '#333'},
    headerStyle: {height: 48, backgroundColor: '#fff'},
    headerBackTitleStyle:{color:'#333'},
    headerTintColor:'#333',
    headerTruncatedBackTitle:'返回'
 },
});

const AppWithNavigationState = () => {
  //if(!user.token) getInfo()(dispatch) 
  return <AppNavigator  />
}



export default AppWithNavigationState
