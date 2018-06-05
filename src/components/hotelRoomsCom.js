import React from 'react'
import { 
  View,
  Text,
  SectionList,
  Dimensions,
  RefreshControl,
  ActivityIndicator
 } from 'react-native'
 import { connect } from 'react-redux'
 import ViewUtils from '../utils/viewUtils'
 import {hotelRoomList} from '../reducers/hotel.redux'
 import { withNavigation} from 'react-navigation'
 const HEIGHT =  Dimensions.get('window').height
 
 @withNavigation
 @connect(
   state=>({hotel: state.hotel}),
   {hotelRoomList}
 )
 class HotelRoomsCom extends React.Component {
   constructor(props) {
     super(props)
     this.renderRow = this.renderRow.bind(this)
     this.renderSectionHeader = this.renderSectionHeader.bind(this)
     this.onEndReached = this.onEndReached.bind(this)
     this.goDetail = this.goDetail.bind(this)
   }
   componentDidMount() {
     this.refreshData()
   }
   renderRow(data) {
      return ViewUtils.ListRow(data,80,75,60,this.goDetail)
   }
   goDetail(id) {
    this.props.navigation.navigate('HotelRoomDetail',{houseId: id})
   }
   renderSectionHeader(data) {
     return ViewUtils.ListSectionHeader(data.key)
   }
   refreshData() {
    this.props.hotelRoomList({pageNo:1,pageSize:10,hotelId: this.props.navigation.state.params.id},'load')
   }
   onEndReached() {
    if(this.props.hotel.loadMore){
      return
    }
    if(this.props.hotel.pageNo+1<=this.props.hotel.totalPages) {
      this.props.hotelRoomList({
        pageNo: this.props.hotel.pageNo+1,
        pageSize: 10,
        hotelId: this.props.navigation.state.params.id
      },'load')
    }
   }
   _extraUniqueKey(item ,index){
    return "index"+index+item;
   } 
   render() {
     return (
       <View>
       {
         this.props.hotel.hotelRoomList.length>0?
         <SectionList
              style={{height:HEIGHT-240+this.props.scrollHeight}}
              renderItem={({item}) => this.renderRow(item)}
              renderSectionHeader={({section}) => this.renderSectionHeader(section)}
              sections={this.props.hotel.hotelRoomList}
              keyExtractor = {this._extraUniqueKey}
              onEndReached={this.onEndReached}
              
              refreshControl={
                <RefreshControl
                  titleColor='#ccc'
                  colors={['#ccc']}
                  refreshing={this.props.hotel.refreshLoad}
                  onRefresh={()=>this.refreshData()}
                  tintColor='#ccc'
              />}
            />
            :null
       }
       
       </View>
     )
   }
 }
 
 export default HotelRoomsCom