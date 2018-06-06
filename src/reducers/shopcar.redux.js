import axios from 'axios'
import { config} from '../config'
import { Toast } from 'antd-mobile'
import Alipay from 'react-native-yunpeng-alipay'

import { getLabelOfRooms } from '../utils/fnUtils'
import RefreshListView, {RefreshState} from 'react-native-refresh-list-view'

const initialState = {
  shopCarList:[],
  allChecked: false
}
const DATASUCCESS = '[shopcar] DATASUCCESS'
const DELSUCCESS = '[shopcar] DELSUCCESS'
const CHECKBOX = '[shopcar] CHECKBOX'
const ORDERSUCCESS = '[shopcar] ORDERSUCCESS'

export function order(state=initialState,action) {
  switch(action.type) {
    case DATASUCCESS: {
      return {...state,...action.payload}
    }
    case DELSUCCESS: {
      return {...state,shopCarList:del(state,action.payload)}
    }
    case CHECKBOX: {
      return {...state,...checkbox(state,action.payload)}
    }
    case ORDERSUCCESS: {
      return orderPagesHander(state, action.payload)
    }

    default: 
      return state
  }
}

export function DataSuccess(data) {
  return {
    type: DATASUCCESS,
    payload: data
  }
}

export function addshopCar(info,navigation) {
  return (dispatch,getState) => {
    const token = getState().user.token
    const customerId = getState().user.id
    axios.get(config.api.base+config.api.addshopCar, {
      params:{...info,customerId:customerId,token:token}
      })
      .then(res => {
        if (res.status === 200 && res.data.success) {
          navigation?navigation.navigate('ShopCarPage'):null
          } else{
            Toast.info(res.data.msg)
          } 
      })
  }
}

export function shopCarList() {
  return (dispatch,getState) => {
    const token = getState().user.token
    const customerId = getState().user.id
    axios.get(config.api.base+config.api.shopCarList, {
      params:{customerId:customerId,token:token}
      })
      .then(res => {
        if (res.status === 200 && res.data.success) {
          const list = res.data.dataObject.map(hotel => ({
            [hotel.hotelName]: hotel.carts
          }))
          dispatch(DataSuccess({shopCarList:list}))
          } else{
            
          } 
      })
  }
}
// del
export function shopCardelSuccess(id) {
  return {
    type: DELSUCCESS,
    payload: id
  }
}
export function shopCardel(info) {
  return (dispatch,getState) => {
    const token = getState().user.token
    axios.get(config.api.base+config.api.shopCardel, {
      params:{...info,token:token}
      })
      .then(res => {
       
        if (res.status === 200 && res.data.success) {
           dispatch(shopCardelSuccess(info.cartIds))
          } else{
            
          } 
      })
  }
}

// checkbox
export function houseCheckBox(id) {
  return {
    type: CHECKBOX,
    payload: id
  }
}

// checkHouseWhetherReserve
export function checkHouseWhetherReserve(info,data) {
  return (dispatch,getState) => {
    const user = getState().user
    const token = getState().user.token
    axios.get(config.api.base+config.api.checkHouseWhetherReserve, {
      params:{...info,token:user.token}
      })
      .then(res => {
       
        if (res.status === 200 && res.data.success) {
          submitOrder(data)(dispatch,getState)
          } else{
            Toast.info(res.data.msg)
          } 
      })
  }
}
//submitOrder 
export function submitOrder(info) {
 return (dispatch,getState) => {
    const token = getState().user.token
    const customerId = getState().user.id
    axios.get(config.api.base+config.api.submitOrder, {
      params:{...info,token:token,customerId:customerId}
      })
      .then(res => {
       
        if (res.status === 200 && res.data.success) {
          dispatch(DataSuccess({shopCarList:[]}))
          getAlipayParams(res.data.dataObject)(dispatch)
          } else{
            Toast.info(res.data.msg)
          } 
      })
    }
}

// alipay
export function getAlipayParams(info,cb) {
  return dispatch => {
    
    axios.get(config.api.base+config.api.getAlipayParams, {
      params:{orderCode:info.orderCode,fee:info.totalFee}
      })
      .then(res => {
        Alipay.pay(res.data.dataObject).then(function(data){      
          cb?cb():null
        }, function (err) {
    
        });
      })
    }
}
// cancelOrder
export function cancelOrder(info) {
  return (dispatch,getState) => {
    const user = getState().user
    const token = getState().user.token
    axios.get(config.api.base+config.api.cancelOrder, {
      params:{...info,token:user.token}
      })
      .then(res => {
        
      })
    }
}
// PayOrders
export function payOrdersSuccess(data) {
  return {
    type: ORDERSUCCESS,
    payload: data
  }
}
export function payOrders(info,cb) {
  return (dispatch,getState) => {
    const token = getState().user.token
    const customerId = getState().user.id
    axios.get(config.api.base+config.api.payOrders, {
      params:{...info,token:token,customerId:customerId,pageSize:6}
      })
      .then(res => {
       
        if (res.status === 200 && res.data.success) {
            dispatch(payOrdersSuccess({payOrders: {pageNo: res.data.pageNo,totalPages: res.data.totalPages,list: res.data.result}}))
            cb?cb(RefreshState.Idle):null
          } else{
            cb?cb(RefreshState.Failure):null
          } 
      })
  }
}
export function orderDetail(info) {
  return (dispatch,getState) => {
    const token = getState().user.token
    axios.get(config.api.base+config.api.orderDetail, {
      params:{...info,token:token}
      })
      .then(res => {
       
        if (res.status === 200 && res.data.success) {
            dispatch(DataSuccess({orderDetail:res.data.dataObject}))
          } else{
           
          } 
      })
  }
}

export function orderBeComment(info,cb) {
  return (dispatch,getState) => {
    const token = getState().user.token
    const customerId = getState().user.id
    axios.get(config.api.base+config.api.orderBeComment, {
      params:{...info,token:token,pageSize:6,customerId:customerId}
      })
      .then(res => {
       
        if (res.status === 200 && res.data.success) {
          cb?cb(RefreshState.Idle):null
          dispatch(payOrdersSuccess({commentHotels: {pageNo: res.data.pageNo,totalPages: res.data.totalPages,list: res.data.result}}))
          } else{
            cb?cb(RefreshState.Failure):null
          } 
      })
  }
}
// 评价
export function customerFeedBack(info,cb) {
  return (dispatch,getState) => {
    const token = getState().user.token
    const customerId = getState().user.id
    axios.get(config.api.base+config.api.orderBeComment, {
      params:{...info,token:token,customerId:customerId}
      })
      .then(res => {
       
        if (res.status === 200 && res.data.success) {
           Toast.info('已评价')
           cb?cb():null
          } else{
            Toast.info('评价失败')
          } 
      })
  }
}


// endOrders
export function endOrders(info,cb) {
  return (dispatch,getState) => {
    const token = getState().user.token
    const customerId = getState().user.id
    axios.get(config.api.base+config.api.endOrders, {
      params:{...info,token:token,customerId:customerId,pageSize:6}
      })
      .then(res => {
       
        if (res.status === 200 && res.data.success) {
            if(info.type === 'already') {
              dispatch(payOrdersSuccess({alreadyOrders: {pageNo: res.data.pageNo,totalPages: res.data.totalPages,list: res.data.result}}))
            }else{
              dispatch(payOrdersSuccess({payOrders: {pageNo: res.data.pageNo,totalPages: res.data.totalPages,list: res.data.result}}))
            }
            cb?cb(RefreshState.Idle):null
          } else{
            cb?cb(RefreshState.Failure):null
          } 
      })
  }
}

// consumeRecords
export function consumeRecords(info,cb) {
  return (dispatch,getState) => {
    const token = getState().user.token
    const customerId = getState().user.id
    axios.get(config.api.base+config.api.consumeRecords, {
      params:{...info,token:token,customerId:customerId,pageSize:10}
      })
      .then(res => {
       
        if (res.status === 200 && res.data.success) {
            dispatch(payOrdersSuccess({consumeHotels: {pageNo: res.data.pageNo,totalPages: res.data.totalPages,list: res.data.result}}))
            cb?cb(RefreshState.Idle):null
          } else{
            cb?cb(RefreshState.Failure):null
          } 
      })
  }
}



// reduce handle fn
function del(state,id) {
 return state.shopCarList.map(hotel=>{
    return {[Object.keys(hotel)[0]]:Object.values(hotel)[0].filter(room => room.id!==id)}
  })
 .filter(hotel => Object.values(hotel)[0].length>0)
}

function checkbox(state,id) {
   const lists =  state.shopCarList.map(hotel => {
    return {
      [Object.keys(hotel)[0]]: Object.values(hotel)[0].map(house => {
      if(house.houseId === id) {
        const checked = house.checked?false:true
        return {...house,checked:checked}
      }else{
        return house
      }
    })}
  })
  
  return checkboxlasthandel(lists)
}


function checkboxlasthandel(list) {
  let allcheck = true
  const shopCarList =  list.map(hotel => {
    let hotelCheck = true
    Object.values(hotel)[0].forEach(house => {
       if(!house.checked) {
        hotelCheck = false
        allcheck = false
       }
    })
    Object.values(hotel)[0][0].hotelCheck = hotelCheck
    return {...hotel}
  })
  shopCarList.forEach(hotel => {
    if(!Object.values(hotel)[0][0].hotelCheck) {
      allcheck = false
    }
  })

  return {shopCarList:shopCarList,allChecked:allcheck}
}
// order handle
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



