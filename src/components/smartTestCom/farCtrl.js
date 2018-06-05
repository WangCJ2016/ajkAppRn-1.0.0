import React from 'react'
import { 
  View,
  Text,
  ScrollView,
  StyleSheet,
  Switch
 } from 'react-native'


 class FarCtrl extends React.Component {
  constructor() {
    super()
    this.swtichCtrl = this.swtichCtrl.bind(this)
  }
  powerRelayListRender() {
    const powerRelayList = this.props.powerRelayList
    return powerRelayList.map(device => (
      <View style={[styles.flex_row_between,{height:45,borderColor: '#d8d8d8',borderBottomWidth:0.5}]}>
        <Text style={styles.tableText}>{device.place}</Text>
        <Text style={[styles.tableText,{color:device.arcCount<8?'#555':'#f2080d'}]}>{device.arcCount<8?'正常':'警告'}</Text>
        <View style={{flex:1,alignItems:'center'}}>
          <Switch value={device.status===1?true:false}  onValueChange={e=>this.swtichCtrl(e,device)} onTintColor='#ffb354'></Switch>
        </View>
      </View>
    ))
  }
  swtichCtrl(e,device) {
    this.props.powerRelayControl({powerId: device.hostId,deviceId:device.id,action:e===true?'jdqoff':'jdqon'})
  }
   render() {
     
     return (
       <ScrollView>
          <View style={[styles.flex_row_between,{borderColor: '#d8d8d8',borderBottomWidth:0.5}]}>
            <Text style={styles.titleText}>设备名称</Text>
            <Text style={styles.titleText}>电弧状态</Text>
            <Text style={styles.titleText}>开关状态</Text>
          </View>
          {this.powerRelayListRender()}
       </ScrollView>
     )
   }
 }
 
 const styles = StyleSheet.create({
   flex_row_between:{
     flexDirection: 'row',
     justifyContent: 'space-between',
     height: 40,
     alignItems: 'center',
     backgroundColor: '#FFFFFF'
   },
   titleText:{
     fontSize: 13,
     color: '#555',
     textAlign: 'center',
     flex: 1
   },
   tableText:{
     fontSize: 16,
     color: '#000',
     textAlign: 'center',
     flex: 1
   }
 })
 export default FarCtrl