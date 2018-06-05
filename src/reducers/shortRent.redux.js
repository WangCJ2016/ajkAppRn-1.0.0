import axios from 'axios'
import { config} from '../config'
import { Toast } from 'antd-mobile'
import {RefreshState} from 'react-native-refresh-list-view'

const initialState = {
  dayIncome:[],
  houseCalendar:[]
}
const DATASUCCESS = '[landlord] DATASUCCESS'
const LANDLORDHOTELSUCCESS = '[landlord] LANDLORDHOTELSUCCESS'
const PAGESUCCESS = '[landlord] PAGESUCCESS'



export function landlord(state=initialState,action) {
  switch(action.type) {
    case DATASUCCESS: {
      return {...state,...action.payload}
    }
    case LANDLORDHOTELSUCCESS: {
      return pagesHander(state, action.payload)
    }
    case PAGESUCCESS: {
      return pagesListHander(state, action.payload)
    }
    default:
      return state
  }
}

// data success
function dataSuccess(data) {
  return {
    type: DATASUCCESS,
    payload: data
  }
}
// hotel detail
export function monthIncome(info) {
  return (dispatch,getState)=>{
    const user = getState().user
    axios.get(config.api.base+config.api.monthIncome, {
      params:{...info,customerId:user.id,token:user.token}
      })
      .then(res => {
        
        if (res.status === 200 && res.data.success) {
          dispatch(dataSuccess({inComeLists:res.data.dataObject}))
        } 
      })
  }
}

export function dayIncome(info) {
  return (dispatch,getState)=>{
    const user = getState().user
    axios.get(config.api.base+config.api.dayIncome, {
      params:{...info,customerId:user.id,token:user.token}
      })
      .then(res => {
        
        if (res.status === 200 && res.data.success) {
          dispatch(dataSuccess({dayIncome:res.data.dataObject}))
        } 
      })
  }
}

export function landlordHotelsSuccess(data) {
  return {
    type:  LANDLORDHOTELSUCCESS,
    payload: data
  }
}
// landlordHotels
export function landlordHotels(info,cb) {
  return (dispatch,getState)=>{
    const user = getState().user
    axios.get(config.api.base+config.api.landlordHotels, {
      params:{...info,customerId:user.id,token:user.token}
      })
      .then(res => {
        
        if (res.status === 200 && res.data.success) {
          dispatch(landlordHotelsSuccess({landlordHotels: {pageNo: res.data.pageNo,totalPages: res.data.totalPages,list: res.data.result}}))
          cb?cb(RefreshState.Idle):null
        } else{
          cb?b(RefreshState.Failure):null
        } 
      })
  }
}


export function pageSuccess(data) {
  return {
    type:  PAGESUCCESS,
    payload: data
  }
}
export function landlordHouses(info,cb) {
  return (dispatch,getState)=>{
    const user = getState().user
    axios.get(config.api.base+config.api.landlordHouses, {
      params:{...info,token:user.token,pageSize:8}
      })
      .then(res => {
        
        if (res.status === 200 && res.data.success) {
          dispatch(pageSuccess({landlordLists: {pageNo: res.data.pageNo,totalPages: res.data.totalPages,list: res.data.result}}))
          cb?cb(RefreshState.Idle):null
        } else{
          cb?b(RefreshState.Failure):null
        } 
      })
  }
}
export function landlordOrders(info,cb) {
  return (dispatch,getState)=>{
    const user = getState().user
    axios.get(config.api.base+config.api.landlordOrders, {
      params:{...info,token:user.token,customerId:user.id,pageSize:8}
      })
      .then(res => {
        
        if (res.status === 200 && res.data.success) {
          dispatch(pageSuccess({landlordLists: {pageNo: res.data.pageNo,totalPages: res.data.totalPages,list: res.data.result}}))
          cb?cb(RefreshState.Idle):null
        } else{
          cb?b(RefreshState.Failure):null
        } 
      })
  }
}

// houseCalendar
export function houseCalendar(info) {
  return (dispatch,getState)=>{
    const user = getState().user
    axios.get(config.api.base+config.api.houseCalendar, {
      params:{...info,token:user.token}
      })
      .then(res => {
        
        if (res.status === 200 && res.data.success) {
           let arr = []
           res.data.dataObject.forEach(monthArr => {
             arr = [...arr,...monthArr]
           })
          dispatch(dataSuccess({houseCalendar:arr}))
        } 
      })
  }
}

// landlordModifyHousePrice
export function landlordModifyHousePrice(info,cb) {
  return (dispatch,getState)=>{
    const user = getState().user
    axios.get(config.api.base+config.api.landlordModifyHousePrice, {
      params:{...info,token:user.token}
      })
      .then(res => {
        
        if (res.status === 200 && res.data.success) {
          cb()
        } 
      })
  }
}


// reducer handle fn

function pagesHander(state, data) {
  if(!data.landlordHotels) return {...state,landlordHotels:null}
  if(data.landlordHotels.pageNo === 1) {
    return {...state,landlordHotels:data.landlordHotels}
  }else{
    const list = [...state.landlordHotels.list,...data.landlordHotels.list]
    return {...state,landlordHotels:{...data.landlordHotels,list:list}}
  }
}

function pagesListHander(state, data) {
  if(!data.landlordLists) return {...state,landlordLists:null}
  if(data.landlordLists.pageNo === 1) {
    return {...state,landlordLists:data.landlordLists}
  }else{
    const list = [...state.landlordLists.list,...data.landlordLists.list]
    return {...state,landlordLists:{...data.landlordLists,list:list}}
  }
}