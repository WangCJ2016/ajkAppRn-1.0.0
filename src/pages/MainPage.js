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
       <View style={{height:155,marginTop:70,borderRadius:3,overflow:'hidden',marginLeft:15, marginRight:15,}}>
        <ImageSlider
          height={220}
          images={arr}
          onPress={(e)=>{this.props.navigation.navigate('HotelDetail',{id:this.props.main.level0Banners[e.index].hotelId})}}
        />
       </View>
     )
   }
   mainBtnsRender() {
     return <ScrollView  
        showsHorizontalScrollIndicator={false} 
        horizontal={true}  
        contentContainerStyle={styles.main_btns}>
      <TouchableOpacity 
      onPress={()=> this.loginVertify(()=>this.props.navigation.navigate('LandlordHousesResource'))}
      style={styles.btn_wrap}>
        <Image source={require('../assets/images/fd.png')}></Image>
        <Text style={styles.btn_text}>房东招募</Text>
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
        <Text style={styles.btn_text}>长租房源</Text>
      </TouchableOpacity>
      <TouchableOpacity 
      onPress={()=> this.loginVertify(()=>this.props.navigation.navigate('MyFavourite'))}
      style={styles.btn_wrap}
      >
        <Image source={require('../assets/images/favourite-icon.png')}></Image>
        <Text style={styles.btn_text}>我的收藏</Text>
      </TouchableOpacity>
      <TouchableOpacity 
      onPress={this.netWorkInfo}
      style={styles.btn_wrap}>
        <Image source={require('../assets/images/more-icon.png')}></Image>
        <Text style={styles.btn_text}>敬请期待</Text>
      </TouchableOpacity>
    </ScrollView>
   }
   hotCity() {
     return (
       <View style={{marginTop: 25,marginLeft:15}}>
         <Text style={{fontSize:20,fontWeight:'bold',color:'#343434'}}>热门城市</Text>
         <View style={{flexDirection:'row',marginTop:12}}>
           <Text style={{marginRight:10}}>北京</Text>
           <Text style={{marginRight:10}}>上海</Text>
           <Text style={{marginRight:10}}>广州</Text>
           <Text style={{marginRight:10}}>深圳</Text>
           <Text style={{marginRight:10}}>杭州</Text>
         </View>
       </View>
     )
   }
   level1BannerRender() {
    return this.props.main.level1Banners.map(item=>(
      <TouchableWithoutFeedback 
        key={item.id}
        onPress={()=>this.props.navigation.navigate('HotelDetail',{id:item.hotelId})}>
        <View style={{height:150}} >
          <Image style={styles.banner_image} source={{uri:item.picture}}></Image>
          <View>
            <Text style={styles.banner_text}><Text style={{color:'#FF7E2D'}}>¥</Text><Text style={{color:'#1C76F9'}}>850</Text><Text>&nbsp;</Text><Text>{item.title}</Text></Text>
            <View style={{flexDirection:'row',alignItems:'center',marginTop:3}}>
              <Image style={{marginRight:5}} source={require('../assets/images/loc.png')}></Image>
              <Text>杭州/333评价/<Text style={{color:'#FF7E2D'}}>9.0分</Text></Text>
            </View>
          </View>
          
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
       <View style={{flex:1,backgroundColor:'#fff'}}>
          <View style={styles.fix_top}>
            <Image style={{marginTop:20}} source={require('../assets/images/header_logo.png')}></Image>
               <TouchableWithoutFeedback onPress={()=>this.props.navigation.navigate('SearchSet')}>
                  <View style={{
                    flex:1,
                    marginLeft:12,
                    marginTop:20,
                    height:30,
                    borderWidth:0.5,
                    borderRadius:3,
                    borderColor:'#FF7E2D',
                    shadowOffset: {width: 0, height: 0},
                    shadowColor: '#ccc',
                    shadowOpacity: 1,
                    shadowRadius: 10,
                    backgroundColor:'#fff'
                  }}>
                    <Text style={{lineHeight: 30,fontSize:18,marginLeft:10,color:'#bbb'}}>搜索目的地</Text>
                  </View>
                </TouchableWithoutFeedback>  
          </View>
         
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
            {this.hotCity()}
            {
              this.state.netIf?
              <View>
                <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={{height: 170,marginTop:22,marginLeft:15}}>
                {this.level1BannerRender()}
                </ScrollView>
                {
                  this.props.main.homeHotels.length>0?
                  <FlatList
                    style={{marginTop: 20}}
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
    marginTop:11,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft:15,
    paddingBottom: 15
   },
   btn_wrap: {
     marginRight:5,
     backgroundColor:'#fff',
     paddingBottom:10,
     borderRadius:3,
     shadowOffset: {width: 0, height: 0},
    shadowColor: '#ccc',
    shadowOpacity: 1,
    shadowRadius: 10
   },
   btn_text:{
    marginTop:5,color: '#616161',fontSize:15,color:'#333',fontWeight:'bold'
   },
   banner_image: {
     width:170,
     height: 110,
     borderRadius:5,
     marginRight: 5,
   },
   banner_text:{
     fontSize:14,
     marginTop:5
   },
   fix_top:{
    position:'absolute',
    height:64,
    width:'100%',
    zIndex:1,
    paddingLeft: 15,
    paddingRight: 15,
    flexDirection:'row',
    alignItems:'center',
    backgroundColor:'#fff',
    justifyContent:'center'
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