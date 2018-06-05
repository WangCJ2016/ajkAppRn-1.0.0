import React from 'react'
import { 
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  FlatList,
  Animated,
  RefreshControl,
  ActivityIndicator,
  TouchableWithoutFeedback,
  TouchableOpacity,
  NetInfo,
  SafeAreaView
 } from 'react-native'
 import { connect } from 'react-redux'
 import { Button } from 'antd-mobile'
 import { homeBanner, homeHotelPage } from '../reducers/main.redux'
 import { gpsConvert,dataSuccess } from '../reducers/map.redux'
 import { getInfo } from '../reducers/user.redux'
 import ImageSlider from 'react-native-image-slider'
 import ViewUtils from '../utils/viewUtils'
 import * as wechat from 'react-native-wechat'
 import { isIphoneX } from '../utils/fnUtils'
 import SplashScreen from 'react-native-splash-screen'
 var Geolocation = require('Geolocation');

 
 @connect(
   state=>({main: state.main,map:state.map,user: state.user}),
   {
    homeBanner,homeHotelPage,gpsConvert,dataSuccess,getInfo
   }
 )
 class MainPage extends React.Component {
   constructor() {
      super()
      this.state = {
        xTop: new Animated.Value(0.0),
        loadMore: false,
        netIf: false
      }
    }
   componentDidMount() {
     SplashScreen.hide()
     this.netWorkInfo()
     NetInfo.isConnected.addEventListener(
      'connectionChange',
      this.handleFirstConnectivityChange
    );
   }
   componentWillReceiveProps(nextProps) {
     if(nextProps.map.city!==this.props.map.city) {
      this.props.homeBanner({
        level:0
      })
      this.props.homeBanner({
       level:1
     })
     this.props.homeHotelPage({
       pageNo: 1,
       pageSize: 5,
       address: encodeURI(nextProps.map.city?nextProps.map.city:'杭州市')
     })
     }
   }
   componentWillUnMount() {
     NetInfo.removeEventListener('change', this.handleConnectivityChange);
   }

   handleFirstConnectivityChange(isConnected) {
     NetInfo.isConnected.removeEventListener(
       'connectionChange',
       this.handleFirstConnectivityChange
     );
   }
   netWorkInfo = () => {
     NetInfo.getConnectionInfo().then((connectionInfo) => {
       if(connectionInfo.type !== 'none' ) {
          this.setState({
            netIf: true
          })
          this.props.getInfo()
          this.props.homeBanner({
            level:0
          })
          this.props.homeBanner({
          level:1
          })
          this.props.homeHotelPage({
            pageNo: 1,
            pageSize: 5,
            address: encodeURI('杭州市')
          })
         wechat.registerApp('wxd95f6c725d62cb33')
         Geolocation.getCurrentPosition(location=>{
          var result = "速度：" + location.coords.speed +
                "\n经度：" + location.coords.longitude +
                "\n纬度：" + location.coords.latitude +
                "\n准确度：" + location.coords.accuracy +
                "\n行进方向：" + location.coords.heading +
                "\n海拔：" + location.coords.altitude +
                "\n海拔准确度：" + location.coords.altitudeAccuracy +
                "\n时间戳：" + location.timestamp;
          this.props.gpsConvert({locations:location.coords.longitude+','+location.coords.latitude})
        })
       } else {
         this.setState({
           netIf: false
         })
       }
     });
   }
   imageSilderRender() {
     const arr = this.props.main.level0Banners.map(item=>item.picture)
     return (
       <View style={{height:220}}>
        <ImageSlider
          height={220}
          images={arr}
          onPress={(e)=>{this.props.navigation.navigate('HotelDetail',{id:this.props.main.level0Banners[e.index].hotelId})}}
        />
       </View>
     )
   }
   mainBtnsRender() {
     return <View style={styles.main_btns}>
      <TouchableOpacity 
      onPress={()=> this.loginVertify(()=>this.props.navigation.navigate('LandlordHousesResource'))}
      style={styles.btn_wrap}>
        <Image source={require('../assets/images/fd.png')}></Image>
        <Text style={{marginTop:10,color: '#616161'}}>房东招募</Text>
      </TouchableOpacity>
      <TouchableOpacity 
      onPress={()=>{
        this.props.dataSuccess({searchInfo:{
          ...this.props.map.searchInfo,
          address: encodeURI('杭州'), //this.props.map.city.name
          type: '长租',
         }})
        this.props.navigation.navigate('NearbySearch')
      }}
      style={styles.btn_wrap}>
        <Image source={require('../assets/images/cz.png')}></Image>
        <Text style={{marginTop:10,color: '#616161'}}>长租房源</Text>
      </TouchableOpacity>
      <TouchableOpacity 
      onPress={()=> this.loginVertify(()=>this.props.navigation.navigate('MyFavourite'))}
      style={styles.btn_wrap}
      >
        <Image source={require('../assets/images/favourite-icon.png')}></Image>
        <Text style={{marginTop:10,color: '#616161'}}>我的收藏</Text>
      </TouchableOpacity>
      <TouchableOpacity 
      onPress={this.netWorkInfo}
      style={styles.btn_wrap}>
        <Image source={require('../assets/images/more-icon.png')}></Image>
        <Text style={{marginTop:10,color: '#616161'}}>敬请期待</Text>
      </TouchableOpacity>
    </View>
   }
   level1BannerRender() {
    return this.props.main.level1Banners.map(item=>(
      <TouchableWithoutFeedback 
        key={item.id}
        onPress={()=>this.props.navigation.navigate('HotelDetail',{id:item.hotelId})}>
        <View style={{height:150}} >
          <Image style={styles.banner_image} source={{uri:item.picture}}></Image>
          <Text style={styles.banner_text}>{item.title}</Text>
        </View>
      </TouchableWithoutFeedback>
    ))
    
   }
   renderRow(data) {
      return  (
        ViewUtils.homehotelCell(data.item,this.props.navigation)
      )
   }
   refreshData() {
    this.props.homeHotelPage({
      pageNo: 1,
      pageSize: 5,
      address: encodeURI('杭州市')
    },'refresh')
   }
   loadMoreData(event) {
    if(this.props.main.loadmore){
      return
    }
    let y = event.nativeEvent.contentOffset.y
    let height = event.nativeEvent.layoutMeasurement.height
    let contentHeight = event.nativeEvent.contentSize.height
    if(y+height>=contentHeight){
      if(this.props.main.pageNo+1<=this.props.main.totalPages) {
        this.props.homeHotelPage({
          pageNo: this.props.main.pageNo+1,
          pageSize: 5,
          address: encodeURI('杭州市')
        },'load')
      }
    }
   }
   loginVertify= (cb) => {
     if(this.props.user.token) {
      cb()
     }else{
       this.props.navigation.navigate('Login')
     }
   }
   render() {
     
     return (
      
       <View style={{flex:1}}>
          <Animated.View style={[styles.fix_top,{
            opacity:this.state.xTop.interpolate({
              inputRange: [0,200],
              outputRange: [1.0, 0.0]
            })}]}>
              <View style={{flexDirection:'row',padding:10}}>
                <View style={{flex:1,height:30,borderRadius:5}}>
                  <Text onPress={()=>this.props.navigation.navigate('SearchSet')} style={styles.fix_top_text}>  搜索目的、商圈、生活圈</Text>
                </View>
              </View>
          </Animated.View>
          <Animated.View style={[styles.fix_top,{
            backgroundColor: '#FFFFFF',
            opacity:this.state.xTop.interpolate({
              inputRange: [0,200],
              outputRange: [0.0, 1.0]
            })}]}>
              <View style={{flexDirection:'row',padding:10}}>
                <View style={{flex:1,height:30,borderRadius:5}}>
                  <Text onPress={()=>this.props.navigation.navigate('SearchSet')} style={[styles.fix_top_text,{backgroundColor: '#ccc',color:'#fff'}]}>  搜索目的、商圈、生活圈</Text>
                </View>
              </View>
          </Animated.View>
          {/* 
          <View style={styles.fix_top}>
            <Image source={require('../assets/images/header_logo.png')}></Image>
          </View>
          */}
          <ScrollView 
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {y: this.state.xTop}}}],
              {listener: (event) => this.loadMoreData(event)}
              )}
            scrollEventThrottle={100}
            refreshControl={
              <RefreshControl
                titleColor='#ccc'
                colors={['#ccc']}
                refreshing={this.props.main.refreshLoad}
                onRefresh={()=>this.refreshData()}
                tintColor='#ccc'
            />}
          >
            {this.imageSilderRender()}
            {this.mainBtnsRender()}
            {
              this.state.netIf?
              <View>
                <ScrollView horizontal={true} style={{height: 150}}>
                {this.level1BannerRender()}
                </ScrollView>
                {
                  this.props.main.homeHotels.length>0?
                  <FlatList
                    data={this.props.main.homeHotels}
                    renderItem={(data)=>this.renderRow(data)}
                    keyExtractor={(item, index) => item.id}
                    getItemLayout={(data, index) => (
                      {length: 130.5, offset: 130.5 * index, index}
                    )}
                    ListFooterComponent={<ActivityIndicator
                      animating={this.props.main.loadmore}
                    />}
                  />:null
                }
              </View>:
              <View style={{flex:1,justifyContent:'center',alignItems:'center',marginTop:60}}>
                 <Text style={{fontSize:16}}>网络未连接，请检查网络设置</Text>
                 <Button type='ghost' onClick={this.netWorkInfo} style={{marginTop:10}}>刷新重试</Button>
              </View>
            }
            </ScrollView>
        </View>
  
     )
   }
 }
 const styles = StyleSheet.create({
   container: {
     flex:1,
     backgroundColor: '#f6f6f6'
   },
   main_btns: {
    padding:10,
    marginTop:15,
    flexDirection: 'row',
    justifyContent: 'space-between'
   },
   btn_wrap: {
     alignItems: 'center'
   },
   banner_image: {
     width:215,
     height: 120,
     borderRadius:5,
     marginRight: 10
   },
   banner_text:{
     textAlign: 'center',
     marginTop:5
   },
   fix_top:{
    position:'absolute',
    height:88,
    width:'100%',
    zIndex:99999,
    flexDirection:'row',
    alignItems:'center',
    paddingTop: 5
   },
   fix_top_text:{
     marginLeft:10 ,
     backgroundColor: '#FFFFFF',
     color: '#bfbfbf',
     fontSize: 16,
     lineHeight:40,
     height: 40,
     marginTop: isIphoneX()?10:0
   }
 })
 
 export default MainPage