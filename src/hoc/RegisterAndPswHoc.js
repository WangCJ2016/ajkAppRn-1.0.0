import React from 'react'
import { 
  View,
  Text
 } from 'react-native'
 import { createForm } from 'rc-form'
 import { connect } from 'react-redux'
import {getRegisterVerCode,register,forgetPsw,getInfo,bingPhoneCode,bingPhone} from '../reducers/user.redux'


 const RegisterAndPswHoc = (WrappedCom) => {
  
   class newCom extends React.Component {
     constructor() {
       super()
       this.state={
          verCodeBtnDisabled: true,
          registerBtnDisabled: true,
          checkBox: true,
          count:60
        }
       this.getVerCode = this.getVerCode.bind(this)
       this.onChange = this.onChange.bind(this)
     }
      getVerCode(type) {
        if(type==='BingPhone') {
          this.props.form.validateFields(['account'],(error,values) => {
            if(!error) {
              this.props.bingPhoneCode({telephone: values.account})
            }
          })
        }
        if(!this.state.verCodeBtnDisabled) {
            this.props.form.validateFields(['account'],(error,values) => {
            if (!error) {
              this.props.getRegisterVerCode({telephone:values.account,type:type})
              this.setState({
                verCodeBtnDisabled:true,
              })
              const timer = setInterval(()=>{
                if(this.state.count>0){
                  this.setState({
                    count:this.state.count-1
                  })
                } else {
                  clearInterval(timer)
                  this.setState({
                    verCodeBtnDisabled:false
                  })
                  this.setState({
                    count:60
                  })
                }
              },1000)
            }
          })
        }
      }
      onChange() {
        this.props.form.validateFields(['account'],(error,values) => {
          if (!error) {
            this.setState({
              verCodeBtnDisabled:false
            })
          }else if(!this.state.verCodeBtnDisabled){
            this.setState({
              verCodeBtnDisabled:true
            })
          }
        })
        this.props.form.validateFields((error,values) => {
          if (!error) {
            this.setState({
              registerBtnDisabled:false
            })
          }else if(!this.state.registerBtnDisabled){
            this.setState({
              registerBtnDisabled:true
            })
          }
        })
       }
      render() {
        const newProps = {
          getVerCode:this.getVerCode,
          state:{...this.state},
          onChange: this.onChange
        }
        return <WrappedCom  newProps={newProps} {...this.props}></WrappedCom>
      }
   }
   return createForm()(
     connect(
      state=>state.user,
      {
        getRegisterVerCode,register,forgetPsw,getInfo,bingPhoneCode,bingPhone
      }
    )(newCom))
  }

 
 export default RegisterAndPswHoc