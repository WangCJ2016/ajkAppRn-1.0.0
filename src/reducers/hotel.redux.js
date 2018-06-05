import axios from 'axios'
import { config} from '../config'
import { Toast } from 'antd-mobile'
import { getLabelOfRooms } from '../utils/fnUtils'

const DATASUCCESS = '[hotel] DATASUCCESS'
const HOTELROOMLOST = '[hotel] HOTELROOMLOST'
const REFRESHLOAD = '[hotel] REFRESHLOAD'
const LOADMORE = '[hotel] LOADMORE'
const SCROLLHEIGHT = '[hotel] SCROLLHEIGHT'
const CANCELCOLLECTION = '[hotel] CANCELCOLLECTION'
const SELECTDAYS = '[hotel] SELECTDAYS'

const initialState = {
  hotelDetail: null,
  hotelRoomList: [],
  hotelRoomDetail:null,
  pageNo:0,
  totalPages:0,
  refreshLoad:false,
  loadmore: false,
  scrollHeight:0,
  selectDaysObj:null
}

export function hotel(state=initialState,action) {
  switch (action.type) {
    case SCROLLHEIGHT:
    case DATASUCCESS:
    case SELECTDAYS: {
      return {...state,...action.payload}
    }
    case HOTELROOMLOST: {
      return roomlistHandle(state, action.payload)
    }
    case REFRESHLOAD: {
      return {...state,refreshLoad:!state.refreshLoad}
    }
    case LOADMORE: {
      return {...state,loadmore:!state.loadmore}
    }
    case CANCELCOLLECTION: {
      return {...state,hotelDetail:{...state.hotelDetail,whetherCollect:0}}
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
export function hotelDetail(info) {
  return (dispatch,getState)=>{
    const customerId = getState().user.id
    axios.get(config.api.base+config.api.hotelDetail, {
      params:{...info,customerId:customerId?customerId:'-1'}
      })
      .then(res => {
        
        if (res.status === 200 && res.data.success) {
          dispatch(dataSuccess({hotelDetail:res.data.dataObject}))
        } 
      })
  }
}
// hotel room list
function changeRefreshLoad() {
  return {
    type: REFRESHLOAD
  }
}
function changeLoadMore() {
  return {
    type: LOADMORE
  }
}
function roomlistSuccess(data) {
  return {
    type: HOTELROOMLOST,
    payload: data
  }
}
export function hotelRoomList(info,type) {
  return (dispatch)=>{
    if(type==='load') {
      dispatch(changeLoadMore())
    }else{
      dispatch(changeRefreshLoad())
    }
    axios.get(config.api.base+config.api.hotelRoomList, {
      params:info
      })
      .then(res => {
        
        if (res.status === 200 && res.data.success) {
          dispatch(roomlistSuccess({hotelRoomList: res.data.result,pageNo:res.data.pageNo,totalPages:res.data.totalPages}))
          if(type==='load') {
            dispatch(changeLoadMore())
          }else{
            dispatch(changeRefreshLoad())
          }
        } 
      })
  }
}
// page scroll height
export function scrollHeight(e){
  return {
    type: SCROLLHEIGHT,
    payload: e
  }
}
// 收藏
export function collection(info) {
  return (dispatch,getState)=>{
    const customerId = getState().user.id
    const token = getState().user.token
    axios.get(config.api.base+config.api.addCollection, {
      params:{...info,customerId:customerId,token:token}
      })
      .then(res => {
        
        if (res.status === 200 && res.data.success) {
          Toast.info('已收藏')
          hotelDetail(info)(dispatch)
        } 
      })
  }
}
function cancelCollectionSuccess() {
  return {
    type: CANCELCOLLECTION
  }
}
export function cancelCollection(info) {
  return (dispatch,getState)=>{
    const customerId = getState().user.id
    const token = getState().user.token
    axios.get(config.api.base+config.api.cancelCollection, {
      params:{...info,customerId:customerId,token:token}
      })
      .then(res => {
        
        if (res.status === 200 && res.data.success) {
          Toast.info('已取消收藏')
          dispatch(cancelCollectionSuccess()) 
        } 
      })
  }
}
// hotel room detail

export function hotelRoomDetail(info) {
  return (dispatch,getState)=>{
    const token = getState().user.token
    axios.get(config.api.base+config.api.hotelRoomDetail, {
      params:{...info,token:token}
      })
      .then(res => {
        
        if (res.status === 200 && res.data.success) {
          dispatch(dataSuccess({hotelRoomDetail: res.data.dataObject}))
        } 
      })
  }
}

// hotel room calendar
export function roomCalendar(info) {
  return (dispatch,getState)=>{
    const token = getState().user.token
    axios.get(config.api.base+config.api.roomCalendar, {
      params:{...info,token:token}
      })
      .then(res => {
        
        if (res.status === 200 && res.data.success) {
          let arr = []
          res.data.dataObject.forEach(month => {
            arr= [...arr,...month]
          })
          dispatch(dataSuccess({roomCalendar: arr}))
        } 
      })
  }
}
 export function selectDays(data) {
   return {
     type: SELECTDAYS,
     payload: data
   }
 }


// reducer handle
function roomlistHandle(state, data) {
  if(data.pageNo===1) {
    const roomLabelTypeArr = getLabelOfRooms(data.hotelRoomList)
    const hotelRoomList =  roomLabelTypeArr.map(type=>{
      return {data:data.hotelRoomList.filter(room => room.houseTypex===type),key:type}
    })
    return {...state,...data,hotelRoomList:hotelRoomList}
  }else{
    const listArr = []
    state.hotelRoomList.forEach(arr=>{
      listArr = [...listArr,...arr.data]
    })
    const list = [...listArr,...data.hotelRoomList]
    const roomLabelTypeArr = getLabelOfRooms(list)
    const hotelRoomList =  roomLabelTypeArr.map(type=>{
      return {data:list.filter(room => room.houseTypex===type),key:type}
    })
    return {...state,...data,hotelRoomList:hotelRoomList}
  }
}

