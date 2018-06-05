import React from 'react'
import { 
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableHighlight
 } from 'react-native'
 import RectIconCom from '../components/rectIconCom'
 import { withNavigation} from 'react-navigation'
 const HEIGHT =  Dimensions.get('window').height

 @withNavigation
 class HotelDeitalCom extends React.Component {
   state = {  }
   hotelInfoRender() {
     const hotelDetail = this.props.data
     return (
       <View style={{padding:10}} > 
         <View style={{flexDirection:'row',justifyContent:'space-between'}}>
           <View style={{flexDirection:'row'}}>
           <RectIconCom width={3} height={14} backgroundColor={'#ffb354'} ></RectIconCom>
            <Text>
              酒店简介
            </Text>
           </View> 
            <View>
              <Text style={{color:'#ffb354'}} 
              onPress={()=>this.props.navigation.navigate('HotelInfo',{telephone:hotelDetail.telephone,profiles:hotelDetail.profiles})}>查看全部</Text>
            </View>
         </View>
         <Text numberOfLines={6} ellipsizeMode='tail' style={[styles.text,{marginTop:15}]}>{hotelDetail.profiles}</Text>
       </View>
     )
   }
   hotelDeviceRender() {
     const hotelDetail = this.props.data
     return (
      <View style={{padding:10}}> 
        <View style={{flexDirection:'row'}}>
          <View style={{flexDirection:'row'}}>
          <RectIconCom width={3} height={14} backgroundColor={'#ffb354'} ></RectIconCom>
          <Text>
            酒店设施
          </Text>
          </View> 
        </View>
        <View style={{flexDirection:'row',marginTop:10}}>
          <View style={{flexDirection:'row',flex:1,overflow:'hidden'}}>
            {
              hotelDetail.assorts.map(assort=>{
                const index = assort.indexOf('-')
                const name = assort.slice(0, index)
                const src = assort.slice(index + 1)
                return (
                  <View style={styles.device_item} key={name}> 
                    <Image  source={{uri:src,width:22,height:22}}></Image>
                    <Text numberOfLines={1} style={{marginTop:10,fontSize:12,color: '#616161'}}>{name}</Text>
                </View>
                )
              }
              )
            }
          </View>
          <TouchableHighlight 
          underlayColor={'#ccc'}
          onPress={()=>this.props.navigation.navigate('HotelAssort',{
            assorts: hotelDetail.assorts,
						services: hotelDetail.services,})}
          style={[styles.device_item,{width: '16.7%'}]}>
            <View 
          > 
                <Image  source={require('../assets/images/more_icon.png')}></Image>
                <Text style={{marginTop:10,fontSize:12,color: '#616161'}}>更多</Text>
            </View>
          </TouchableHighlight>
          <View>
          </View>
        </View>
      </View>
     )
   }
   blankRender() {
     return (
       <View style={{backgroundColor: '#f6f6f6',height:5}}></View>
     )
   }
   mapRender() {
    const hotelDetail = this.props.data
     return (
       <View style={{padding:10}}>
          <View style={{height:110}}></View>
          <View style={{flexDirection:'row',alignItems:'center'}}>
            <Image source={require('../assets/images/loc_icon.png')}></Image>
            <Text style={[styles.text,{marginLeft:5}]}  numberOfLines={1} ellipsizeMode='tail'>{hotelDetail.address}</Text>
          </View>
       </View>
     )
   }
   ruleRender() {
    const hotelDetail = this.props.data
    return (
      <View style={{padding:10}}>
        <View style={{flexDirection:'row'}}>
          <RectIconCom width={3} height={14} backgroundColor={'#ffb354'} ></RectIconCom>
          <Text>酒店规则</Text>
        </View>
        <View style={styles.rule}>
          <Text style={styles.text_bg}>押金</Text>
          <Text style={{color: '#ffb354'}}>325元</Text>
        </View>
        <View style={{marginTop:10}}>
          <Text style={styles.text_bg}>退款</Text>
          <Text style={[styles.text,{marginTop:10}]}>{hotelDetail.dealRule}</Text>
        </View>
      </View>
    )
   }
   render() {
     return (
       <ScrollView
        style={{height:HEIGHT-240+this.props.scrollHeight}}
       >
         {this.hotelInfoRender()}
         {this.blankRender()}
         {this.hotelDeviceRender()}
         {this.blankRender()}
         {this.mapRender()}
         {this.blankRender()}
         {this.ruleRender()}
       </ScrollView>
     )
   }
 }

 const styles = StyleSheet.create({
   text: {
    lineHeight:20,
    color: '#616161',
    fontSize: 12
   },
   device_item:{ 
     width: '20%',
     alignItems: 'center'
   },
   rule:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginTop:15,
    paddingBottom: 10,
     borderBottomWidth: 0.5,
     borderColor: '#d8d8d8'
   },
   text_bg: {
     width:38,
     lineHeight:20,
     textAlign: 'center',
     backgroundColor: '#ffeedb',
   }
 })
 
 export default HotelDeitalCom