import React from 'react'
import { 
  View,
  Text,
  ScrollView,
  Image
 } from 'react-native'
 import { List, Checkbox } from 'antd-mobile'
 const Item = List.Item
 import { connect } from 'react-redux'
 import { houseAssorts,dataSuccess } from '../../reducers/longRent.redux'
 import InphoneXHoc from '../../hoc/inphoneXhoc'

 @InphoneXHoc
 @connect(
   state => ({longRent: state.longRent}),
   {
    houseAssorts,dataSuccess
   }
 )
 class DeviceChoosePage extends React.Component {
   constructor(props) {
     super(props)
     this.state = {
       assorts: props.longRent.rentHouseInfo.assorts?props.longRent.rentHouseInfo.assorts.split(','):[]
     }
   }
   componentDidMount() {
     this.props.houseAssorts()
   }
   componentWillUnmount() {
     this.props.dataSuccess({rentHouseInfo: {...this.props.longRent.rentHouseInfo,assorts:this.state.assorts.join(',')}})
   }
   onChange(selectAssort,e) {
     if(e.target.checked) {
       this.setState({
         assorts: [...this.state.assorts,selectAssort.id]
       })
     }else{
       this.setState({
         assorts: this.state.assorts.filter(assort => assort!==selectAssort.id)
       })
     }
   }
   listRender() {
     const assorts = this.props.longRent.houseAssorts
     const assortsArr = this.props.longRent.rentHouseInfo.assorts.split(',')
     return assorts.map(item => (
      <Item  
      key={item.id}
      thumb={<Image source={{uri:item.icon,width:22,height:22}} resizeMode='contain'></Image>}
      extra={<Checkbox defaultChecked={assortsArr.indexOf(item.id)>-1} onChange={this.onChange.bind(this,item)}></Checkbox>}>
         <Text style={{marginLeft:10,fontSize:15}}>{item.title}</Text> 
      </Item>
     ))
   } 
   render() {
     return (
       <ScrollView>
         <List>
            {this.listRender()}
         </List>
       </ScrollView>
     )
   }
 }
 
 
 export default DeviceChoosePage