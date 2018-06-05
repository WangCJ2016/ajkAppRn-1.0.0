import React from 'react'
import { 
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  StyleSheet,
  ScrollView,
  ListView,
  Dimensions
 } from 'react-native'
 import { connect }  from 'react-redux'
 import {shopCarList,shopCardel,houseCheckBox,hotelCheckBox,checkboxAll,checkHouseWhetherReserve } from '../../reducers/shopcar.redux'
 import { List, Checkbox, Flex } from 'antd-mobile'
//  import { SwipeListView } from 'react-native-swipe-list-view'
 import SwipeList from 'react-native-smooth-swipe-list'
 const CheckboxItem = Checkbox.CheckboxItem;
const HEIGHT = Dimensions.get('window').height
import InphoneXHoc from '../../hoc/inphoneXhoc'

 @InphoneXHoc
@connect(
  state => ({shopcar:state.order,user: state.user}),
  {shopCarList,shopCardel,houseCheckBox,hotelCheckBox,checkboxAll}
)
 class ShopCarPage extends React.Component {
  constructor() {
    super()
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2
     })
    this.state = {
      dataSource: ds.cloneWithRowsAndSections({
       'section1': ['1'],
       'section2': ['1']
     })
    }
    this.renderRow = this.renderRow.bind(this)
    this.renderSectionHeader = this.renderSectionHeader.bind(this)

    this.onChange = this.onChange.bind(this)
    this.renderItem = this.renderItem.bind(this)
    this.renderHiddenItem = this.renderHiddenItem.bind(this)
    this.delete = this.delete.bind(this)
  }
  componentDidMount() {
    if(this.props.user.token) {
      this.props.shopCarList()
    }else{
      this.props.navigation.navigate('Login')
    }
  }
  renderRow(data) {
    const rowData = data.map(house=>{
      return {
        id: house.id,
        rowView: this.renderItem(house),
        rightSubView: this.renderHiddenItem(house), //optional
      }
    })
   
    return (
      <View>
        <SwipeList  rowData={rowData} />
      </View>
    )
  }
  renderSectionHeader(data) {
    return (
      <View key={Object.keys(data)[0]} style={{flexDirection:'row',padding: 10}}>
        <Checkbox style={{alignItems:'center'}} checked={Object.values(data)[0][0].hotelCheck} onChange={(e)=>this.hotelChange(Object.keys(data)[0])}>
        <Text style={{marginLeft:15}}>
        {Object.keys(data)[0]}
        </Text>  
        </Checkbox>
       
      </View>  
    )
  }
  onChange(e,houseId) {
      this.props.houseCheckBox(houseId)
  }
  hotelChange(hotelName) {
     this.props.hotelCheckBox(hotelName)
  }
  selectAll(e) {
     this.props.checkboxAll(e.target.checked)
  }
 
  renderItem(data, rowMap) {
    const cart = data
    return (
            <CheckboxItem key={cart.houseId} checked={cart.checked?cart.checked:false} onChange={(e) => this.onChange(e,cart.houseId)}>
              <View style={{flexDirection:'row'}}>
                <Image source={{uri:cart.picture,width:75,height:65}}></Image>
                <View style={{flex:1,marginLeft:10,justifyContent:'space-between'}}>
                  <Text style={{color:'#ababab'}}>{cart.houseName}</Text>
                  <Text style={{color:'#ababab'}}>{cart.inTime.split(' ')[0]+' '+cart.leaveTime.split(' ')[0]+' 共'+cart.inDays+'晚'}</Text>
                  <Text style={{color:'#ffb354'}}>¥{cart.price}</Text>
                </View>
              </View>
            </CheckboxItem>
        )
  }
  renderHiddenItem(data, rowMap) {
    return (
      <TouchableOpacity 
       key={data.id}
       onPress={()=>this.delete(data.id)}
       style={{height:'100%',backgroundColor: '#ffb354',justifyContent:'center'}}>
                <Text style={{color:'#fff',textAlign: 'right',fontSize:16,paddingRight:10}}>删除</Text>
       </TouchableOpacity>
    )
  }
  delete(id) {
    this.props.shopCardel({cartIds:id})
  }
  calculate() {
    if(this.props.user.token)
    this.props.navigation.navigate('OrderDetail')
  }
  renderFooter() {
    return (
        <View style={styles.fix_bottom}>
            <Checkbox checked={this.props.shopcar.allChecked} onChange={(e)=>this.selectAll(e)}>全选</Checkbox>
            <TouchableHighlight onPress={()=>this.calculate()}>
              <Text style={styles.calcu_btn}>结算</Text>
            </TouchableHighlight>
        </View>
    )
  }
  render() {
    return ( 
      <View style={{flex:1}}>
        <ListView
          stickySectionHeadersEnabled={false}
          renderSectionHeader={this.renderSectionHeader}
          dataSource={this.state.dataSource.cloneWithRowsAndSections(this.props.shopcar.shopCarList)}
          renderRow={this.renderRow}
        >
        </ListView>
        {this.renderFooter()}
      </View>
   )
  }
 }
 
 const styles = StyleSheet.create({
   fix_bottom: {
    flexDirection:'row',
    height:45,
    paddingLeft:10,
    justifyContent:'space-between',
    position:'absolute',
    bottom:0,
    left:0,
    right:0,
    backgroundColor: '#fff',
   },
   calcu_btn: {
     height:45,
     width:75,
     lineHeight: 45,
     backgroundColor: '#ffb354',
     textAlign: 'center',
     color: '#FFFFFF'
   }
 })
 export default ShopCarPage

 