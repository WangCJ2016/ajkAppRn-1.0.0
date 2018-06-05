import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  PixelRatio,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  ActionSheetIOS
} from 'react-native';


import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { hotelDetail,hotelRoomList,scrollHeight,collection,cancelCollection } from '../../reducers/hotel.redux'
import { connect } from 'react-redux'
import ScrollableTabView,{ScrollableTabBar} from 'react-native-scrollable-tab-view'
import HotelDeitalCom from '../../components/hotelDetailComponent'
import HotelRoomsCom from '../../components/hotelRoomsCom'
import StarsComponent from '../../components/starsComponent'
import ViewUtils from '../../utils/viewUtils'
import * as wechat from 'react-native-wechat'
import { isIphoneX } from '../../utils/fnUtils'
 

const BUTTONS = [
  '微信好友',
  '朋友圈',
  '取消'
];
const CANCEL_INDEX = 2;

const HEIGHT =  Dimensions.get('window').height


@connect(
  state=>({hotel: state.hotel}),
  {hotelDetail,hotelRoomList,scrollHeight,collection,cancelCollection} 
)
class HotelDetailPage extends Component {
  constructor(props) {
    super(props);
    this.onChangeTab = this.onChangeTab.bind(this)
    this.goBack = this.goBack.bind(this)
    this.collect = this.collect.bind(this)
    this.share = this.share.bind(this)
  }
  componentDidMount() {
    this.props.hotelDetail({hotelId: this.props.navigation.state.params.id})
  }
  onChangeTab(data) {
    if(data.i===1&&this.props.hotel.pageNo===0) {
      this.props.hotelRoomList({pageNo:1,pageSize:10,hotelId: this.props.navigation.state.params.id},'load')
    }
  }
  onScroll(e) {
    if(e.nativeEvent.contentOffset.y>=0&&e.nativeEvent.contentOffset.y<=(PARALLAX_HEADER_HEIGHT-STICKY_HEADER_HEIGHT)) {
      this.props.scrollHeight({scrollHeight:e.nativeEvent.contentOffset.y})
    }
    //this.props.scrollHeight({scrollHeight:e.nativeEvent.contentOffset.y})
  }
  goBack() {
    this.props.navigation.goBack()
  }
  collect() {
    const hotelDetail = this.props.hotel.hotelDetail
    hotelDetail.whetherCollect?
    this.props.cancelCollection({collectId:hotelDetail.collectId})
    :this.props.collection({hotelId: hotelDetail.id})
  }
  share() {
    ActionSheetIOS.showActionSheetWithOptions({
      options: BUTTONS,
      cancelButtonIndex: CANCEL_INDEX,
    },
    (buttonIndex) => {
      const hotelDetail = this.props.hotel.hotelDetail
      if(buttonIndex===1) {
        wechat.shareToTimeline({
          type: 'news',
          title: hotelDetail.name,
          description: hotelDetail.profiles,
          thumbImage:  hotelDetail.pictures[0].pictures.split(',')[0],
          webpageUrl:'http://www.live-ctrl.com/www/#/houseDtail/'+hotelDetail.id
        })
      }
      if(buttonIndex===0) {
        wechat.shareToSession({
          type: 'news',
          title: hotelDetail.name,
          description: hotelDetail.profiles,
          thumbImage:  hotelDetail.pictures[0].pictures.split(',')[0],
          webpageUrl:'http://www.live-ctrl.com/www/#/houseDtail/'+hotelDetail.id
        })
      }
    });
  }
  render() {
    const hotelDetail = this.props.hotel.hotelDetail
    return (
      <View style={{flex:1}}>
        {hotelDetail?<ParallaxScrollView
              onScroll={this.onScroll.bind(this)}
              style={{height:HEIGHT}}
              backgroundColor="#fff"
              stickyHeaderHeight={ STICKY_HEADER_HEIGHT }
              parallaxHeaderHeight={ PARALLAX_HEADER_HEIGHT }
              backgroundSpeed={10}
             
              renderBackground={() => (
                <View key="background">
                  <Image source={{uri: hotelDetail.pictures[0].pictures.split(',')[0],
                                  width: window.width,
                                  height: PARALLAX_HEADER_HEIGHT}}/>
          
                </View>
              )}
              renderStickyHeader={() => (
                <View key="sticky-header" style={styles.stickySection}>
                    
                </View>
            )}
              renderForeground={() => (
                <TouchableWithoutFeedback onPress={()=>this.props.navigation.navigate('HotelPic',{picArr:hotelDetail.pictures})}>
                <View key="parallax-header" style={ styles.parallaxHeader }>
                  <View style={{flexDirection:'row',flex:1,marginTop:10}}>
                    
                  </View> 
                  <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <Text style={{color: '#FFFFFF'}}>
                    {hotelDetail.name}
                    </Text>
                    <Text style={{color: '#FFFFFF'}}>
                      {hotelDetail.pictures.length}张
                    </Text>
                  </View>     
                </View>
               </TouchableWithoutFeedback>
              )}

              renderFixedHeader={() => (
                <View key="sticky-header" style={styles.fixedSection}>
                  {ViewUtils.hotelDeitalHeader({goBack:this.goBack,collect:this.collect,share:this.share},this.props.hotel.hotelDetail.whetherCollect)}
                </View>
              )}
             
            >
            
              <ScrollableTabView
                 style={{flex:1}}
                  tabBarUnderlineStyle={{backgroundColor: '#ffb354', height: 2}}
                  tabBarInactiveTextColor='mintcream'
                  tabBarActiveTextColor='#ffb354'
                  tabBarInactiveTextColor='#333'
                  tabBarTextStyle={{fontSize:16}}
                  ref="scrollableTabView"
                  tabBarBackgroundColor="#fff"
                  initialPage={0}
                  onChangeTab={this.onChangeTab.bind(this)}
                  renderTabBar={() => <ScrollableTabBar 
                    tabImageArr={[require('../../assets/images/hotel_detail_icon.png'),require('../../assets/images/hotel_type_icon.png')]}
                    style={{height: 50, borderWidth: 0.5, elevation: 2}}
                                                        />}
              >
                <HotelDeitalCom tabLabel="酒店详情" data={hotelDetail} scrollHeight={this.props.hotel.scrollHeight}/>
                <HotelRoomsCom tabLabel="房间类型" data={hotelDetail} scrollHeight={this.props.hotel.scrollHeight} />
              </ScrollableTabView>
            </ParallaxScrollView>:null}
           
        </View>
    );
  }
}

const window = Dimensions.get('window');

const ROW_HEIGHT = 50;
const PARALLAX_HEADER_HEIGHT = 200;
const STICKY_HEADER_HEIGHT = isIphoneX()?70:50;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: window.width,
    height: PARALLAX_HEADER_HEIGHT
  },
  stickySection: {
    height: STICKY_HEADER_HEIGHT,
    padding: 10,
    paddingTop: 15,
    borderBottomWidth:.5,
    borderColor:'#d8d8d8',
  },
  stickySectionText: {
    color: 'white',
    fontSize: 20,
    margin: 10
  },
  fixedSection: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    paddingRight: 8,
    paddingTop: isIphoneX()?35:15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
},
  fixedSectionText: {
    color: '#999',
    fontSize: 20
  },
  parallaxHeader: {
    padding:10,
    flex: 1,
    height:PARALLAX_HEADER_HEIGHT,
    flexDirection:'column',
    justifyContent:'space-between'
  },

  sectionSpeakerText: {
    color: 'white',
    fontSize: 24,
    paddingVertical: 5
  },
  sectionTitleText: {
    color: 'white',
    fontSize: 18,
    paddingVertical: 5
  },
  row: {
    overflow: 'hidden',
    paddingHorizontal: 10,
    height: ROW_HEIGHT,
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderBottomWidth: 1,
    justifyContent: 'center'
  },
  rowText: {
    fontSize: 20
  }
});

export default HotelDetailPage;