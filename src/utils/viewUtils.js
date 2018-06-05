import React from 'react'
import { List } from 'antd-mobile'
import { 
  Image,
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  TextInput,
  ImageBackground,
  Linking
 } from 'react-native'
import { isIphoneX } from '../utils/fnUtils'
import StarsComponent from '../components/starsComponent'
import { TransformStatus,auditFailStatus,telephoneFormat,telephoneHidden } from './fnUtils'
const Item = List.Item;
const screenWidth =Dimensions.get('window').width

const _isIphoneX = isIphoneX()
export default class ViewUtils {
    static itemhasArr(icon,text,cb,width,height) {
      return (<Item
          thumb={<Image style={{width:width,height:height}} source={icon}/>}
          arrow="horizontal"
          onClick={() => {cb?cb():null}}
          ><Text style={{marginLeft:10,fontSize:16}}>{text}</Text>
        </Item>
        )
    }
   static homehotelCell(hotel,navigation) {
     return (
      <TouchableHighlight  onPress={()=>navigation.navigate('HotelDetail',{id:hotel.id})}>
        <View style={styles.item_container}>
        <Image source={{uri:hotel.mainPicture}} style={{width:130,height:110}}></Image>
        <View style={styles.item_info}>
          <Text numberOfLines={1} style={styles.item_name}>{hotel.name}</Text>
          <View style={{flexDirection:'row',alignItems:'center'}}>
            <Image source={require('../assets/images/loc_icon.png')}></Image> 
            <Text numberOfLines={1} ellipsizeMode='tail' style={styles.item_address}>{hotel.address}</Text>
          </View>
          <View>
            <StarsComponent num={hotel.stars||5}></StarsComponent>
          </View>
          <View style={{flexDirection:'row',alignItems:'center'}}>
            <Text style={{fontSize:12,color: '#ababab'}}>¥</Text>
            <Text style={styles.item_price}>{hotel.price}</Text>
            <Text style={{fontSize:12, color: '#ababab'}}>起</Text>
          </View>
        </View>
      </View>
      </TouchableHighlight>
     )
   }
   static collectionCell(hotel,navigation) {
     return (
       <TouchableHighlight 
       onPress={()=>navigation.navigate('HotelDetail',{id:hotel.id})}
       key={hotel.id}>
          <View style={{padding:5,flexDirection:'row',alignItems:'center',justifyContent:'space-between',backgroundColor:'#fff',borderBottomColor:'#d8d8d8',borderBottomWidth:0.5}}>
            <Image source={{uri:hotel.mainPicture,width:120,height:90}}></Image>
            <View style={{justifyContent:'space-around',marginLeft:10,height:90,flex:1}}>
              <Text numberOfLines={1} style={{color:'#ababab'}}>{hotel.name}</Text>
              <Text numberOfLines={1} style={{color:'#ababab'}}>{hotel.address}</Text>
              <Text numberOfLines={1} style={{color:'#ffb354'}}>¥{hotel.price}</Text>
            </View>
            <Image style={{tintColor:'#ccc'}} source={require('../assets/images/right_arr_icon.png')}></Image>
          </View>
       </TouchableHighlight>
     )
   }
   static hotelDeitalHeader({goBack,collect,share},whetherCollect) {
    return (
      <View style={{flexDirection:'row',flex:1,justifyContent:'space-between',position:'absolute',left:10,right:10,top:_isIphoneX?35:15}}>
       <TouchableOpacity  onPress={()=>goBack()}>
         <View style={styles.icon_btn}>
          <Image style={{marginRight:3}} source={require('../assets/images/left_arr_icon.png')}></Image>
         </View>
       </TouchableOpacity>
       <View style={{flexDirection:'row'}}>
       {
         collect?
         <TouchableWithoutFeedback onPress={()=>collect()}>
         <View style={[styles.icon_btn,{backgroundColor: '#ffb354',opacity:1}]}>
         {
           whetherCollect?<Image  source={require('../assets/images/heart_like.png')}></Image>:
           <Image   source={require('../assets/images/heart_icon.png')}></Image>
          }
         </View>
         </TouchableWithoutFeedback>
         :null
       }
        <TouchableWithoutFeedback  onPress={()=>share()}>
          <View style={[styles.icon_btn,{backgroundColor: '#ffb354',opacity:1,marginLeft:10}]}>
          <Image source={require('../assets/images/share_icon.png')}></Image>
          </View>
        </TouchableWithoutFeedback>
       </View>
     </View>)
   }
   static ListSectionHeader(data) {
     return (
       <Text style={{height:25,backgroundColor: '#f6f6f6',paddingLeft: 10,paddingTop:5}}>
          {data}
       </Text>
     )
   }
   static ListRow(data,rowHeight,thumbWidth,thumbHeight,cb){
     return (
      <TouchableOpacity
       key={data.id}
       style={[styles.list_row,{height:rowHeight}]}
       onPress={()=>cb(data.id)}>
       <Image style={styles.list_row_thumb} source={{uri:data.picture,width:thumbWidth,height:thumbHeight}}></Image>
       <View style={styles.list_row_content}>
         <Text style={{color:'#ababab'}}>{data.name}</Text>
         <Text style={{color:'#ffb354',marginTop:10}}>¥{data.defaultPrice}</Text>
       </View>
       <Image source={require('../assets/images/right_arr_icon.png')}></Image>
      </TouchableOpacity>
     )
   }
   static orderTitle(text) {
     return <Text style={{padding:10,color:'#616161',backgroundColor: '#FFFFFF'}}>{text}</Text>
   }
   static orderContent(image,c1,c2,cb) {
     return (
     
      <View style={{flexDirection:'row',padding:10,alignItems:'center',backgroundColor: '#faf9f9'}}>
        <Image source={{uri:image,width:75,height:60}}></Image>
        <View style={{flex:1,marginLeft:10,height:60}}>
          <Text style={{color:'#ababab'}}>{c1}</Text>
          <Text style={{color:'#ffb354'}}>{c2}</Text>
        </View>
      </View>
  
     )
   }
   static orderDetailItem(image,p1,p2,p3) {
     return (
       <TouchableHighlight key={image} >
          <View style={{padding:10,flexDirection:'row',backgroundColor: '#faf9f9'}}>
            <Image source={{uri:image,width:75,height:60}}></Image>
            <View style={{marginLeft:10,flex:1,justifyContent:'space-between'}}>
              <Text numberOfLines={1} style={{color:'#ababab'}}>{p1}</Text>
              <Text numberOfLines={1} style={{color:'#ababab'}}>{p2}</Text>
              <Text numberOfLines={1} style={{color:'#ffb354'}}>{p3}</Text>
            </View>
          </View>
       </TouchableHighlight>
     )
   }
   static houseMesTitle(image,title) {
     return <View style={{height:40,flexDirection:'row',alignItems:'center'}}>
        <Image style={{marginLeft:15}} source={image}></Image>
        <Text style={{fontSize:15,fontWeight:'bold',marginLeft:10}}>{title}</Text>
     </View>
   }
 
  static alreadyRentedItem(order,cb) {
    return <TouchableHighlight onPress={()=>cb()} underlayColor='#ccc'>
       <View style={{paddingLeft:17,paddingRight:17,paddingTop:10,paddingBottom:10,backgroundColor:'#fff',marginTop:10}}>
          <Image style={{width:'100%',height: 170,borderRadius:3}} source={{uri:order.pictures.split(',')[0]}}></Image>
          <View style={{marginTop:10,flexDirection:'row',height:56}}>
            <View style={{flex:1}}>
              <Text style={{lineHeight:25,fontSize:15}}>{order.title}</Text>
            </View>
            <View style={{width:90,justifyContent:'center',alignItems:'center',borderLeftWidth:1,borderColor:'#d8d8d8'}}>
              <Image source={require('../assets/images/safe_icon.png')}></Image>
              <Text style={{marginTop:5,fontSize:15,color:'#5aae0f'}}>{order.security}</Text>
            </View>
          </View>
          {
            order.isExpire?
            <ImageBackground style={{width:110,height:25,position:'absolute',left:15,top:145}} source={require('../assets/images/warm_bg.png')}>
              <Text style={{textAlign:'center',lineHeight:20,color:'#fff',fontSize: 15}}>{order.isExpire}</Text>
            </ImageBackground>
          :null
          }
       </View>
    </TouchableHighlight>
  }
  static waitRentedItem(order,cb) {
    return <TouchableHighlight onPress={()=>cb()} underlayColor='#ccc'>
       <View style={{paddingLeft:17,paddingRight:17,paddingTop:10,paddingBottom:10,backgroundColor:'#fff',marginTop:10}}>
          <Image style={{width:'100%',height: 170,borderRadius:3}} source={{uri:order.pictures.split(',')[0]}}></Image>
          <View style={{marginTop:10,flexDirection:'row',height:56}}>
            <View style={{flex:1}}>
              <Text style={{lineHeight:25,fontSize:15}} numberOfLines={1}>{order.title}</Text>
              <Text style={{color:'#aaa',fontSize:15}}>已有5人看房</Text>
            </View>
            <View style={{width:90,justifyContent:'center',alignItems:'center',borderLeftWidth:1,borderColor:'#d8d8d8'}}>
              <Image source={require('../assets/images/safe_icon.png')}></Image>
              <Text style={{marginTop:5,fontSize:15,color:'#5aae0f'}}>{order.security}</Text>
            </View>
          </View>
          {
            order.isExpire?
            <ImageBackground style={{width:110,height:25,position:'absolute',left:15,top:145}} source={require('../assets/images/warm_bg.png')}>
            <Text style={{textAlign:'center',lineHeight:20,color:'#fff',fontSize: 15}}>{order.isExpire}</Text>
          </ImageBackground>
          :null
          }
       </View>
    </TouchableHighlight>
  }

  static alreadyReleaseItem(order,cb) {
    return <TouchableHighlight onPress={()=>cb()} underlayColor='#ccc'>
       <View style={{paddingLeft:17,paddingRight:17,paddingTop:10,paddingBottom:10,backgroundColor:'#fff',marginTop:10}}>
          <Image style={{width:'100%',height: 170,borderRadius:3}} source={{uri:order.pictures.split(',')[0]}}></Image>
          
            <View style={{marginTop:10}}>
              <Text style={{lineHeight:25,fontSize:15}} numberOfLines={1}>{order.title}</Text>
              <View style={{flexDirection:'row',alignItems:'center'}}>
                 <Image style={{marginRight:5}} source={require('../assets/images/miss_icon.png')}></Image>
                 <View style={{paddingLeft:10,paddingRight:10,marginRight:10,backgroundColor:'#f3f3f3',height:20,borderRadius:15,justifyContent:'center'}}>
                   <Text style={{color:'#555',fontSize:15}}>{TransformStatus(order.status)}</Text>
                 </View>
                 {
                  (order.status===5&&order.auditFail)?
                  <View style={{paddingLeft:10,paddingRight:10,marginRight:10,backgroundColor:'#f3f3f3',height:20,borderRadius:15,justifyContent:'center'}}>
                    <Text style={{color:'#555',fontSize:15,}} numberOfLines={1}>原因:
                      {
                        order.auditFail.split(',').map(v=>{
                          if(auditFailStatus(v)) {
                            return auditFailStatus(v)+','
                          }
                          return ''
                         }
                        )
                      }
                    </Text>
                  </View>
                  :null
                  }
              </View>
            </View>
          </View>
    </TouchableHighlight>
  }
  
  static landlordIntentItem(data,handleIntent,handlePress) {
    return <TouchableHighlight underlayColor='#aaa' onPress={()=>handlePress(data)}>
    <View style={{backgroundColor:'#fff',marginTop:10}}>
      <View style={{height:125,flexDirection:'row',alignItems:'center'}}>
         <Image source={{uri: data.house.pictures.split(',')[0]}} style={{width:100,height:80,marginLeft:20}}></Image>
         <View style={{justifyContent:'space-between',height:80,marginLeft:15}}>
           <Text style={{fontSize:17,color:'#000'}} numberOfLines={1}>{data.house.title}</Text>
           <Text style={{color:'#555'}} numberOfLines={1}>姓名:{data.customer.name}</Text>
           <Text style={{color:'#555'}} numberOfLines={1}>手机:{data.customer.telephone}</Text>
           <Text style={{color:'#555'}} numberOfLines={1}>时间:{data.gmtCreate}</Text>
         </View>
      </View>
      <View style={{height:50,alignItems:'center',borderTopColor:'#d8d8d8',borderTopWidth:0.5,flexDirection:'row'}}>
          <View style={{flex:1}}></View>
          <TouchableOpacity onPress={()=>handleIntent(data)}>
            <View style={{width:89,height:25,borderRadius:12.5,borderColor:'#ff9c40',borderWidth:1,justifyContent:'center',marginRight:20}}>
             <Text style={{color:'#ff9c40',fontSize:15,textAlign:'center'}}>
              {
              data.status === 1 ?'同意看房':null  
              }
              {
                data.status === 2 ?'确认出租':null  
              }
              {
                data.status === 3 ?'已出租':null  
              }
             </Text>
            </View>
          </TouchableOpacity>
      </View>
    </View>
    </TouchableHighlight>
  }

  static customerIntentItem(data,handleDel,handlePress) {
    return <TouchableHighlight underlayColor='#aaa' onPress={()=>handlePress(data)}>
    <View style={{backgroundColor:'#fff',marginTop:10}}>
      <View style={{height:125,flexDirection:'row',alignItems:'center'}}>
         <Image source={{uri: data.house.pictures.split(',')[0]}} style={{width:100,height:80,marginLeft:20}}></Image>
         <View style={{justifyContent:'space-between',height:80,marginLeft:15,flex:1}}>
           <Text style={{fontSize:17,color:'#000'}} numberOfLines={1}>{data.house.title}</Text>
           <Text style={{color:'#555'}} numberOfLines={1}>姓名:{data.landlord.name}</Text>
           <Text style={{color:'#555'}} numberOfLines={1}>手机:
            {
             data.status === 1?
             telephoneHidden(data.landlord.telephone)
                :null
            }
            {
              data.status === 2 || data.status === 3?
             
                <Text 
                  onPress={()=>Linking.openURL(`tel:${data.landlord.telephone}`)}
                  style={{color:'#0d81ff',flex:1}}>{telephoneFormat(data.landlord.telephone)}
                  <Image style={{marginLeft:50,marginTop:5}} source={require('../assets/images/call_icon.png')}></Image>
                </Text>
             
               :null
             }
            </Text>
           <Text style={{color:'#555'}} numberOfLines={1}>时间:{data.gmtCreate}</Text>
         </View>
      </View>
      <View 
      style={{height:50,borderTopColor:'#d8d8d8',borderTopWidth:0.5}}>
        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',padding:15}}>
            <Text style={{fontSize:15,color:'#ff9c40'}}>
            {
              data.status === 1 ?'待房东确认':null  
            }
            {
              data.status === 2 ?'房源待出租':null  
            }
            {
              data.status === 3 ?'房源已出租':null  
            }
            </Text>
            <TouchableOpacity onPress={()=>handleDel(data)}>
              <View style={{width: 50,height:24,borderColor:'#ffb354',borderWidth: 0.5,borderRadius:12.5,alignItems:'center',justifyContent:'center'}}>
                <Text style={{color:'#ffb354'}}>删除</Text>
              </View>
            </TouchableOpacity>
        </View>
       </View>
     </View>
    </TouchableHighlight>
  }

  static longRentSearchItem(order,cb) {
    return <TouchableHighlight onPress={()=>cb()} underlayColor='#ccc'>
       <View style={{paddingLeft:17,paddingRight:17,paddingTop:10,paddingBottom:10,backgroundColor:'#fff',marginTop:10}}>
          <Image style={{width:'100%',height: 170,borderRadius:3}} source={{uri:order.pictures.split(',')[0]}}></Image>
          <View style={{marginTop:10,flexDirection:'row',height:36}}>
            <View style={{flex:1}}>
              <Text style={{lineHeight:25,fontSize:15}}>{order.title}</Text>
            </View>
          </View>
       </View>
    </TouchableHighlight>
  }
}

const styles = StyleSheet.create({
  item_container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderBottomWidth:0.5,
    borderColor: '#ccc'
  },
  item_info:{
    flex:1,
    justifyContent:'space-between',
    marginLeft: 10
  },
  item_name: {
    fontSize: 17,
    width:screenWidth - 160,
  },
  item_address: {
    fontSize: 13,
    width:screenWidth - 150,
    color: '#ababab',
    marginLeft: 5
  },
  item_price: {
    fontSize: 18,
    color: '#ffb354'
  },
  list_row:{
    height:160,
    flexDirection:'row',
    alignItems:'center',
    padding: 10,
    justifyContent:'space-between',
    borderBottomWidth:0.5,
    borderColor:'#d8d8d8'
  },
  list_row_content:{
    flex:1,
    justifyContent:'flex-start',
    marginLeft:10,
    alignItems:'flex-start',
    height:'100%'
  },
  list_row_thumb:{
    width: 75,
    height: 60
  },
  icon_btn:{
    width:30,
    height:30,
    borderRadius: 15,
    backgroundColor: '#000',
    opacity:0.5,
    alignItems:'center',
    justifyContent:'center',
  }
})