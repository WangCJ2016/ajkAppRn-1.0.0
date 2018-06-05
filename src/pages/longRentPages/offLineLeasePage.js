import React from 'react'
import { 
  View,
  Text,
  TouchableOpacity,
  DeviceEventEmitter,
  SafeAreaView
 } from 'react-native'
 import {DatePicker,List,InputItem,Toast} from 'antd-mobile'
 import { offlineLease } from '../../reducers/longRent-hasRent.redux'
 import { connect } from 'react-redux'
 import { dateFormat } from '../../utils/fnUtils'

 @connect(
   null,{
    offlineLease
   }
 )
 class OffLineLeasePage extends React.Component {
   constructor() {
     super()
     this.state = {
       startTime: '',
       endTime: ''
     }
     this.handleSubmit = this.handleSubmit.bind(this)
     this.callback = this.callback.bind(this)
   }
    static navigationOptions = ({navigation,screenProps}) => ({  
      title:'线下出租',
      headerRight: (  
          <TouchableOpacity onPress={()=>navigation.state.params.handleSubmit()}>
            <View style={{flexDirection:'row',alignItems:'center',marginRight:10}}>
              <Text style={{color:'#ffb354',fontSize:16}}>提交</Text>
            </View>
          </TouchableOpacity>
      ),  
    })
    componentDidMount() {
      this.props.navigation.setParams({handleSubmit: this.handleSubmit})
    }
    handleSubmit() {
      if(!this.state.telephone) {
        Toast.info('请填写手机号')
        return 
      }
      if(!(/^1[34578]\d{9}$/.test(this.state.telephone))) {
        Toast.info('请填写正确的手机号')
        return 
      } 
      if(!this.state.startTime) {
        Toast.info('请选择开始时间')
        return 
      }
      if(!this.state.endTime) {
        Toast.info('请选择结束时间')
        return 
      }
      this.props.offlineLease({
        houseId: this.props.navigation.state.params.houseId,
        startTime: dateFormat(this.state.startTime),
        endTime: dateFormat(this.state.endTime),
        telephone: this.state.telephone
      },this.callback)
    }
    callback() {
      Toast.info('已提交')
      DeviceEventEmitter.emit('REFRESH')
      this.props.navigation.goBack()
    }
    render() {
      return (
        <SafeAreaView style={{flex:1}}>
         <View>
         <List>
          <InputItem
            placeholder="请输入租客电话"
            type='number'
            textAlign='right'
            onChange={(e)=>this.setState({telephone: e})}
            >
            租客电话
          </InputItem>
          <DatePicker
              value={this.state.startTime}
              minDate={new Date}
              onChange={v => this.setState({ startTime: v })}
              mode='date'>
                <List.Item arrow="horizontal">选择开始时间</List.Item>
          </DatePicker>
          <DatePicker
              value={this.state.endTime}
              minDate={this.state.startTime}
              onChange={v => this.setState({ endTime: v })}
              mode='date'>
                <List.Item arrow="horizontal">选择结束时间</List.Item>
          </DatePicker>
          </List>
        </View>
        </SafeAreaView>
      )
    }
 }
 
 export default OffLineLeasePage