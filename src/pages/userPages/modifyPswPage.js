import React from 'react'
import { 
  View,
  Text
 } from 'react-native'
 import { createForm } from 'rc-form'
 import { List, InputItem, Button } from 'antd-mobile'
 import { connect } from 'react-redux'
 import { changepsw } from '../../reducers/user.redux'
 import InphoneXHoc from '../../hoc/inphoneXhoc'

 @InphoneXHoc
@connect(
  null,
 {changepsw}
)
 class ModifyPswPage extends React.Component {
   constructor() {
     super()
     this.state={
      verCodeBtnDisabled:true
     }
     this.changeHandle = this.changeHandle.bind(this)
     this.register = this.register.bind(this)
   }
   changeHandle() {
    this.props.form.validateFields((error,values) => {
      if (!error&&values.password===values.confirmpsw) {
        this.setState({
          verCodeBtnDisabled:false
        })
      }else if(!this.state.verCodeBtnDisabled){
        this.setState({
          verCodeBtnDisabled:true
        })
      }
    })
   }
   register() {
    this.props.form.validateFields((error,values) => {
      if (!error) {
        this.props.changepsw({
          oldPassword:values.oldPassword,
          password: values.password
        },this.props.navigation)
      }
    })
   }
   render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <View>
       <List 
       >
           {getFieldDecorator('oldPassword',{
             rules: [{ required: true,message: '请填写通道名称'},{pattern:/[a-zA-Z\d+]{6,36}/,message: '请填写通道名称'}],
           })(
               <InputItem
               type='password'
               placeholder="请输入旧密码"
               textAlign='right'
               onChangeText={this.changeHandle}
             >旧密码</InputItem>
            )}
            {getFieldDecorator('password',{
             rules: [{ required: true,message: '请填写通道名称'},{pattern:/[a-zA-Z\d+]{6,36}/,message: '请填写通道名称'}],
           })(<InputItem
             clear
             type='password'
             placeholder="请输入新密码"
             textAlign='right'
             onChangeText={this.changeHandle}
           >新密码</InputItem>)}
           {getFieldDecorator('confirmpsw',{
             rules: [{ required: true,message: '请填写通道名称'},{pattern:/[a-zA-Z\d+]{6,36}/,message: '请填写通道名称'}],
           })(<InputItem
             clear
             type='password'
             placeholder="请再次输入密码"
             textAlign='right'
             onChangeText={this.changeHandle}
           >确认密码</InputItem>)}
   
       </List>
       <View style={{padding:10}}>
         <Button type='primary' disabled={this.state.verCodeBtnDisabled}   onClick={this.register}>提交</Button>
       </View>
      </View>
     )
   }
 }
 
 export default createForm()(ModifyPswPage)