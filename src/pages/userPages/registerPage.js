import React from 'react'
import { 
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput
 } from 'react-native'
 import CheckBox from 'react-native-check-box'
 import { List, InputItem, Button } from 'antd-mobile'
 import GetVerCode from '../../components/getVerCode'
import RegisterAndPswHoc from '../../hoc/RegisterAndPswHoc'
import InphoneXHoc from '../../hoc/inphoneXhoc'

 @InphoneXHoc
@RegisterAndPswHoc
 class RegisterPage extends React.Component {
   constructor() {
     super()
     this.state = {
      checkBox:true
     }
     this.checkClick = this.checkClick.bind(this)
     this.vercodeChange = this.vercodeChange.bind(this)
   }
   register() {
    this.props.form.validateFields((error,values) => {
      if (!error) {
        this.props.register({telephone:values.account,code:this.state.code,password:values.psw},this.props.navigation)
      }
    })
   }
   vercodeChange(e) {
      this.setState({
        code: e
      })
   }
   checkClick() {
     this.setState({
      checkBox: !this.state.checkBox
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
                keyboardType='numeric'
                onChangeText={this.vercodeChange}
                placeholder='请输入验证码'
                placeholderTextColor='#ccc'></TextInput>
              <GetVerCode 
                getVerCode={()=>newProps.getVerCode('REG')}
                verCodeBtnDisabled={newProps.state.verCodeBtnDisabled}
                count={newProps.state.count}>
              </GetVerCode>
            </View>
  
            {getFieldDecorator('psw',{
              rules: [{ required: true,message: '请填写通道名称'},{pattern:/[a-zA-Z\d+]{6,36}/,message: '请填写通道名称'}],
            })(<InputItem
              clear
              type='number'
              placeholder="请输入密码"
              onChangeText={newProps.onChange}
            >密码</InputItem>)}
    
        </List>
        <View style={{padding:10}}>
          <Button type='primary' disabled={newProps.state.registerBtnDisabled&&newProps.state.checkBox}   onClick={()=>this.register()}>注册</Button>
        </View>
        
          <View style={{alignItems:'center',justifyContent: 'center'}}>
            <CheckBox
            style={{ padding: 10,justifyContent: 'center',alignItems:'center'}}
            onClick={this.checkClick}
            isChecked={this.state.checkBox}
            checkedImage={<Image source={require('../../assets/images/ic_checkbox_active.png')} />}
            unCheckedImage={<Image source={require('../../assets/images/ic_checkbox.png')} />}
            rightTextView={<View style={styles.agreeItem}>
            <Text style={{fontSize:12}}>我已阅读并同意爱居客</Text>
            <Text style={styles.activeText}>用户使用协议</Text></View> }
          />
          
          </View>
       </View>
     )
   }
 }
 const styles = StyleSheet.create({
  
  agreeItem: {
    flexDirection: 'row'
  },
  activeText:{
    fontSize:12,
    color: '#ffcb8a'
  }
 }) 

 export default RegisterPage