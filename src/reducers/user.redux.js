import axios from 'axios'
import { config} from '../config'
import { Toast } from 'antd-mobile'
import { 
  AsyncStorage
 } from 'react-native'

const AUTH_SUCCESS = '[user] AUTH_SUCCESS'
const HEADIMAGE = '[user] HEADIMAGE'
const INITIALSTATE = '[user] INITIALSTATE'

let customerId 
AsyncStorage.getItem('id',(err,res)=>{
  if(!err) {
    customerId = res
  }
})
let token 
AsyncStorage.getItem('token',(err,res)=>{
  if(!err) {
    token = res
  }
})

const initialState = {
  token:''
}

export function user(state=initialState,action) {
  switch (action.type) {
    case AUTH_SUCCESS:
    case HEADIMAGE:
      return { ...state,
        ...action.payload
      }
    case INITIALSTATE: {
      return initialState
    }
    default:
      return state
  }
}

export function initialStateSuccess() {
  return {
    type: INITIALSTATE
  }
}
// 获取用户信息
export function getInfo(cb) {
  return (dispatch)=> {     
    AsyncStorage.multiGet(['id','token'],(err,res)=>{
      if(!err) {
        axios.get(config.api.base+config.api.getInfo, {
          params:{customerId:res[0][1],token:res[1][1]}
          })
          .then(res => {
           
            if (res.status === 200 && res.data.success) {
              dispatch(authSuccess(res.data.dataObject))
            } 
            if(res.data.msg === '非法请求') {
              cb?cb():null
            }
          })
      }
    })
  }
}
// 登录
function authSuccess(obj) {
  const {pwd, ...data} = obj
  return {
    type: AUTH_SUCCESS,
    payload: data,
  }
}

export function login({
  account,
  psw
  },cb) {
  return dispatch => {
    axios.get(config.api.base+config.api.login, {
      params:{
        account:account,
        password:psw
      }
      })
      .then(res => {
       
        if (res.status === 200 && res.data.success) {
          AsyncStorage.setItem('id',res.data.dataObject.id)
          AsyncStorage.setItem('token',res.data.dataObject.token)
          axios.get(config.api.base+config.api.getInfo, {
            params:{customerId:res.data.dataObject.id,token:res.data.dataObject.token}
            })
            .then(res => {
             
              if (res.status === 200 && res.data.success) {
                dispatch(authSuccess(res.data.dataObject))
                cb?cb():null
              } 
            })
        } else {
          setTimeout(()=>{
            Toast.fail(res.data.msg, 1);
          })
        }
      })
  }
}

// register
export function getRegisterVerCode(info) {
  return dispatch => {
    axios.get(config.api.base+config.api.getRegisterVerCode, {
      params:info
      })
      .then(res => {
       
        if (res.status === 200 && res.data.success) {
          setTimeout(()=>{
            Toast.info('已获取', 1);
          })
        } else{
          setTimeout(()=>{
            Toast.info(res.data.msg, 1);
          })
        }
      })
  }
}

export function register(info,navigation) {
  return dispatch => {
    axios.get(config.api.base+config.api.register, {
      params:info
      })
      .then(res => {
       
        if (res.status === 200 && res.data.success) {
          navigation?navigation.goBack():null
        } else{
          setTimeout(()=>{
            Toast.info(res.data.msg, 1);
          })
        }
      })
  }
}
// 找回密码
export function forgetPsw(info,navigation) {
  return dispatch => {
    axios.get(config.api.base+config.api.forgetPws, {
      params:info
      })
      .then(res => {
       
        if (res.status === 200 && res.data.success) {
          navigation?navigation.goBack():null
        } else{
          setTimeout(()=>{
            Toast.info(res.data.msg, 1);
          })
        }
      })
  }
}
// 身份证绑定
export function idCard(info,navigation) {
  return (dispatch,getState) => {
    const token = getState().user.token
    const customerId = getState().user.id
    axios.get(config.api.base+config.api.idCard, {
      params:{...info,token: token,customerId: customerId}
      })
      .then(res => {
       
        if (res.status === 200 && res.data.success) {
          setTimeout(()=>{
            Toast.info('绑定成功', 1);
          })
          navigation?navigation.goBack():null
        } else{
          setTimeout(()=>{
            Toast.info(res.data.msg, 1);
          })
        }
      })
  }
}
// 手机绑定验证码
export function bingPhoneCode(info) {
  return (dispatch,getState) => {
    const token = getState().user.token
    const customerId = getState().user.id
    axios.get(config.api.base+config.api.bindPhoneCode, {
      params:{...info,customerId:customerId,token:token}
      })
      .then(res => {
       
        if (res.status === 200 && res.data.success) {
          setTimeout(()=>{
            Toast.info('已获取', 1);
          })
        } else{
          setTimeout(()=>{
            Toast.info(res.data.msg, 1);
          })
        }
      })
  }
}

export function bingPhone(info,navigation) {
  return (dispatch,getState) => {
    const token = getState().user.token
    const customerId = getState().user.id
    axios.get(config.api.base+config.api.bindPhone, {
      params:{...info,customerId:customerId,token:token}
      })
      .then(res => {
       
        if (res.status === 200 && res.data.success) {
          setTimeout(()=>{
            Toast.info('绑定成功', 1);
          })
          navigation?navigation.goBack():null
        } else{
          setTimeout(()=>{
            Toast.info(res.data.msg, 1);
          })
        }
      })
  }
}

// 上传头像
function headImage(url) {
  return {
    type: HEADIMAGE,
    payload: url
  }
}
export function modifyHeadPicture(info) {
  return (dispatch,getState) => {
    const token = getState().user.token
    const customerId = getState().user.id
    axios.get(config.api.base+config.api.modifyHeadPicture, {
      params:{pciture:info,customerId:customerId,token:token}
      })
      .then(res => {
       
        if (res.status === 200 && res.data.success) {
          setTimeout(()=>{
            Toast.info('头像修改成功', 1);
          })
          dispatch(headImage({headPicture:info}))
        } else{
          setTimeout(()=>{
            Toast.info(res.data.msg, 1);
          })
        }
      })
  }
}

export function uploadImage(source,name,cb) {
  return (dispatch,getState) => {
      const token = getState().user.token
      const customerId = getState().user.id
      let formData = new FormData();
      let file = name?{uri: source, type: 'application/octet-stream', name: name}:{uri: source, type: 'application/octet-stream', name: 'image.jeg'}
      formData.append("file", file)
      fetch(config.api.base+config.api.uploadImage, {
          method: 'POST',
          headers: {
              'Content-Type': 'multipart/form-data;charset=utf-8',
          },
          body: formData,
      }).then((response) => response.json())
          .then((responseData)=> {
              
              if(responseData.success) {
                cb?cb(responseData.dataObject):null
              }
          })
          .catch((err)=> {
           
          });

  }
}

// 修改密码
export function changepsw(info,navigation) {
  return (dispatch,getState) => {
    const token = getState().user.token
    const customerId = getState().user.id
    axios.get(config.api.base+config.api.changepsw, {
      params:{...info,customerId:customerId,token:token}
      })
      .then(res => {
       
        if (res.status === 200 && res.data.success) {
          setTimeout(()=>{
            Toast.info('修改成功', 1);
          })
          AsyncStorage.removeItem('id')
          AsyncStorage.removeItem('token')
          dispatch(initialStateSuccess(initialState))
          navigation?navigation.navigate('Login',{shouldNotBack:true}):null
        } else{
          setTimeout(()=>{
            Toast.info(res.data.msg, 1);
          })
        }
      })
  }
}


// selectors

export const getId = (state) => {
  return state.user.id
}