import React from 'react'
import { 
  View,
  Text,
  AsyncStorage
 } from 'react-native'
 import Calendar from 'react-native-whc-calendar'
 import { connect } from 'react-redux'
 import { roomCalendar,selectDays } from '../../reducers/hotel.redux'
 import InphoneXHoc from '../../hoc/inphoneXhoc'

 @InphoneXHoc
 @connect(
   state => ({hotel: state.hotel}),
   {
    roomCalendar,selectDays
   }
 )
 class RoomDateSelectPage extends React.PureComponent {
   constructor(props) {
     super(props)
     this.state = {
       obj: null
     }
     this.onSelectedDateBlock = this.onSelectedDateBlock.bind(this)
   }
   componentDidMount() {
     let a = new Date()
     let dayArr = []
     a.setDate(15)
     for(let i=0;i<6;i++) {
        a.setMonth(a.getMonth() + 1) 
        dayArr = [...dayArr,a.getFullYear()+ '-' + (a.getMonth()>=10?a.getMonth():'0'+a.getMonth())]
     }
     this.props.roomCalendar({houseId:this.props.navigation.state.params.houseId,month:dayArr.join(',')})
   }
   onSelectedDateBlock(s,e) {
     const selectedRange = {
       startDateStr: s,
       endDateStr: e
     }
     this.props.selectDays({selectDaysObj:selectedRange})
     this.props.navigation.goBack()
   }
   render() {
     const selectedRange = this.props.hotel.selectDaysObj
     return (
       <View style={{flex:1}}>
         <Calendar
           months={6}
           selectedColor='#ffb354'
           highlightColor='#ffb354'
           startDateStr={selectedRange?selectedRange.startDateStr:''}
           endDateStr={selectedRange?selectedRange.endDateStr:''}
           onSelectedDateBlock={this.onSelectedDateBlock}
          />
       </View>
     )
   }
 }
 
 export default RoomDateSelectPage