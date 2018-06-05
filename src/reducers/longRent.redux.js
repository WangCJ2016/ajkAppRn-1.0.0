import axios from 'axios'
import { config} from '../config'
import RefreshListView, {RefreshState} from 'react-native-refresh-list-view'
import { Toast } from 'antd-mobile'

const initialState = {
  houseStatus:0, // 房间状态 0 无状态 1 代付款
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
      payType:''
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
  houseAssorts:[],
  selectHouseAssorts: [],
  houseIntr: ''
}
const DATASUCCESS = '[longRent] DATASUCCESS'
const DELPIC = '[longRent] DELPIC'
const HOUSESUCCESS = '[longRent] HOUSESUCCESS'
const INTIALSTATE = '[longRent] INTIALSTATE'
const ADDIMG = '[longRent] ADDIMG'

export function longRent(state=initialState,action) {
  switch (action.type) {
    case DATASUCCESS: {
      return {...state,...action.payload}
    }
    case INTIALSTATE: {
      return initialState
    }
    case ADDIMG: {
      const rentHouseInfo = state.rentHouseInfo
      const pictures = rentHouseInfo.pictures!==''?(rentHouseInfo.pictures+','+action.payload):action.payload
      return {...state, rentHouseInfo: {...state.rentHouseInfo,pictures: pictures}}
    }
    case DELPIC: {
      const pictures = delPicHandle(action.payload,state)
      return {...state,rentHouseInfo:{...state.rentHouseInfo,pictures:pictures}}
    }
    case HOUSESUCCESS: {
      return housePagesHander(state, action.payload)
    }
    default:
      return state
  }
}


export function intialStateSuccess() {
  return {
    type: INTIALSTATE
  }
}
// data success
export function dataSuccess(data) {
  return {
    type: DATASUCCESS,
    payload: data
  }
}

export function delPic(pic) {
  return {
    type: DELPIC,
    payload: pic
  }
}

// housepages
export function housePageSuccess(data) {
  return {
    type: HOUSESUCCESS,
    payload: data
  }
}
export function landlordResource(info,cb) {
  return (dispatch,getState)=>{
    const user = getState().user
    axios.get(config.api.base+config.api.landlordLeaseHouses, {
      params:{token:user.token,landlordId:user.id,...info}
      })
      .then(res => {
        if (res.status === 200 && res.data.success) {
          dispatch(housePageSuccess({[info.type+'Pages']: {pageNo: res.data.pageNo,totalPages: res.data.totalPages,list: res.data.result}}))
          cb?cb(RefreshState.Idle):null
        } else {
          cb?cb(RefreshState.Failure):null
        }
      })
  }
}
// 设备选择
export function endAgreementDevices() {
  return (dispatch,getState)=>{
    const user = getState().user
    axios.get(config.api.base+config.api.endAgreementDevices)
      .then(res => {
        if(res.data.success) {
          let obj = {}
          res.data.dataObject.forEach(device => {
            obj[device.title] = device
          })
          dispatch(dataSuccess({endAgreementDevices: obj}))
        }
      })
  }
}
function imgUploadSuccess(uri) {
  return {
    type: ADDIMG,
    payload: uri
  }
}
export function imgUpload(fileUrl,fileName,parentTag) {
  return (dispatch,getState) => {
    const parentData = getState().longRent[parentTag]
    let data = new FormData()
    data.append('file', {
      uri: fileUrl,
      name: fileName,
      type: 'image/jpeg'
    })
    fetch(config.api.base+config.api.uploadImage,{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: data
    })
    .then(res=>res.json())
    .then(res=>{
     
      if(res.success) {
        if(parentTag === 'rentHouseInfo') {
          dispatch(imgUploadSuccess(res.dataObject))
        } else {
          dispatch(dataSuccess({[parentTag]:{...parentData,[fileName]: res.dataObject}}))
        }
      }
    })
  }
}

// assort
export function houseAssorts() {
  return (dispatch,getState)=>{
    const user = getState().user
    axios.get(config.api.base+config.api.houseAssorts,{
      params: {token: user.token}
    })
      .then(res => {
       
        if (res.status === 200 && res.data.success) {
          dispatch(dataSuccess({houseAssorts: res.data.dataObject}))
        } 
      })
  }
}
// becomLandlord
export function becomLandlord(info) {
  return (dispatch,getState)=>{
    const user = getState().user
    axios.get(config.api.base+config.api.becomLandlord,{
      params: {customerId: user.id,...info,token:user.token}
    })
      .then(res => {
       
        if (res.status === 200 && res.data.success) {
         
        } 
      })
  }
}
// 设备订单
function devicesOrderSubmit(info) {
  return new Promise((resolve, reject)=>{
    axios.get(config.api.base+config.api.devicesOrderSubmit,{
      params: info
    })
      .then(res => {
       
        if (res.status === 200 && res.data.success) {
          resolve(res.data.dataObject.code)
        } 
      })
  })
}
export function modifyDeviceOrder() {
  return (dispatch,getState)=>{
    const longRent = getState().longRent
    const user = getState().user
    axios.get(config.api.base+config.api.modifyDeviceOrder,{
      params: {code: longRent.deviceOrderData.code,...longRent.deviceOrderData,token:user.token}
    })
      .then(res => {
       
        if (res.status === 200 && res.data.success) {
         
        } else {
          Toast.info(res.data.msg)
        }
      })
  }
}
// 资质
function landlordHouseAptitudes(info) {
  return new Promise((resolve, reject)=>{
    axios.get(config.api.base+config.api.landlordHouseAptitudes,{
      params: info
    })
      .then(res => {
       
        if (res.status === 200 && res.data.success) {
          resolve(res.data.dataObject.id)
        } 
      })
  })
} 
export function modifyHouseAptitudes() {
  return (dispatch,getState)=>{
    const longRent = getState().longRent
    const user = getState().user
    axios.get(config.api.base+config.api.modifyHouseAptitudes,{
      params: {aptitudeId: longRent.houseCertificationInfo.id,...longRent.houseCertificationInfo,token:user.token}
    })
      .then(res => {
       
        if (res.status === 200 && res.data.success) {
         
        } 
      })
  }
}
// addLandlordHouse
export function addLandlordHouse(cb) {
  return (dispatch,getState)=>{
    const user = getState().user
    const longRent = getState().longRent
    const rentHouseInfo = longRent.rentHouseInfo
   
    Promise.all([landlordHouseAptitudes(longRent.houseCertificationInfo),devicesOrderSubmit({landlordId:user.id,...longRent.deviceOrderData})])
    .then((dataArr)=>{
      axios.get(config.api.base+config.api.addLandlordHouse,{
        params: {landlordId: user.id,code:dataArr[1],aptitudeId:dataArr[0],...rentHouseInfo}
      })
        .then(res => {
         
          if (res.status === 200 && res.data.success) {
            cb?cb():null
            dispatch(dataSuccess({deviceOrderData: {...longRent.deviceOrderData,code: dataArr[1]}}))
          } else {
            Toast.info(res.data.msg)
          }
        })
    })
  
 }
}
export function modifyLandlordHouse(cb) {
  return (dispatch,getState)=>{
    const user = getState().user
    const longRent = getState().longRent
   
    axios.get(config.api.base+config.api.modifyLandlordHouse,{
      params: {token: user.token,houseId:longRent.rentHouseInfo.id,...longRent.rentHouseInfo}
    })
      .then(res => {
       
        if (res.status === 200 && res.data.success) {
         cb?cb():null
        } 
      })
  }
}
// detele
export function delLandlordHouse(cb) {
  return (dispatch,getState)=>{
    const user = getState().user
    const longRent = getState().longRent
    axios.get(config.api.base+config.api.modifyLandlordHouse,{
      params: {token: user.token,houseId:longRent.rentHouseInfo.id,delete:'Y'}
    })
      .then(res => {
       
        if (res.status === 200 && res.data.success) {
         cb?cb():null
        } 
      })
  }
}
// housedetail
export function landlordHouseDetail(info,cb) {
  return (dispatch,getState)=>{
    const user = getState().user
    axios.get(config.api.base+config.api.landlordHouseDetail,{
      params: {...info,token: user.token}
    })
      .then(res => {
       
        if (res.status === 200 && res.data.success) {
          if(info.type==='wait') {
            const data = res.data.dataObject
            const rentHouseInfo = {
              id: data.id,
              pictures:data.pictures,
              address:data.address,
              leaseMode:data.leaseMode,
              assorts:data.assorts,
              area:data.area,
              layout: data.layout,
              decorate:data.decorate>=0?data.decorate:'',
              orientation:data.orientation>=0?data.orientation:'',
              rent:data.rent,
              depositType:data.depositType,
              leastIn: data.leastIn,
              title:data.title,
              profile:data.profile,
              additional:data.additional,
              detailAddress:data.detailAddress
            }
            dispatch(dataSuccess({deviceOrderData:data.devices}))
            dispatch(dataSuccess({houseCertificationInfo:data.aptitude}))
            dispatch(dataSuccess({rentHouseInfo:rentHouseInfo}))
            dispatch(dataSuccess({auditFail:data.auditFail?data.auditFail:''}))
          }
          dispatch(dataSuccess({['landlordHouseDetail'+info.type]: res.data.dataObject}))
          dispatch(dataSuccess({powerId: res.data.dataObject.powerId}))
          cb?cb():null
        } 
      })
  }
}

// 已出租



// reducer handle
function delPicHandle(pic, state) {
  const newPicArr = state.rentHouseInfo.pictures.split(',').slice()
  const index = newPicArr.indexOf(pic)
  newPicArr.splice(index,1)
  return newPicArr.join(',')
}

// house handle
function housePagesHander(state, data) {
  const key = Object.keys(data)[0]
  if(!data[key]) return {...state,payOrders:null}
  if(data[key].pageNo === 1) {
    return {...state,[key]:data[key]}
  }else{
    const list = [...state[key].list,...data[key].list]
    return {...state,[key]:{...data[key],list:list}}
  }
}
