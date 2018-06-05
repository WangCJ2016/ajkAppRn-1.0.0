import axios from 'axios'
import { config} from '../config'
import { Toast } from 'antd-mobile'
import { encode64 } from '../utils/fnUtils'

const initialState = {
  scenes:[],
  tvInfo:[],
  tvStatus:'OFF',
  tvboxStatus:'OFF',
  airInfo:[],
  deviceWays:[],
  curtainData:[]
}
const DATASUCCESS = '[map] DATASUCCESS'

export function ctrl(state=initialState,action) {
  switch (action.type) {
    case DATASUCCESS: {
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

export function houseHostInfo(info) {
  return (dispatch,getState) => {
    const user = getState().user
    axios.get(config.api.base+config.api.houseHostInfo, {
        params:{...info,token:user.token}
      })
      .then(res => {
        
        if(res.status === 200) {
          dispatch(dataSuccess({houseHostInfo:{...res.data.dataObject,houseId:encode64(info.houseId)}}))
        }
      })
    }
}

export function getDeviceWays(info) {
  return (dispatch,getState) => {
    const user = getState().user
    axios.get(config.api.base+config.api.getDeviceWays, {
        params:{...info,token:user.token}
      })
      .then(res => {
        if(res.status === 200) {
           dispatch(dataSuccess({deviceWays:res.data.dataObject.ways}))
        }
      })
  }
}

// ctrl
export function smartHostCtrl(info,cb) {
  return (dispatch,getState) => {
    const token = getState().user.token
    const serverId = getState().ctrl.houseHostInfo.serverId
    axios.get(config.api.base+config.api.smartHostCtrl, {
        params:{...info,serverId: serverId,token:token}
      })
      .then(res => {
        if(res.data.success) {
          cb?cb():null
        }
      })
  }
}
// scenes
export function hostScenes(info) {
  return (dispatch,getState) => {
    const token = getState().user.token
    axios.get(config.api.base+config.api.hostScenes, {
        params:{...info,token:token}
      })
      .then(res => {
        if(res.status === 200) {
          dispatch(dataSuccess({scenes:res.data.dataObject.filter(model=>model.name.indexOf('情景')>-1)}))
       }
      })
  }
}
// tv
export function tvDevicesInfo(info) {
  return (dispatch,getState) => {
    const token = getState().user.token
    axios.get(config.api.base+config.api.tvDevicesInfo, {
        params:{...info,token:token}
      })
      .then(res => {
        if(res.status === 200) {
          const tvInfo = []
          for (const i in res.data.dataObject) {
            tvInfo.push(res.data.dataObject[i])
          }
          dispatch(dataSuccess({tvInfo:tvInfo}))
       }
      })
  }
}
// air
export function queryDeviceType(info) {
  return (dispatch,getState) => {
    const houseHostInfo = getState().ctrl.houseHostInfo
    const token = getState().user.token
    axios.get(config.api.base+config.api.queryDeviceType, {
        params:{...info,token:token}
      })
      .then(res => {
        
        if(res.status === 200) {
          dispatch(dataSuccess({airDeivceType: res.data.dataObject}))
          ctrlHostDeviceByType({
            deviceType:res.data.dataObject,
            ip:houseHostInfo.ip,
            houseId:houseHostInfo.houseId
          })(dispatch,getState)
       }
      })
  }
}
//light
export function ctrlHostDeviceByType(info) {

  return (dispatch,getState) => {
    const token = getState().user.token
    axios.get(config.api.base+config.api.ctrlHostDeviceByType, {
        params:{...info,token:token}
      })
      .then(res => {
        
        let airs = []
        if(res.status === 200) {
          if(info.deviceType === 'VIRTUAL_AIR_REMOTE') {
            res.data.dataObject.devices.forEach((air) => {
              let airInfo = {},
                  coolWays, warmWays
              if (air.ways) {
                  coolWays = air.ways.filter(way => {
                      if (way.remoteKey.indexOf('COOL') > -1) {
                          return way;
                      }else{
                          return null
                      }
                  }).map(way => {
                      return way.remoteKey;
                  })
                  warmWays = air.ways.filter(way => {
                      if (way.remoteKey.indexOf('WARM') > -1) {
                          return way;
                      }else{
                          return null
                      }
                  }).map(way => {
                      return way.remoteKey;
                  });
              }
              airInfo.deviceId = air.deviceId
              airInfo.coolWays = coolWays
              airInfo.warmWays = warmWays
              airInfo.name = air.name
              airInfo.module = '制冷'
              airInfo.tempNowIndex = Math.floor(coolWays.length/2)
              airInfo.tempNow = coolWays[airInfo.tempNowIndex]
              airInfo.speed = 1
              airInfo.status = 'ON'
              airs.push(airInfo)
           })
          }else {
             res.data.dataObject.devices.forEach((air) => {
                 let airInfo = {},
                     coolWays, warmWays
                 coolWays = [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 28, 29, 30]
                 warmWays = [20, 21, 22, 23, 24, 25, 26, 28, 29, 30]
                 airInfo.deviceId = air.deviceId
                 airInfo.coolWays = coolWays
                 airInfo.warmWays = warmWays
                 airInfo.name = air.name
                 airInfo.module = '制冷'
                 airInfo.tempNowIndex = Math.floor(coolWays.length/2)
                 airInfo.tempNow = coolWays[airInfo.tempNowIndex]
                 airInfo.speed = 1
                 airInfo.status = 'ON'
                 airs.push(airInfo)
             })
         }
          dispatch(dataSuccess({airInfo:airs}))
       }
      })
  }
}
// lock
export function lockData(info) {
  return (dispatch,getState) => {
    const token = getState().user.token
    axios.get(config.api.base+config.api.ctrlHostDeviceByType, {
        params:{...info,token:token}
      })
      .then(res => {
        
        if(res.data.success) {
         dispatch(dataSuccess({lockDeviceId: res.data.dataObject.devices[0].deviceId}))
         
       }
      })
  }
}
// elevatorHost
export function elevatorHost(info) {
  return (dispatch,getState) => {
    const token = getState().user.token
    axios.get(config.api.base+config.api.elevatorHost, {
        params:{...info,token:token}
      })
      .then(res => {
        if(res.status === 200) {
          if (res.success) {
            const data = {
              deviceType: 'ELEVATOR',
              floor: info.floor,
              serverId: res.data.dataObject[0].serverId
            }
            
            smartHostCtrl(data,()=>{
              Toast.info('梯控成功')
            })
          }
         
       }
      })
  }
}

// curatain
export function curtainData(info) {
  return (dispatch,getState) => {
    const token = getState().user.token
    axios.get(config.api.base+config.api.curtainData, {
        params:{...info,token:token}
      })
      .then(res => {
        if(res.status === 200) {
          let curtainsArray = []
          for(let i in res.data.dataObject.curtains) {
            curtainsArray.push(res.data.dataObject.curtains[i])
          }
          dispatch(dataSuccess({curtainData: curtainsArray}))
       }
      })
  }
}