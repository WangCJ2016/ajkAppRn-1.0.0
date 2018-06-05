import React from 'react'
import { 
  View,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput
 } from 'react-native'
 import {List,Button,Toast } from 'antd-mobile'
 import ActionSheet from 'react-native-actionsheet'
 import { connect } from 'react-redux'
 import { dataSuccess } from '../../reducers/map.redux'

 const CANCEL_INDEX = 0
 const options = [ '取消','长租', '短租', '酒店', ]
 const title = '选择房源类型'
 import InphoneXHoc from '../../hoc/inphoneXhoc'

 @InphoneXHoc
@connect(
  state => ({map: state.map}),
  {
    dataSuccess
  }
)
 class SearchSetPage extends React.Component {
   constructor() {
     super()
     this.state = {
      type:''
     }
     this.handleSubmit = this.handleSubmit.bind(this)
   }
   
   handleActionSheet(e){
     if(e===0) {
       return 
     }
     this.setState({
      type: options[e],
     })
   }
   handleSubmit() {
     if(!this.state.type){
       Toast.info('请选择出租类型')
       return
     }
     
     this.props.dataSuccess({searchInfo:{
       ...this.props.map.searchInfo,
       address: encodeURI('杭州'), //this.props.map.city.name
       type: this.state.type,
       price: this.state.price,
       keyword: this.state.keyword
      }})
      this.props.navigation.navigate('NearbySearch')
   }
   render() {
     return (
       <View style={styles.container}>
        <TouchableHighlight underlayColor='#ccc' onPress={()=>this.props.navigation.navigate('CitySelect')}>
          <View style={[styles.view_row_between,{borderBottomColor:'#d8d8d8',borderBottomWidth:0.5,}]}>
              <View style={[styles.view_row_between,{flex:1,marginRight:10}]}>
                <Text style={{fontSize:16}}>目的地<Text style={{fontSize:12}}>(必选)</Text></Text>
                <View style={[styles.view_row_between]}>
                    <Text style={{color:'#aaa',marginRight:10}}>{this.props.map.city.name}</Text>
                    <Image source={require('../../assets/images/right_arr_icon.png')}></Image>
                </View>
              </View>
              <View style={{width:0.5,backgroundColor:'#d8d8d8',height:35,marginRight:5}}></View>
              <TouchableOpacity>
                  <View style={[styles.view_row_between,{padding:5}]}>
                    <Image source={require('../../assets/images/loc_icon2.png')}></Image>
                    <View style={{marginLeft:5}}>
                      <Text style={{fontSize:12}}>我的</Text>
                      <Text style={{fontSize:12}}>附近</Text>
                    </View>
                  </View>
              </TouchableOpacity>
          </View>
        </TouchableHighlight>
        <TouchableHighlight underlayColor='#ccc' onPress={()=>this.ActionSheet.show()}>
          <View style={[styles.view_row_between,{borderBottomColor:'#d8d8d8',borderBottomWidth:0.5,}]}>
              <Text style={{fontSize:16}}>出租类型<Text style={{fontSize:12}}>(必选)</Text></Text>
              <View style={[styles.view_row_between]}>
                  <Text style={{color:'#aaa',marginRight:10}}>{this.state.type?this.state.type:'选择房源类型'}</Text>
                  <Image source={require('../../assets/images/right_arr_icon.png')}></Image>
              </View>
          </View>
        </TouchableHighlight>
        <View style={[styles.view_row_between,{borderBottomColor:'#d8d8d8',borderBottomWidth:0.5,}]}>
          <Text style={{fontSize:16}}>价格</Text>
          <TextInput keyboardType='numeric' style={{flex:1,textAlign:'right',color:'#f2080d',fontSize:15}} placeholder='按价格搜索' onChangeText={(e)=>this.setState({price: e})}></TextInput>
        </View>
        <View style={{height:50,borderBottomColor:'#d8d8d8',borderBottomWidth:0.5,justifyContent:'center'}}>
          <TextInput style={{fontSize:15}}  placeholder='地址位置/关键字/标题' onChangeText={()=>this.setState({keyword:e})}></TextInput>
        </View>      
        <View style={{marginTop: 15,marginBottom:15}}>
         <Button type='primary' onClick={this.handleSubmit}>搜索</Button>
        </View>
        <ActionSheet
          ref={o => this.ActionSheet = o}
          title={title}
          options={options}
          cancelButtonIndex={CANCEL_INDEX}  
          onPress={this.handleActionSheet.bind(this)}
        />
       </View>
     )
   }
 }
 
 const styles = StyleSheet.create({
   container:{
    backgroundColor:'#fff',marginTop:20,marginLeft:5,marginRight:5,padding:10
   },
   view_row_between:{
     flexDirection: 'row',
     justifyContent: 'space-between',
     alignItems: 'center',
     height:50
   }
 })
 export default SearchSetPage