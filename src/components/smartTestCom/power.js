import React from 'react'
import { 
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity
 } from 'react-native'
 import {DatePicker} from 'antd-mobile'
 import { dateFormat } from '../../utils/fnUtils'

 class PowerCom extends React.Component {
   constructor() {
     super()
     this.state = {
       startTime: new Date(),
       endTime: new Date()
     }
     this.onDateChange = this.onDateChange.bind(this)
   }
   currentPowerListRender() {
     const list = this.props.currentPowerList
     return list.map(device=>(
      <View style={styles.flex_row_between}>
          <Text style={{fontSize:16}}>{device.deviceId}</Text>
          <Text style={{fontSize:16}}>{device.name}</Text>
          <Text style={{fontSize:15,color:'#7e8082'}}>用电{device.power}w</Text>
      </View>
     ))
   }
   onDateChange(e,type) {
     this.setState({
       [type]: e
     },()=>{
       if(this.state.startTime.getTime()<=this.state.endTime.getTime()) {
         this.props.historyPower({powerId: this.props.powerId, startTime:dateFormat(this.state.startTime),endTime:dateFormat(this.state.endTime)})
       }
     })
   }
   render() {
     return (
       <ScrollView>
          <View style={{paddingLeft:40,paddingRight:40,backgroundColor:'#fff'}}>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
              <DatePicker
                value={new Date}
                minDate={new Date}
                format='YYYY-MM-DD'
                onChange={(e)=>this.onDateChange(e,'startTime')}
                mode='date'>
                <DatePickerChild day={dateFormat(this.state.startTime)}></DatePickerChild> 
              </DatePicker>
              <DatePicker
                value={new Date}
                minDate={new Date}
                format='YYYY-MM-DD'
                onChange={(e)=>this.onDateChange(e,'endTime')}
                mode='date'>
                <DatePickerChild day={dateFormat(this.state.endTime)}></DatePickerChild> 
              </DatePicker>
            </View>
            
            {this.currentPowerListRender()}
          </View>
       </ScrollView>
     )
   }
 }
 const styles = StyleSheet.create({
   flex_row_between:{
     flexDirection:'row',
     justifyContent: 'space-between',
     height:43,
     alignItems:'center',
     borderColor: '#d8d8d8',
     borderBottomWidth: 0.5
   }
 })

 const DatePickerChild = props => {
  return <TouchableOpacity 
     onPress={()=>props.onClick()}
    >
     <View style={{flexDirection:'row',height:40,alignItems:'center'}}>
          <Image source={require('../../assets/images/rili.png')}></Image>
          <Text style={{color:'#ff9c40',marginLeft:10}}>{props.day}</Text>
      </View>
   </TouchableOpacity>
}

 export default PowerCom

