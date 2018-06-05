import axios from 'axios'
import { Toast } from 'antd-mobile'

// 拦截请求
axios.interceptors.request.use(function(config) {
    if(config.url.includes('smartHostControl')) {
      return config
    }
    Toast.loading('加载中',3)
    return config
})
// 拦截响应
axios.interceptors.response.use(function(config) {
        Toast.hide()
    return config
})


export const config = {
  header: {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  },
  api: {
    base: 'http://47.100.123.83/aijukex/', //'http://47.100.123.83/aijukex/
    // imgupload
    uploadImage:'op/op_imgUpload', 
    // user
    getInfo: 'op/op_getCustomerInfo',
    login: 'op/op_login',
    getRegisterVerCode: 'op/op_generateCheckCode',
    register:'op/op_validateCheckCode',
    forgetPws: 'op/op_retrievePassword',
    idCard: 'op/op_customerIdentityBinding',
    bindPhoneCode: 'op/op_bindingTelephoneCode',
    bindPhone:'op/op_customerTelephoneBinding',
    modifyHeadPicture: 'op/op_customerModifyHeadPicture',
    changepsw:'op/op_customerModifyPassword',
    // mainpage
    homeBanner: 'op/op_queryHomePageBannerPage',
    homeHotelPage: 'op/op_queryHomePageHotelsPage',
    intentRecord:'op/op_landOrCusIntentRecords',
    addLintent: 'op/op_createLeaseIntent',
    // hotel
    hotelDetail: 'op/op_viewHotelDetail',
    hotelRoomList: 'op/op_queryHotelHousesPage',
    addCollection: 'op/op_addCustomerCollect',
    cancelCollection: 'op/op_cancelCustomerCollect',
    hotelRoomDetail:'op/op_viewHotelHousesDetail',
    roomCalendar:'op/op_queryRoomCalendar',
    searchHotels:'op/op_queryHotelsPage',
    queryNearbySearch:"op/op_queryNearbySearch",
    customerCollectPage:'op/op_queryCustomerCollectPage',
    // order
    addshopCar:'op/op_addCustomerCart',
    shopCarList:'op/op_queryCustomerCartPage',
    shopCardel: 'op/op_deleteCustomerCart',
    checkHouseWhetherReserve: 'op/op_checkHouseWhetherReserve',
    submitOrder: 'op/op_submitOrder',
    payOrders: 'op/op_queryOrderPage',
    orderDetail: 'op/op_viewOrderDetail',
    orderBeComment: 'op/op_queryJudgeOrders',
    customerFeedBack: 'op/op_customerFeedBack',
    endOrders:'op/op_queryCustomerOrders',
    consumeRecords: 'op/op_customerConsumeRecords',
    getAlipayParams: 'op/op_getOrderInfo', 
    cancelOrder:'op/op_cancleOrder',
    // shortRent
     dayIncome:'op/op_landlordDayIncome',
     monthIncome: 'op/op_landlordMonthIncome',
     landlordHotels: 'op/op_landlordHotels',
     landlordHouses:'op/op_landlordHotelHouses',
     landlordOrders:'op/op_queryLandlordOrders',
     houseCalendar:'op/op_queryRoomCalendar',
     landlordModifyHousePrice: 'op/op_landlordModifyHousePrice',
     // longRent
     landlordLeaseHouses:'op/op_landlordLeaseHouses',
     houseAssorts: 'op/op_queryHouseAssorts',
     becomLandlord: 'op/op_customerBecomeLandlord',
     devicesOrderSubmit: 'op/op_submitDevicesOrder',
     modifyDeviceOrder:'op/op_modifyDevicesOrder',
     addLandlordHouse: 'op/op_addLandlordHouse',
     modifyLandlordHouse: 'op/op_modifyLandlordHouse',
     landlordHouseAptitudes: 'op/op_addLandlordHouseAptitudes',
     modifyHouseAptitudes: 'op/op_modifyLandlordHouseAptitudes',
     landlordHouseDetail: 'op/op_viewLandlordHouseDetail',
     renewProtocol: 'op/op_landlordRenewProtocol',
     renewContract: 'op/op_landlordRenewContract',
     stopContract: 'op/op_landlordCustomerStopContract',
     powerRelayList:'op/op_queryPowerRelayPage',
     powerRelayControl:'op/op_powerRelayControl',
     currentPower:'op/op_queryCurrentPower',
     historyPower:'op/op_queryHisUesdPower',
     warmPowerList:'op/op_queryPowerWarnPage',
     addPowerWarm:'op/op_createPowerWarn',
     modifyPowerWarm:'op/op_modifyPowerWarn',
     powerRecord:'op/op_queryPowerWarnRecords',
     modifyLandlordHouseStatus:'op/op_modifyLandlordHouseStatus',
     offlineLease: 'op/op_landlordOfflineLease',
     modifyLeaseIntent:'op/op_modifyLeaseIntent',
     delLeaseIntent:'op/op_deleteLeaseIntents',
     endAgreementDevices:'op/op_queryLandlordDevices',
    // customer
    modifySubOrdersStatus:'op/op_modifySubOrdersStatus',
    cancleSubOrder: 'op/op_cancleSubOrder', 
    // ctrl
    houseHostInfo:'op/op_viewHouseHostInfo',
    getDeviceWays: 'we/we_querySmartDeviceWays',
    smartHostCtrl:'op/op_smartHostControl',
    hostScenes:'op/op_queryHostScenes',
    tvDevicesInfo:'we/we_queryTvDevices',
    queryDeviceType:"op/op_queryDeviceType",
    ctrlHostDeviceByType:"we/we_queryHostDeviceByType",
    elevatorHost:'we/we_queryElevatorHost',
    curtainData: 'we/we_queryCurtains',
    powerControl: 'we/we_powerControl',
    // map
    longRentSearchList: 'op/op_queryLandlordHousePage'
  }
}