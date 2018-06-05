import axios from 'axios'
import { config} from '../config'
import { Toast } from 'antd-mobile'

 import RefreshListView, {RefreshState} from 'react-native-refresh-list-view'
 import { pySegSort } from '../utils/fnUtils'



const initialState = {
  searchInfo:{
    address:'',
    price:'',
    keyword:'',
    leaseMode:'',
    layout:'',
    addressMark:''
  },
  city: '杭州市',
  city: {
    name: ''
  }
}
const DATASUCCESS = '[map] DATASUCCESS'
const PAGEDATASUCCESS = '[map] PAGEDATASUCCESS'

export function map(state=initialState,action) {
  switch(action.type) {
    case DATASUCCESS: {
      return {...state,...action.payload}
    }
    case PAGEDATASUCCESS: {
      return pagesHander(state, action.payload)
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

// gps convert
export function gpsConvert(info) {
  return dispatch => {
    axios.get('http://restapi.amap.com/v3/assistant/coordinate/convert',{
      params:{
        coordsys:'gps',
        key:'1df596e079aa3ad5a375df0120b5540e',
        ...info
      }
      })
      .then(res => {
        getlocation({location:res.data.locations+''})(dispatch)
      })
  }
}
// getlocation
export function getlocation(info) {
  return dispatch => {
    axios.get('http://restapi.amap.com/v3/geocode/regeo',{
      params:{
        key:'1df596e079aa3ad5a375df0120b5540e',
        ...info
      }
      })
      .then(res => {
        if(res.data.status=='1'){
          
          const data = {
            province:res.data.regeocode.addressComponent.province,
            city:res.data.regeocode.addressComponent.city,
            district:res.data.regeocode.addressComponent.district
          }
         
          dispatch(dataSuccess(data)) 
        }
      })
  }
}

// typesearch
export function typeSearch(info) {
  return dispatch => {
    axios.get('http://restapi.amap.com/v3/place/text',{
      params:{
        key:'1df596e079aa3ad5a375df0120b5540e',
        ...info
      }
      })
      .then(res => {
        if(res.status === 200) {
          const data =  pySegSort(res.data.pois).map(item=>{
             return {data:item.data,key:item.letter}
           })
          dispatch(dataSuccess({typeData: data}))
        }
      })
  }
}
// searchhotelpages
function pageDataSuccess(data){
  return {
    type: PAGEDATASUCCESS,
    payload: data
  }
}
// 酒店搜索
export function searchHotelPages(info,cb) {
 
 return dispatch=>{
   return axios.get(config.api.base+config.api.searchHotels, {
      params:{address: info.address,addressMark: info.addressMark? info.addressMark:'',price: info.price?info.price:'',keyword: info.keyword?info.keyword:''}
      })
      .then(res => {
       
        if (res.status === 200 && res.data.success) {
          dispatch(pageDataSuccess({hotelSearchList:{pageNo: res.data.pageNo,totalPages: res.data.totalPages,list: res.data.result}}))
          cb?cb(RefreshState.Idle):null
        } else {
          cb?b(RefreshState.Failure):null
        }
      })
  }
}
// 长租搜索
export function longRentSearchPage(info,cb) {
  return dispatch=>{
    
    return axios.get(config.api.base+config.api.longRentSearchList, {
       params:{address: encodeURI('杭州'),...info}
       })
       .then(res => {
        
         if (res.status === 200 && res.data.success) {
           dispatch(pageDataSuccess({longRentSearchList:{pageNo: res.data.pageNo,totalPages: res.data.totalPages,list: res.data.result}}))
           cb?cb(RefreshState.Idle):null
         } else {
           cb?b(RefreshState.Failure):null
         }
       })
   }
}
export function queryNearbySearch(info,cb) {
  return dispatch=>{
    return axios.get(config.api.base+config.api.queryNearbySearch, {
       params:info
       })
       .then(res => {
        
         if (res.status === 200 && res.data.success) {
           dispatch(pageDataSuccess({searchHotels:{pageNo: res.data.pageNo,totalPages: res.data.totalPages,list: res.data.result}}))
           cb?cb(RefreshState.Idle):null
         } else {
           cb?b(RefreshState.Failure):null
         }
       })
   }
}

export function getAllCities() {
  return dispatch=>{
    return fetch('../assets/json/cities.json')
       .then(res => {
        
         if (res.status === 200 && res.data.success) {
          
         } else {
          
         }
       })
   }
}

// reduce handle fn

function pagesHander(state, data) {
  const key = Object.keys(data)[0]
  if(!data[key]) return {...state,payOrders:null}
  if(data[key].pageNo === 1) {
    return {...state,[key]:data[key]}
  }else{
    const list = [...state[key].list,...data[key].list]
    return {...state,[key]:{...data[key],list:list}}
  }
}
