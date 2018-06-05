import React from 'react'
import { 
  View,
  Text,
  TouchableOpacity,
  SafeAreaView
 } from 'react-native'
import { DatePicker,List,TextareaItem,Toast } from 'antd-mobile'
import { stopContract,modifyLandlordHouseStatus } from '../../reducers/longRent-hasRent.redux'
import { connect } from 'react-redux'
import { dateFormat } from '../../utils/fnUtils'

@connect(
   state=>({longRentHasRent:state.longRentHasRent}),
   {
    stopContract,modifyLandlordHouseStatus
   }
)
 class EndAgreeMentPage extends React.Component {
   constructor() {
     super()
     this.state = {
      date: new Date()
     }
     this.handleSubmit = this.handleSubmit.bind(this)
     this.cb = this.cb.bind(this)
   }
   static navigationOptions = ({navigation,screenProps}) => ({  
    title:navigation.state.params.title,
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
     const params = this.props.navigation.state.params
     if(!this.state.reason) {
       Toast.info('请填写终止原因')
       return 
     }
     if(params.title === '终止协议') {
       this.props.modifyLandlordHouseStatus({houseId: params.houseId,type:'down',date:dateFormat(this.state.date),reason: this.state.reason},this.cb)
     }else {
      this.props.stopContract({...this.props.navigation.state.params,date:dateFormat(this.state.date),reason: this.state.reason},this.cb)
     }
   }
   cb() {
     Toast.info('提交成功')
     this.props.navigation.goBack()
   }
   render() {
     return (
      <SafeAreaView style={{flex:1}}>
       <View>
        <DatePicker
          value={this.state.date}
          minDate={new Date}
          onChange={v => this.setState({ date: v })}
          mode='date'>
            <List.Item arrow="horizontal">选择终止时间</List.Item>
        </DatePicker>
        <View style={{padding:15,backgroundColor:'#fff',paddingBottom:0}}>
           <TextareaItem rows={10} placeholder='填写终止原因' onChange={(e)=>this.setState({reason: e})}></TextareaItem>
        </View>
       </View>
       </SafeAreaView>
     )
   }
 }
 
 export default EndAgreeMentPage