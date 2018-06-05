import axios from 'axios'
import { config} from '../config'
import { Toast } from 'antd-mobile'

 import RefreshListView, {RefreshState} from 'react-native-refresh-list-view'
import { getLabelOfRooms } from '../utils/fnUtils'



const PAGEDATASUCCESS = '[customer] PAGEDATASUCCESS'
const initialState = {}

export function customer(state=initialState,action) {
  switch (action.type) {
    case PAGEDATASUCCESS: {
      return orderPagesHander(state, action.payload)
    }
    default:
      return state
  }
}

export function modifySubOrdersStatus(info) {
  return (dispatch,getState) => {
    const token = getState().user.token
    axios.get(config.api.base+config.api.modifySubOrdersStatus, {
      params:{...info,token:token}
      })
      .then(res => {
    
        if (res.status === 200 && res.data.success) {
          
        } else {
          Toast.info(res.data.msg)
        }
      })
  }
}

export function cancleSubOrder(info) {
  return (dispatch,getState) => {
    const token = getState().user.token
    axios.get(config.api.base+config.api.cancleSubOrder, {
      params:{...info,token:token}
      })
      .then(res => {
    
        if (res.status === 200 && res.data.success) {
          Toast.info('已取消')
        } 
      })
  }
}

// collection
function pageDataSuccess(data) {
  return {
    type: PAGEDATASUCCESS,
    payload: data
  }
}
export function  customerCollectPage(info,cb) {
  return (dispatch,getState) => {
    const user = getState().user
    const customerId = getState().user.id
    axios.get(config.api.base+config.api.customerCollectPage, {
      params:{...info,token:user.token,customerId:customerId}
      })
      .then(res => {
    
        if (res.status === 200 && res.data.success) {
          dispatch(pageDataSuccess({pageList: {pageNo: res.data.pageNo,totalPages: res.data.totalPages,list: res.data.result}}))
          cb?cb(RefreshState.Idle):null
        } else{
          cb?b(RefreshState.Failure):null
        } 
      })
  }
}


// reduce handle fn
function orderPagesHander(state, data) {
  if(!data.pageList) return {...state,pageList:null}
  if(data.pageList.pageNo === 1) {
    return {...state,pageList:data.pageList}
  }else{
    const list = [...state.pageList.list,...data.pageList.list]
    return {...state,pageList:{...data.pageList,list:list}}
  }
}