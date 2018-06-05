import React from 'react'
import { 
  View,
  Text,
  Image,
  StyleSheet,
 } from 'react-native'
import { Button } from 'antd-mobile'
import { connect } from 'react-redux'
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import ImageSlider from 'react-native-image-slider'
import { hotelRoomDetail,selectDays } from '../../reducers/hotel.redux'
import { addshopCar } from '../../reducers/shopcar.redux'
import ViewUtils from '../../utils/viewUtils'
import { dateFormat } from '../../utils/fnUtils'
import { isIphoneX } from '../../utils/fnUtils'

const _isIphoneX = isIphoneX()
 @connect(
   state=>({hotel: state.hotel,user: state.user}),
   { hotelRoomDetail,selectDays,addshopCar }
 )
 class HotelRoomDetailPage extends React.Component {
   constructor() {
     super()
     this.goBack = this.goBack.bind(this)
     this.share = this.share.bind(this)
     this.submit = this.submit.bind(this)
   }
   componentDidMount() {
     this.props.hotelRoomDetail(this.props.navigation.state.params)
     this.props.selectDays({selectDaysObj:null})
   }
   goBack() {
    this.props.navigation.goBack()
   }
   share() {}
   roomDetailRender() {
    const roomDetail = this.props.hotel.hotelRoomDetail
     return (
      <View style={{padding:10,paddingBottom: 0}}>
        <Text style={styles.title}>房间详情</Text>
        <View style={styles.item}>
          <Text style={styles.text}>可租房态</Text>
          <Text style={[styles.text,{color: '#ffb354'}]} onPress={()=>this.props.navigation.navigate('RoomDateSelect',{houseId:roomDetail.id,defaultPrice:roomDetail.defaultPrice})}>查看日历</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.text}>押金</Text>
          <Text>{roomDetail.depositFee}</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.text}>接待时间</Text>
          <Text>{roomDetail.receptionTimeStr}</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.text}>入住时间</Text>
          <Text>{roomDetail.inTime}以后</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.text}>退房时间</Text>
          <Text>{roomDetail.leaveTime}之前</Text>
        </View>
    </View>
     )
   }
   assortsRender() {
    const assortArr = this.props.hotel.hotelRoomDetail.assort.split(',')
    return (
     <View style={{padding:10,paddingBottom: 0}}>
       <Text style={styles.title}>房间设施</Text>
       <View style={{flexDirection:'row',flexWrap:'wrap',justifyContent:'space-between'}}>
       {assortArr.map(assort=>{
        const index = assort.indexOf('-')
        const title = assort.slice(0,index)
        const img = assort.slice(index+1)
        return (
         <View key={assort} style={{flexDirection:'row'}}>
             <View style={{flexDirection:'row',alignItems: 'center',padding:10}}>
               <Image source={{uri:img,width:22,height:22}}></Image>
               <Text style={{marginLeft:10,color:'#616161'}}>{title}</Text>
             </View>
         </View>
        )
       })}
       </View>
    </View>
    )
   }
   submit() {
    if(this.props.user.token) {
      const roomDetail = this.props.hotel.hotelRoomDetail
      if(this.props.hotel.selectDaysObj) {
        this.props.addshopCar({houseId:roomDetail.id,inTime:dateFormat(this.props.hotel.selectDaysObj.startDateStr)+' 00:00:00',leaveTime:dateFormat(this.props.hotel.selectDaysObj.endDateStr)+' 00:00:00'},this.props.navigation)
      }else {
        this.props.navigation.navigate('RoomDateSelect',{houseId:roomDetail.id,defaultPrice:roomDetail.defaultPrice})
      }
     }else{
       this.props.navigation.navigate('Login')
     }
    
   }
   render() {
     const roomDetail = this.props.hotel.hotelRoomDetail
     return (
       <View style={{flex:1}}>
         {roomDetail?
           <View style={{flex:1}}>
            <ParallaxScrollView
              stickyHeaderHeight={ STICKY_HEADER_HEIGHT }
              parallaxHeaderHeight={ PARALLAX_HEADER_HEIGHT }
              backgroundSpeed={10}
              backgroundColor='#fff'
              renderBackground={() => (
                <View key="background" style={{height:220}}>
                  <ImageSlider images={roomDetail.housePictures} />
                </View>
              )}
              renderForeground={() => (
                <View key="parallax-header" style={ styles.parallaxHeader }>
                  <View style={{flexDirection:'row',flex:1}}>
                    
                  </View> 
                  <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <Text style={{color: '#FFFFFF'}}>
                    {roomDetail.name}
                    </Text>
                  </View>     
                </View>
              )}
              renderStickyHeader={() => (
                <View key="sticky-header" style={styles.stickySection}>
                  
                </View>
              )}
              renderFixedHeader={()=>(
                <View key="sticky-header" style={styles.fixedSection}>
                  {ViewUtils.hotelDeitalHeader({goBack:this.goBack,share:this.share},this.props.hotel.hotelDetail.whetherCollect)}
                </View>
              )}
             >
              <View style={{height:5,backgroundColor: '#f6f6f6'}}></View>
              {this.roomDetailRender()}
              <View style={{height:5,backgroundColor: '#f6f6f6'}}></View>
              {this.assortsRender()}
             </ParallaxScrollView>
            <Button style={{marginBottom:_isIphoneX?30:0}} type='primary' onClick={this.submit}>加入购物车</Button>
           </View>
            :null}
          
       </View>
     
     )
   }
 }
 
const ROW_HEIGHT = 50;
const PARALLAX_HEADER_HEIGHT = 200;
const STICKY_HEADER_HEIGHT = _isIphoneX?70:50;

const styles = StyleSheet.create({
  parallaxHeader: {
    padding:10,
    flex: 1,
    height:PARALLAX_HEADER_HEIGHT,
    flexDirection:'column',
    justifyContent:'space-between'
  },
  stickySection: {
    height: STICKY_HEADER_HEIGHT,
    padding: 10,
    paddingTop: 15,
    borderBottomWidth:.5,
    borderColor:'#d8d8d8',
  },
  fixedSection: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    paddingRight: 8,
    paddingTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
},
  title: {
    fontSize: 16,
    textAlign: 'center'
  },
  item: {
    flexDirection:'row',
    justifyContent:'space-between',
    height:40,
    borderBottomWidth:0.5,
    borderColor:'#d8d8d8',
    alignItems: 'center'
  },
  text:{
    color: '#616161'
  }
})

 export default HotelRoomDetailPage