import React from 'react'
import { 
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity
 } from 'react-native'
import { Button } from 'antd-mobile'
import { connect } from 'react-redux'
import { checkHouseWhetherReserve,submitOrder } from '../../reducers/shopcar.redux'
import ParallaxScrollView from 'react-native-parallax-scroll-view'
import InphoneXHoc from '../../hoc/inphoneXhoc'


@connect(
  state => ({shopcar: state.order}),
  { checkHouseWhetherReserve,submitOrder }
)
 class OrderDetailPage extends React.Component {
   constructor() {
     super()
     this.goPay = this.goPay.bind(this)
   }
   houseRender() {
     const shopCarList = this.props.shopcar.shopCarList
     const lists = shopCarList.map(hotel=>{
       return {[Object.keys(hotel)[0]]:Object.values(hotel)[0].filter(house => house.checked)}
     }).filter((hotel)=>Object.values(hotel)[0].length>0)
     return lists.map(hotel=>{
       return (
         <View key={Object.keys(hotel)[0]} style={{marginTop:5}}>
           <View style={{flexDirection:'row'}}>
             <Image style={{tintColor:'#fff'}} source={require('../../assets/images/loc_icon.png')}></Image>
             <Text style={{color:'#fff',marginLeft:10}}>{Object.keys(hotel)[0]}</Text>
           </View>
           <View style={{flexDirection:'row',flexWrap:'wrap',justifyContent:'space-between',padding:3}}>
             {
              Object.values(hotel)[0].map(house => {
                 return (
                  house.checked?(<View key={house.id} style={styles.view}>
                      <Text style={styles.text}>{house.inTime.split(' ')[0].slice(5)+' '+house.leaveTime.split(' ')[0].slice(5)}</Text>
                      <Text style={styles.text}>{house.houseName}</Text>
                      <Text style={styles.text}>{'共'+house.inDays+'晚'}</Text>
                  </View>):null
                 )
               })
             }
           </View>
         </View>
       )
     })
   }
   moneyTotal() {
     let num = 0
    const shopCarList = this.props.shopcar.shopCarList
     shopCarList.forEach(hotel=>{
      Object.values(hotel)[0].forEach(house => {
           if(house.checked) {
             num+=parseFloat(house.totalFeel)
           }
        })
    })
    return num
   }
   goPay(){
    let houseIds = []
    let inTimes = []
    let leaveTimes = []
    let hotelIds = []
    let totalFees = []
    let depositFees = []
    const lists = this.props.shopcar.shopCarList
    lists.forEach(hotel => {
      Object.values(hotel)[0].forEach(house => {
        if(house.checked) {
          houseIds = [...houseIds,house.houseId]
          inTimes = [...inTimes,house.inTime]
          leaveTimes = [...leaveTimes,house.leaveTime]
          totalFees = [...totalFees,house.totalFeel]
          depositFees = [...depositFees,house.depositFee]
          hotelIds = [...hotelIds,house.hotelId]
        }
      })
    })
    this.props.checkHouseWhetherReserve({
      houseIds: houseIds.join(','),
      inTimes: inTimes.join(','),
      leaveTimes: leaveTimes.join(',')
    },{
      houseIds: houseIds.join(','),
      inTimes: inTimes.join(','),
      leaveTimes: leaveTimes.join(','),
      totalFees: totalFees.join(','),
      depositFees: depositFees.join(','),
      hotelIds: hotelIds.join(',')
    })
   }
   render() {
     return (
       <View style={{flex:1}}>
            <ParallaxScrollView
              stickyHeaderHeight={ STICKY_HEADER_HEIGHT }
              parallaxHeaderHeight={ PARALLAX_HEADER_HEIGHT }
              backgroundSpeed={10}
              backgroundColor='#fff'
              renderBackground={() => (
                <View key="background" style={{height:250}}>
                  <Image style={{width:'100%',height:250}} resizeMode='cover' source={require('../../assets/images/hotelpic.png')}></Image>
                </View>
              )}
              renderForeground={() => (
                <View key="parallax-header" style={ styles.parallaxHeader }>
                  
                  <View style={{flex:1,marginTop:40}}>
                    <ScrollView>
                      {this.houseRender()}
                    </ScrollView>  
                  </View>
                </View>
              )}
              renderStickyHeader={()=>(
                <View key="sticky-header" style={styles.stickySection}>
                    
                </View>
              )}
              renderFixedHeader={()=>(
                <View style={[styles.fixedSection,{flexDirection:'row',marginTop:20}]}>
                  <TouchableOpacity 
                  onPress={()=>this.props.navigation.goBack()} >
                    <Image style={{tintColor:'#333'}}  source={require('../../assets/images/left_arr_icon.png')}></Image>
                  </TouchableOpacity>
                  <Text  style={{flex:1,textAlign: 'center',color:'#333',fontSize:20}}>订单详情</Text>
              </View> 
              )}
            >
            <View style={{marginTop:30,padding:10}}>
              <Text style={{textAlign: 'center',color:'#000',fontSize:16}}>订单政策</Text>
              <View style={styles.rule_wrap}>
                  <Text style={[styles.rule_text,{color:'#456eb5'}]}>免费取消 全额退款</Text>
                  <Text style={styles.rule_text}>最晚取消时间：1月19日 18:00前,逾时无法取消和退款。</Text>
                  <Text style={styles.rule_text}>预定超过3间时，需在1小时内在线支付房费。入住日前一天中午12：00前可免费取消全额退款，晚于该时间段不可取消，并且无法退款。</Text>
              </View>
            </View>
            
            </ParallaxScrollView>
            <View style={styles.pay_wrap}>
                <View style={{flexDirection:'row',alignItems:'center',marginLeft:10}}>
                  <Text>合计</Text>
                  <Text style={{color:'#ffb354'}}>¥{this.moneyTotal()}</Text>
                </View>
                <TouchableHighlight onPress={this.goPay}>
                  <Text style={styles.pay_btn}>去支付</Text>
                </TouchableHighlight>
            </View>
       </View>
    
     )
   }
 }
 
 const ROW_HEIGHT = 70;
const PARALLAX_HEADER_HEIGHT = 250;
const STICKY_HEADER_HEIGHT = 70;


const styles = StyleSheet.create({
  parallaxHeader: {
    padding:10,
    flex: 1,
    height:PARALLAX_HEADER_HEIGHT,
    flexDirection:'column',
    justifyContent:'space-between'
  },
  fixedSection: {
    position: 'absolute',
    left: 10,
    right: 0,
    top: 0,
    bottom: 10,
    paddingRight: 8,
    paddingTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
},
  stickySection: {
    height: STICKY_HEADER_HEIGHT,
    padding: 10,
    paddingTop: 15,
    borderBottomWidth:.5,
    borderColor:'#d8d8d8',
  },
  view: {
    width: '45%',
    borderWidth: 0.5,
    borderColor: '#FFFFFF',
    padding:5,
    borderRadius: 3,
    marginTop:5
  },
  text: {
    textAlign:'center',
    color:'#fff'
  },
  rule_wrap: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#ccc',
    padding:5,
    marginTop:5
  },
  rule_text:{
    fontSize:12,
    color:'#616161',
    marginBottom: 5
  },
  pay_wrap:{
    flexDirection:'row',
    justifyContent:'space-between',
    position: 'absolute',
    bottom:0,
    left:0,
    right:0,
    borderWidth:0.5,
    borderColor: '#d8d8d8',
    height:45
  },
  pay_btn:{
    width:75,
    height:45,
    backgroundColor: '#ffb354',
    color:'#fff',
    textAlign: 'center',
    lineHeight: 45
  }
})
 export default OrderDetailPage