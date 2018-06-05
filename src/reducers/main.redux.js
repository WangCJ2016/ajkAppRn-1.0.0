import axios from 'axios'
import { config} from '../config'
import { Toast } from 'antd-mobile'
import RefreshListView, {RefreshState} from 'react-native-refresh-list-view'


const initialState = {
  level0Banners:[],
  level1Banners:[],
  homeHotels:[],
  refreshLoad:false,
  loadmore: false
}
const HOMEBANNER = '[main] HOMEBANNER'
const HOMEHOTELLIST = '[main] HOMEHOTELLIST'
const REFRESHLOAD = '[main] REFRESHLOAD'
const LOADMORE = '[main] LOADMORE'
const INTENTSUCCESS = '[main] INTENTSUCCESS'

export function main(state=initialState,action) {
  switch (action.type) {
    case HOMEBANNER:
    return { ...state,
      ...action.payload
    }
    case HOMEHOTELLIST:{
      return homeHotelListHandle(state,action)
    }
    case REFRESHLOAD: {
      return {...state,refreshLoad:!state.refreshLoad}
    }
    case LOADMORE: {
      return {...state,loadmore:!state.loadmore}
    }
    case INTENTSUCCESS: {
      return orderPagesHander(state, action.payload)
    }
    default:
      return state
  }
}

// 获取首页广告页
function homeBannerSuccess(data) {
  return {
    type: HOMEBANNER,
    payload: data
  }
}
export function homeBanner(info) {
  return dispatch => {
    axios.get(config.api.base+config.api.homeBanner, {
      params:info
      })
      .then(res => {
       
        if (res.status === 200 && res.data.success) {
          if(info.level===0){
            dispatch(homeBannerSuccess({level0Banners:res.data.result}))
          }else{
            dispatch(homeBannerSuccess({level1Banners:res.data.result}))
          }
        } 
      })
  }
}
// 首页酒店列表
function homehotelsList(data) {
  return {
    type: HOMEHOTELLIST,
    payload: data
  }
}
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
export function homeHotelPage(info,type) {
  return dispatch => {
    if(type==='load') {
      dispatch(changeLoadMore())
    }else{
      dispatch(changeRefreshLoad())
    }
    axios.get(config.api.base+config.api.homeHotelPage, {
      params:info
      })
      .then(res => {
        if (res.status === 200 && res.data.success) {
            dispatch(homehotelsList({homeHotels:res.data.result,totalPages:res.data.totalPages,pageNo:res.data.pageNo}))
            if(type==='load') {
              dispatch(changeLoadMore())
            }else{
              dispatch(changeRefreshLoad())
            }
        } 
      })
  }
}

// 意向
export function intentSuccess(data) {
  return {
    type: INTENTSUCCESS,
    payload: data
  }
}
export function intentRecord(info,cb) {
  return (dispatch,getState) => {
    const user = getState().user
    axios.get(config.api.base+config.api.intentRecord, {
      params:{...info,token:user.token,[info.type+'Id']:user.id}
      })
      .then(res => {
       
        if (res.status === 200 && res.data.success) {
          if(info.type==='landlord'){
            dispatch(intentSuccess({landlordIntentList: {pageNo: res.data.pageNo,totalPages: res.data.totalPages,list: res.data.result}}))
          }else{
            dispatch(intentSuccess({customerIntentList: {pageNo: res.data.pageNo,totalPages: res.data.totalPages,list: res.data.result}}))
          }
          cb?cb(RefreshState.Idle):null
        } else {
          cb?b(RefreshState.Failure):null
        }
      })
  }
}
export function addLintent(info,cb) {
  return (dispatch,getState) => {
    const user = getState().user
    axios.get(config.api.base+config.api.addLintent, {
      params:{...info,token:user.token,customerId:user.id}
      })
      .then(res => {
       
        if (res.status === 200 && res.data.success) {
          cb()
        } 
      })
  }
}
// 处理意向
export function modifyLeaseIntent(info,cb) {
  return (dispatch,getState) => {
    const user = getState().user
    axios.get(config.api.base+config.api.modifyLeaseIntent, {
      params:{...info,token:user.token}
      })
      .then(res => {
       
        if (res.status === 200 && res.data.success) {
          cb?cb():null
        } 
      })
  }
}
export function delLeaseIntent(info,cb) {
  return (dispatch,getState) => {
    const user = getState().user
    axios.get(config.api.base+config.api.delLeaseIntent, {
      params:{...info,token:user.token}
      })
      .then(res => {
       
        if (res.status === 200 && res.data.success) {
          cb?cb():null
        } 
      })
  }
}
// reducer 处理函数

function homeHotelListHandle(state,action) {
  if(action.payload.pageNo === 1) {
    return {...state,...action.payload}
  }else{
    const homeHotels = [...state.homeHotels,...action.payload.homeHotels]
    return {...state,...action.payload,homeHotels:homeHotels}
  }
}


function orderPagesHander(state, data) {
  const key = Object.keys(data)[0]
  if(!data[key]) return {...state,payOrders:null}
  if(data[key].pageNo === 1) {
    return {...state,[key]:data[key]}
  }else{
    const list = [...state[key].list,...data[key].list]
    return {...state,[key]:{...data[key],list:list}}
  }
}