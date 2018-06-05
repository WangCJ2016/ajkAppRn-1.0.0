import React from 'react'
import { 
  View,
  Text,
  takeSnapshot,
  Image,
  TouchableOpacity,
  DeviceEventEmitter,
  SafeAreaView
 } from 'react-native'
import { DatePicker,List,Toast } from 'antd-mobile'
import { uploadImage } from '../../reducers/user.redux'
import {connect} from 'react-redux'
import { modifyLeaseIntent } from '../../reducers/main.redux'
import { dateFormat } from '../../utils/fnUtils'

@connect(
  null,{
    uploadImage,modifyLeaseIntent
  }
)
 class ContractInfoPage extends React.Component {
   constructor() {
     super()
     this.state = {
       startTime: new Date()
     }
     this.handleSubmit = this.handleSubmit.bind(this)
     this.cb = this.cb.bind(this)
   }
  static navigationOptions = ({navigation,screenProps}) => ({  
    headerTitle: navigation.state.params.title,
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
     if(!this.state.endTime) {
       Toast.info('请选择结束时间')
       return
     }
     takeSnapshot(this.constract, {format: 'png', quality: 1}).then((uri) =>{
       this.props.uploadImage(uri,'租赁合同',this.cb)
      }
      ).catch(
          (error) => alert(error)
      );
   }
   cb(uri) {
     const title = this.props.navigation.state.params.title
     this.props.modifyLeaseIntent({
      intentId: this.props.navigation.state.params.intentId,
      contract: uri,
      operate: title==='确认看房'?'confirm':'authorize',
      startTime: dateFormat(this.state.startTime),
      endTime: dateFormat(this.state.endTime)
     },()=>{this.props.navigation.goBack();Toast.info('已同意');DeviceEventEmitter.emit('REFRESHLANDLORDINTENT')})
   }
   render() {
     return (
       <SafeAreaView style={{flex:1}}>
        <View ref={(constract)=>this.constract = constract}>
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
        </View>
        <Image source={{uri: this.state.uri,width:200,height:400}}></Image>
       </SafeAreaView>
     )
   }
 }
 
 export default ContractInfoPage