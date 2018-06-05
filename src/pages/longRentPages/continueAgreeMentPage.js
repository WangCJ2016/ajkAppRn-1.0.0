import React from 'react'
import { 
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView
 } from 'react-native'
 import { DatePicker,List,Picker,Toast } from 'antd-mobile'
 import { dateFormat } from '../../utils/fnUtils'
 import { connect } from 'react-redux'
import { renewProtocol,renewContract } from '../../reducers/longRent-hasRent.redux'

@connect(
  state=>({longRentHasRent: state.longRentHasRent}),
  {
    renewProtocol,renewContract
  }
)
 class ContinueAgreeMentPage extends React.Component {
   constructor() {
     super()
     this.state = {
       date: ''
     }
     this.handleSubmit = this.handleSubmit.bind(this)
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
      if(!this.state.date) {
        Toast.info('请先选择续签日期')
        return
      }
      if(this.props.navigation.state.params.title === '续签协议信息') {
        this.props.renewProtocol({...this.props.navigation.state.params,renewDate:this.state.date},()=>this.props.navigation.goBack())
      } else {
        this.props.renewContract({...this.props.navigation.state.params,renewDate:this.state.date},()=>this.props.navigation.goBack())
      }
      
   }
   onDateChange(e) {
     this.setState({
       date: dateFormat(e)
     })
   }
   render() {
     return (
      <SafeAreaView style={{flex:1}}>
        <View style={{alignItems:'center'}}>
          <ImageBackground style={{width:'100%',height:160}} source={require('../../assets/images/continue_bg.png')}>
            <Text style={{padding:10,color:'#fff',fontSize:17,lineHeight:25}}>您与房客当前签订和租赁合同到期时间为2018年5月15日，请选择续签的日期。</Text>
            <Text style={{textAlign:'center',fontSize:18,color:'#fff'}}>{this.state.date}</Text>
          </ImageBackground>
          <DatePicker
            value={new Date}
            minDate={new Date}
            format='YYYY-MM-DD'
            onChange={this.onDateChange.bind(this)}
            mode='date'>
            <CustomChildren></CustomChildren> 
          </DatePicker>
        </View>
      </SafeAreaView>
       
     )
   }
 }
 
 const CustomChildren = props => {
   return <TouchableOpacity 
      onPress={()=>props.onClick()}
      style={{width:210,height:45,borderRadius:22,backgroundColor:'#ff9c40',marginTop:25}}>
      <View >
        <Text style={{fontSize:17,color:'#fff',textAlign:'center',lineHeight:40}}>续签日期</Text>
      </View>
    </TouchableOpacity>
 }




 export default ContinueAgreeMentPage