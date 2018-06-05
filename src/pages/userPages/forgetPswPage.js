import React from 'react'
import { 
  View,
  Text,
  TextInput
 } from 'react-native'
 import { createForm } from 'rc-form'
 import GetVerCode from '../../components/getVerCode'
 import { List,InputItem,Button } from 'antd-mobile'
 import { connect } from 'react-redux'
import {getRegisterVerCode,register} from '../../reducers/user.redux'
import RegisterAndPswHoc from '../../hoc/RegisterAndPswHoc'
import InphoneXHoc from '../../hoc/inphoneXhoc'

 @InphoneXHoc
@RegisterAndPswHoc
 class ForgetPswPage extends React.Component {
   constructor() {
     super()
     this.vercodeChange = this.vercodeChange.bind(this)
   }
   register() {
    this.props.form.validateFields((error,values) => {
      if (!error) {
        this.props.forgetPsw({telephone:values.account,code:this.state.code},this.props.navigation)
      }
    })
   }
   vercodeChange(e) {
     this.setState({
       code: e
     })
   }
   render() {
     const newProps = this.props.newProps
     const { getFieldDecorator } = this.props.form;
     return (
       <View>
       <List 
       >
           {getFieldDecorator('account',{
             rules: [{ required: true,message: '请填写通道名称'},{pattern:/^1[34578]\d{9}$/,message: '请填写通道名称'}],
              })(
                  <InputItem
                  type='number'
                  placeholder="请输入手机号"
                  onChangeText={newProps.onChange}
                >手机号</InputItem>
                )}
                <View style={{flexDirection:'row',justifyContent:'space-between',height:50,alignItems:'center',paddingRight:15,marginLeft:15,borderBottomColor:'#ddd',borderBottomWidth:0.5}}>
                  <Text style={{fontSize:17,color:'rgb(85,85,85)'}}>验证码</Text>
                  <TextInput 
                    style={{flex:1,marginLeft:22,fontSize:17,color:'rgb(85,85,85)'}} 
                    placeholder='请输入验证码'
                    placeholderTextColor='#ccc'
                    onChangeText={this.vercodeChange}></TextInput>
                  <GetVerCode 
                    getVerCode={()=>newProps.getVerCode('RPSW')}
                    verCodeBtnDisabled={newProps.state.verCodeBtnDisabled}
                    count={newProps.state.count}>
                  </GetVerCode>
                </View>
          </List>
          <View style={{padding:10}}>
            <Button type='primary' disabled={newProps.state.registerBtnDisabled}   onClick={()=>this.register()}>完成</Button>
          </View>
          </View>
     )
   }
 }
 
 export default ForgetPswPage