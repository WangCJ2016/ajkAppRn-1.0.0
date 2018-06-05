import React from 'react'
import { 
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  TextInput,
  Dimensions
 } from 'react-native'
 import SwipeList from 'react-native-smooth-swipe-list'
 import { Modal } from 'antd-mobile'
 import { withNavigation } from 'react-navigation'
 const HEIGHT = Dimensions.get('window').height

 @withNavigation
 class PowerWarm extends React.Component {
   constructor() {
     super()
     this.state = {
      visible:false,
      editVisible: false
     }
     this.rowView = this.rowView.bind(this)
     this.rightSubView = this.rightSubView.bind(this)
   }
   rowView(item) {
     return (
       <View style={styles.flex_row_between}>
         <Text style={[styles.titleText,{flex:1}]} numberOfLines={1}>{item.name}</Text>
         <Text style={[{fontSize:15,color:'#aaa',flex:1}]} numberOfLines={1}>预警功率：{item.warnPower}</Text>
         <Text style={[{fontSize:15,color:'#aaa',flex:1}]} numberOfLines={1}>持续时间：{item.warnTime}</Text>
       </View>
     )
   }
   rightSubView(item) {
     return <View style={{flexDirection:'row'}}  key={item.id}>
      <TouchableOpacity 
      onPress={()=>this.setState({editVisible: true,selectPowerWarn:item})}
      style={{height:'100%',backgroundColor: '#ff9c40',justifyContent:'center'}}>
              <Text style={{color:'#fff',textAlign: 'right',fontSize:16,paddingRight:10,paddingLeft:10}}>修改</Text>
      </TouchableOpacity>
      <View style={{width:0.5,height:'100%',backgroundColor:'#fff'}}></View>
      <TouchableOpacity 
        onPress={()=>this.delete(item.id)}
        style={{height:'100%',backgroundColor: '#ff9c40',justifyContent:'center'}}>
                <Text style={{color:'#fff',textAlign: 'right',fontSize:16,paddingRight:10,paddingLeft:10}}>删除</Text>
        </TouchableOpacity>
    </View> 
   }
   delete(id) {
     this.props.modifyPowerWarm({
       id:id,isDelete:1, powerId:this.props.powerId,
      })
   }
   warmPowerListRender() {
     const list = this.props.warmPowerList
     const rowData = list.map(item=>{
      return {
        id:item.id,
        rowView: this.rowView(item),
        rightSubView: this.rightSubView(item), //optional
      }
    })
    return rowData
   }
   
   editPowerwarm() {
    this.setState({editVisible:false})
    this.props.modifyPowerWarm({
      powerId:this.props.powerId,
      id:this.state.selectPowerWarn.id,
      name:this.state.editName?encodeURI(this.state.editName):encodeURI(this.state.selectPowerWarn.name),
      warnPower:this.state.editWarnPower?this.state.editWarnPower:this.state.selectPowerWarn.warnPower,
      warnTime:this.state.editWarnTime?this.state.editWarnTime:this.state.selectPowerWarn.warnTime
    })
   }
   powerRecordRender() {
     const list = this.props.powerRecordList
     return list.map(warm => (
      <View style={[styles.flex_row_between]}>
        <Text style={{fontSize:16}}>{warm.name}</Text>
        <Text style={{fontSize:16,color:'#7e8082'}}>功耗<Text style={{color:'#f2080d'}}>{warm.power}W</Text></Text>
        <Text style={{fontSize:15,color:'#7e8082'}}>{warm.status===0?'关闭':'开启'}</Text>
      </View>
     ))
   }
   render() {
    const height = this.props.powerRecordList.length * 41 + 50 > HEIGHT/2?HEIGHT/2:this.props.powerRecordList.length * 41 + 50
     return (
       <ScrollView>
          <ScrollView style={[styles.listView,{height:height}]}>
             <Text style={[styles.titleText,{height:50,lineHeight:50,color:'#ffb354'}]}>预警列表</Text>
             {this.powerRecordRender()}
          </ScrollView>

          <View style={[styles.listView,{marginTop: 10}]}>
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
              <Text style={[styles.titleText,{height:50,lineHeight:50}]}>预警列表设置</Text>
              <TouchableHighlight onPress={()=>{this.props.navigation.navigate('AddPowerWarnDevice',{powerId: this.props.powerId})}} underlayColor='rgba(255,156,64,.3)'>
                 <View style={styles.addBtn}>
                   <Text style={{fontSize:16}}>添加</Text>
                 </View>
              </TouchableHighlight>
            </View>
            
            <SwipeList  rowData={this.warmPowerListRender()} />
          </View>
          

          <Modal
            title={'修改设备'}
            transparent={true}
            maskClosable={true}
            visible={this.state.editVisible}
            footer={[{ text: '取消',style: { color:"#ccc" }, onPress: ()=>this.setState({editVisible:false}) },
            { text: '确定',style: { fontWeight: 'bold' }, onPress: () => this.editPowerwarm() }]}
           >
           <View style={{flexDirection:'row',paddingBottom:15}}>
             <View style={{flex:1,justifyContent:'center'}}>
                <Text style={styles.modalTitleText}>设备名称</Text>
                <TextInput placeholder='设备名称' defaultValue={this.state.selectPowerWarn?this.state.selectPowerWarn.name:''} style={{textAlign:'center'}} onChangeText={e=>this.setState({editName:e})}></TextInput>
             </View>
             <View style={{flex:1}}>
                <Text style={styles.modalTitleText}>预警功率</Text>
                <TextInput placeholder='单位(w)' defaultValue={this.state.selectPowerWarn?this.state.selectPowerWarn.warnPower:''} style={{textAlign:'center'}} keyboardType='numeric' onChangeText={e=>this.setState({editWarnPower:e})}></TextInput>
             </View>
             <View style={{flex:1}}>
                <Text style={styles.modalTitleText}>持续时间</Text>
                <TextInput placeholder='单位(s)' defaultValue={this.state.selectPowerWarn?this.state.selectPowerWarn.warnTime:''} style={{textAlign:'center'}} keyboardType='numeric' onChangeText={e=>this.setState({editWarnTime:e})}></TextInput>
             </View>
           </View> 
          </Modal>
       </ScrollView>
     )
   }
 }
 
 const styles = StyleSheet.create({
   listView:{
     paddingLeft: 25,
     paddingRight: 25,
     backgroundColor: '#FFFFFF'
   },
   titleText:{
     fontSize: 16,
   },
   flex_row_between:{
     flexDirection: 'row',
     justifyContent: 'space-between',
     height: 41,
     backgroundColor:'#fff',
     alignItems: 'center',
     borderColor: '#d8d8d8',
     borderBottomWidth: 0.5
   },
   addBtn:{
     width: 55,
     height:25,
     borderColor:'#ff9c40',
     borderWidth:1,
     borderRadius: 2,
     justifyContent:'center',
     alignItems:'center'
   },
   modalTitleText:{
    textAlign:'center',height:40,lineHeight:40,fontSize:16
   }
 })
 export default PowerWarm