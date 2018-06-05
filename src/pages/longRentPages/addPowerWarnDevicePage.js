import React from 'react'
import { 
  View,
  Text,
  TouchableOpacity,
  SafeAreaView
 } from 'react-native'
 import { List, Radio, InputItem, Toast } from 'antd-mobile'
 import { connect } from 'react-redux'
 import { addPowerWarm } from '../../reducers/longRent-hasRent.redux'
 import { createForm } from 'rc-form'
 import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

 const RadioItem = Radio.RadioItem
 const data = [
  { value: 'light', label: '灯' },
  { value: 'spotlight', label: '射灯' },
  { value: 'tv', label: '电视机' },
  { value: 'air', label: '空调' },
  { value: 'bathHeater', label: '浴霸' },
  { value: 'kettle', label: '电水壶' },
  { value: 'blower', label: '吹风机' },
  { value: 'other', label: '其他' },
];


@connect(
  state=>({longRentHasRent:state.longRentHasRent}),{
    addPowerWarm
  }
)
 class AddPowerWarnDevicePage1 extends React.Component {
   constructor() {
     super()
     this.state = {
       value: ''
     }
     this.addPowerwarm = this.addPowerwarm.bind(this)
   }
   static navigationOptions = ({navigation,screenProps}) => ({  
    headerRight: (  
      <TouchableOpacity onPress={()=>navigation.state.params.addPowerwarm()}> 
        <View style={{marginRight:10}}>
           <Text style={{color:'#ffb354'}}>添加</Text>
        </View>
      </TouchableOpacity>   
        
    ),  
   })
  
  componentDidMount() {
    this.props.navigation.setParams({addPowerwarm: this.addPowerwarm})
  }
   addPowerwarm() {
    if(!this.state.value) {
      Toast.info('请选择预警设备')
      return 
    }
    this.props.form.validateFields({ force: true }, (error,values) => {
      
      if (!error) {
        this.props.addPowerWarm({
          powerId:this.props.navigation.state.params.powerId,
          name: encodeURI(this.state.value),
          warnPower:values.warnPower,
          warnTime:values.warnTime},()=>this.props.navigation.goBack())    
      } else {
        if(!values.warnPower) {
          Toast.info('请填写预警值')
          return 
        }
        if(!values.warnTime) {
          Toast.info('请填写持续时间')
          return
        }
      }
    });
    
  }
   render() {
     const { getFieldProps } = this.props.form;
     return (
      <SafeAreaView style={{flex:1}}>
       <KeyboardAwareScrollView>
        <List renderHeader={() => '预警设备选择'}>
          {data.map(i => (
            <RadioItem key={i.value} checked={this.state.value === i.value} onChange={() => this.setState({value:i.value})}>
              {i.label}
            </RadioItem>
          ))}
        </List>
        <List renderHeader={() => '预警值'}>
          <InputItem
            {...getFieldProps('warnPower',{
              rules: [
                { required: true, message: '请输入预警值' },
              ],
            })}
            placeholder="预警值"
            type='number'
            textAlign='right'
          >预警值</InputItem>
          <InputItem
            {...getFieldProps('warnTime',{
              rules: [
                { required: true, message: '请输入持续时间' },
              ],
            })}
            placeholder="持续时间"
            type='number'
            textAlign='right'
          >持续时间</InputItem>
        </List>
       </KeyboardAwareScrollView>
       </SafeAreaView>
     )
   }
 }
 const AddPowerWarnDevicePage = createForm()(AddPowerWarnDevicePage1)
 export default AddPowerWarnDevicePage