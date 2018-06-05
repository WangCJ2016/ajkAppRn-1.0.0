import React from 'react'
import { 
  View,
  Text
 } from 'react-native'
 import { List, InputItem, Button } from 'antd-mobile'
 import { createForm } from 'rc-form'
 import { connect } from 'react-redux'
 import {idCard} from '../../reducers/user.redux'
 import InphoneXHoc from '../../hoc/inphoneXhoc'

 @InphoneXHoc
 @connect(
   state=>state.user,
   {idCard}
 )
 class IdentifyPage extends React.Component {
   constructor() {
     super()
     this.register = this.register.bind(this)
   }

   register() {
      this.props.form.validateFields((error,values) => {
        if(!error) {
          this.props.idCard({name:encodeURI(values.name),cardNo:values.cardNo},this.props.navigation)
        }
      })
   }
   render() {
    const { getFieldDecorator,getFieldError,getFieldValue } = this.props.form;
     return (
      <View>
      <List 
      >
          {getFieldDecorator('name',{
            rules: [{ required: true,message: '请填写姓名'},{pattern:/^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/,message: '请填写姓名'}],
          })(
              <InputItem
              type='text'
              placeholder="请输入您的姓名"
              textAlign='right'
            >真实姓名</InputItem>
           )}
           {getFieldDecorator('cardNo',{
            rules: [{ required: true,message: '请填写省份证'},{pattern:/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,message: '请填写省份证'}],
          })(<InputItem
            clear
            type='number'
            placeholder="请输入您的身份证号码"
            textAlign='right'
          >身份证号</InputItem>)}
        </List>
        <View style={{padding:10}}>
          <Button type='primary' disabled={!!getFieldError('name')||!!getFieldError('cardNo')||!getFieldValue('name')||!getFieldValue('cardNo')}   onClick={this.register}>身份绑定</Button>
        </View>
      </View>
     )
   }
 }
 
 export default createForm()(IdentifyPage)