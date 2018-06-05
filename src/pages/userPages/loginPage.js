import React from 'react'
import { 
  View,
  Text
 } from 'react-native'
 import { List, InputItem, Button } from 'antd-mobile'
 import { createForm } from 'rc-form'
 import { connect } from 'react-redux'
import {login} from '../../reducers/user.redux'
import InphoneXHoc from '../../hoc/inphoneXhoc'

 @InphoneXHoc
@connect(
  state=>state.user,
  {
    login
  }
)
 class LoginPage extends React.Component {
   constructor() {
     super()
     this.state = {
      disabled: true
     }
     this.submit = this.submit.bind(this)
     this.onChange = this.onChange.bind(this)
     this.callBack = this.callBack.bind(this)
   }
  
   submit() {
    this.props.form.validateFields((error,values) => {
      if (!error) {
        this.props.login(values,this.callBack)
      } 
    })
   }
   callBack() {
     if(this.props.navigation.state.params&&this.props.navigation.state.params.shouldNotBack) {
       this.props.navigation.navigate('Main')
     }else{
      this.props.navigation.goBack()
     }
   }
   onChange() {
    this.props.form.validateFields((error,values) => {
      if (!error) {
        this.setState({
          disabled:false
        })
      }else if(!this.state.disabled){
        this.setState({
          disabled:true
        })
      }
    })
   }
   render() {
    const { getFieldDecorator } = this.props.form;
     return (
       <View>
        <List 
        >
            {getFieldDecorator('account',{
              rules: [{ required: true,message: '请填写通道名称'},{pattern:/^1[34578]\d{9}$/,message: '请填写通道名称'}],
            })(<InputItem
              clear
              type='number'
              placeholder="请输入账号"
              textAlign='right'
              onChangeText={this.onChange}
            >帐号</InputItem>)}
         
            {getFieldDecorator('psw',{
              rules: [{ required: true,message: '请填写通道名称'},{pattern:/[a-zA-Z\d+]{6,36}/,message: '请填写通道名称'}],
            })(<InputItem
              clear
              type='number'
              placeholder="请输入密码"
              textAlign='right'
              onChangeText={this.onChange}
            >密码</InputItem>)}
    
        </List>
        <View style={{padding:10}}>
          <Button type='primary' disabled={this.state.disabled}  onClick={this.submit}>登录</Button>
        </View>
        <View style={{padding:10,flexDirection:'row',justifyContent:'space-between'}}>
            <Text 
            onPress={()=>this.props.navigation.navigate('Register')}
            style={{color:'#ffb354'}}>立即注册</Text>
            <Text onPress={()=>this.props.navigation.navigate('ForgetPsw')}>忘记密码？</Text>
        </View>
       </View>
     )
   }
 }
 
 export default createForm()(LoginPage)