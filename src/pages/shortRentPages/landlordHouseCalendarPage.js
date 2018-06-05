import React from 'react'
import { 
  View,
  Text,
  AlertIOS
 } from 'react-native'
 import { Button } from 'antd-mobile'
 import Calendar from '../../components/rn-date-picker/Calendar'
 import { connect } from 'react-redux'
 import { houseCalendar,landlordModifyHousePrice } from '../../reducers/shortRent.redux'
 import { Toast } from 'antd-mobile'
 import { dateFormat} from '../../utils/fnUtils'
 import InphoneXHoc from '../../hoc/inphoneXhoc'

 @InphoneXHoc
 @connect(
  state => ({landlord: state.landlord}),
  {
    houseCalendar,landlordModifyHousePrice
  }
)
 class LandlordHouseCalendarPage extends React.Component {
   constructor() {
     super()
     this.state = {
       dateArr:[],
       clear:false
     }
     this.onSelectionChange = this.onSelectionChange.bind(this)
     this.changePrice = this.changePrice.bind(this)
     this.save = this.save.bind(this)
     this.getCalendar = this.getCalendar.bind(this)
   }
   componentDidMount() {
    this.getCalendar()
   }
   getCalendar() {
    let a = new Date()
    let dayArr = []
    a.setDate(15)
    for(let i=0;i<3;i++) {
       a.setMonth(a.getMonth() + 1) 
       dayArr = [...dayArr,a.getFullYear()+ '-' + (a.getMonth()>=10?a.getMonth():'0'+a.getMonth())]
    }
     this.props.houseCalendar({houseId:this.props.navigation.state.params.houseId,month:dayArr.join(',')})
   }
   onSelectionChange(e) {
     this.setState({
       dateArr: e
     })
   }
   changePrice() {
     AlertIOS.prompt('修改价格',null,[{text:'取消'},{text:'确定',onPress: this.save}])
   }
   save(e) {
     if(!(e-0)) {
       Toast.info('请输入数字')
     }else{
       const dateArr = this.state.dateArr.map(date => dateFormat(date))
      this.props.landlordModifyHousePrice({houseId:this.props.navigation.state.params.houseId,price:e,dates:dateArr.join(',')}, this.getCalendar)
      this.setState({
        clear:true
      })
      setTimeout(()=>{
        this.setState({
          clear:false
        })
      })
     }
   }
   render() {
     return (
       <View style={{flex:1}}>
       <Calendar 
        startFromMonday={false} 
        monthsCount={3} 
        startDate={new Date()}
        onSelectionChange={this.onSelectionChange}
        multiple={true}
        defaultPrice={this.props.navigation.state.params.defaultPrice-0}
        houseCalendar={this.props.landlord.houseCalendar}
        rangeSelect={false}
        clear={this.state.clear}
         />
         <Button
        type='primary'
        onClick={this.changePrice}
         >修改价格</Button>
       </View>
     )
   }
 }
 
 export default LandlordHouseCalendarPage