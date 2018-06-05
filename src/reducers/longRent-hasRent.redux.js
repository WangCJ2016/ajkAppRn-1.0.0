import axios from 'axios'
import { config} from '../config'
import { Toast } from 'antd-mobile'

const initialState = {
  powerRelayList:[],
  currentPowerList:[],
  warmPowerList:[],
  powerRecordList:[]
}

const DATASUCCESS = '[longRentHasRent] DATASUCCESS'

export function longRentHasRent(state=initialState,action) {
  switch (action.type) {
    case DATASUCCESS:{
      return {...state,...action.payload}
    }
    default:
      return state
  }
}

// data success
export function dataSuccess(data) {
  return {
    type: DATASUCCESS,
    payload: data
  }
}

export function renewProtocol(info,cb) {
  return (dispatch,getState)=>{
    const user = getState().user
    axios.get(config.api.base+config.api.renewProtocol,{
      params: {landlordId:user.id,token: user.token,...info}
    })
      .then(res => {
       
        if (res.status === 200 && res.data.success) {
          Toast.info('已续签')
          cb()
        } 
      })
  }
}
export function modifyLandlordHouseStatus(info,cb) {
  return (dispatch,getState)=>{
   
    const user = getState().user
    axios.get(config.api.base+config.api.modifyLandlordHouseStatus,{
      params: {token: user.token,...info}
    })
      .then(res => {
       
        if (res.status === 200 && res.data.success) {
          cb()
        } 
      })
  }
}

export function renewContract(info,cb) {
  return (dispatch,getState)=>{
    const user = getState().user
    axios.get(config.api.base+config.api.renewContract,{
      params: {landlordId:user.id,token: user.token,...info}
    })
      .then(res => {
       
        if (res.status === 200 && res.data.success) {
          Toast.info('已续签')
          cb()
        } 
      })
  }
}

export function stopContract(info,cb) {
  return (dispatch,getState)=>{
    const user = getState().user
    axios.get(config.api.base+config.api.stopContract,{
      params: {landlordId:user.id,token: user.token,...info}
    })
      .then(res => {
       
        if (res.status === 200 && res.data.success) {
          cb()
        } 
      })
  }
}
// 线下出租
export function offlineLease(info,cb) {
  return (dispatch,getState)=>{
    const user = getState().user
    axios.get(config.api.base+config.api.offlineLease,{
      params: {landlordId:user.id,token: user.token,...info}
    })
      .then(res => {
       
        if (res.status === 200 && res.data.success) {
          cb()
        } 
      })
  } 
}
// 开关列表
export function powerRelayList(info) {
  return (dispatch,getState)=>{
    const user = getState().user
    axios.get(config.api.base+config.api.powerRelayList,{
      params: {token: user.token,...info}
    })
      .then(res => {
       
        if (res.status === 200 && res.data.success) {
          dispatch(dataSuccess({powerRelayList:res.data.result}))
        } 
      })
  }
}
export function powerRelayControl(info) {
  return (dispatch,getState)=>{
    const user = getState().user
    const longRentHasRent = getState().longRentHasRent
    axios.get(config.api.base+config.api.powerRelayControl,{
      params: {token: user.token,...info}
    })
      .then(res => {
       
        if (res.status === 200 && res.data.success) {
         const powerRelayList = longRentHasRent.powerRelayList.map(device => {
            if(device.id === info.deviceId) {
              device.status = device.status===1?0:1
            }
            return device
          })
           dispatch(dataSuccess({powerRelayList:powerRelayList}))
        } 
      })
  }
}
export function currentPower(info) {
  return (dispatch,getState)=>{
    const user = getState().user
    axios.get(config.api.base+config.api.powerRelayList,{
      params: {token: user.token,...info}
    })
      .then(res => {
       
        if (res.status === 200 && res.data.success) {
          dispatch(dataSuccess({currentPowerList:res.data.result}))
        } 
      })
  }
}
export function historyPower(info) {
  return (dispatch,getState)=>{
    const user = getState().user
    axios.get(config.api.base+config.api.historyPower,{
      params: {token: user.token,...info}
    })
      .then(res => {
       
        if (res.status === 200 && res.data.success) {
          dispatch(dataSuccess({currentPowerList:res.data.dataObject}))
        } 
      })
  } 
}

export function warmPower(info) {
  return (dispatch,getState)=>{
    const user = getState().user
    axios.get(config.api.base+config.api.warmPowerList,{
      params: {token: user.token,...info}
    })
      .then(res => {
       
        if (res.status === 200 && res.data.success) {
          dispatch(dataSuccess({warmPowerList:res.data.result}))
        } 
      })
  } 
}

export function addPowerWarm(info,cb) {
  return (dispatch,getState)=>{
    const user = getState().user
    axios.get(config.api.base+config.api.addPowerWarm,{
      params: {token: user.token,...info}
    })
      .then(res => {
       
        if (res.status === 200 && res.data.success) {
          warmPower({powerId: info.powerId})(dispatch,getState)
          cb?cb():null
        } 
      })
  } 
}

export function modifyPowerWarm(info) {
 
  return (dispatch,getState)=>{
    const user = getState().user
    axios.get(config.api.base+config.api.modifyPowerWarm,{
      params: {token: user.token,...info}
    })
      .then(res => {
       
        if (res.status === 200 && res.data.success) {
          warmPower({powerId: info.powerId})(dispatch,getState)
        } 
      })
  } 
}

export function powerRecord(info) {
  return (dispatch,getState)=>{
    const user = getState().user
    axios.get(config.api.base+config.api.powerRecord,{
      params: {token: user.token,...info}
    })
      .then(res => {
       
        if (res.status === 200 && res.data.success) {
          dispatch(dataSuccess({powerRecordList:res.data.result}))
        } 
      })
  } 
}