import React from 'react'
import { 
  View,
  Text,
  ScrollView
 } from 'react-native'
 import { TextareaItem } from 'antd-mobile'
 import { connect } from 'react-redux'
 import { dataSuccess } from '../../reducers/longRent.redux'
 import InphoneXHoc from '../../hoc/inphoneXhoc'

 @InphoneXHoc
 @connect(
   state=>({longRent: state.longRent}),
  {
    dataSuccess
  }
 )
 class HouseInfoPage extends React.Component {
   constructor(props) {
     super(props)
     this.state = {
       value: props.longRent.rentHouseInfo.profile
     }
   }
  static navigationOptions = ({navigation,screenProps}) => ({  
    headerTitle:'房源介绍',
   })
   onChange(e) {
     this.setState({
       value: e
     })
   }
   componentWillUnmount() {
     this.props.dataSuccess({rentHouseInfo: {...this.props.longRent.rentHouseInfo,profile: this.state.value}})
   }
   render() {
     return (
       <ScrollView>
         <View style={{padding:10,marginTop: 10,backgroundColor:'#fff',paddingBottom:0}}>
         <TextareaItem
            placeholder='可以介绍房源的大概位置，结构、基础设施、装修风格、周边信息等'
            rows={20}
            count={500}
            onChange={this.onChange.bind(this)}
            value={this.state.value}
          />
         </View>
       </ScrollView>
     )
   }
 }
 
 export default HouseInfoPage