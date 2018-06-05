import React from 'react'
import { 
  View,
  Text,
  Modal,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Image
 } from 'react-native'
 import MultiSlider from '@ptomasroos/react-native-multi-slider'
 const WIDTH = Dimensions.get('window').width

 class HotelModal extends React.Component {
   constructor() {
     super()
     this.state = {
      priceRange:[100]
    }
    this.onSliderValuesChangeFinish = this.onSliderValuesChangeFinish.bind(this)
   }
   rentTypeRender() {
    const rentType = [{label:'整套出租',value:0,img:require('../../assets/images/zhengtao.png')},{label:'独立出租',value:1,img:require('../../assets/images/duli.png')},{label:'不限制',value:3,img:require('../../assets/images/nolimited.png')}]
    return rentType.map(type => {
      const ifSelect = this.state.rentType === type.value
      return ( <TouchableOpacity key={type.value}  onPress={()=>this.setState({rentType:type.value})}>
       <View style={{height:60,justifyContent:'space-between',alignItems:'center',marginRight:20}}>
         <Image style={{tintColor:ifSelect?'#ffb354':'#555'}} source={type.img}></Image>
         <Text style={{color:'#555',color:ifSelect?'#ffb354':'#555'}}>{type.label}</Text>
       </View>
       </TouchableOpacity>
        )
    })
   }
   layoutRender() {
     const arr = ['一室','二室','三室','其他']
     return arr.map((item,index) => {
       const ifSelect = this.state.layout === item
       return (<TouchableOpacity 
             key={index} 
             onPress={()=>this.setState({layout:item})}
             style={{width:70,height:30,backgroundColor:ifSelect?'#ffb354':'#fff',borderColor:ifSelect?'#fff':'#d8d8d8',borderWidth:0.5,marginRight:10}}>
            <Text style={{fontSize:15,color:ifSelect?'#fff':'#555',lineHeight:30,textAlign:'center'}}>{item}</Text>
        </TouchableOpacity>)
     })
   }
   trafficRender() {
    const arr = ['近地铁','近火车站']
    return arr.map((item,index) => {
      const ifSelect = this.state.traffic === item
      return (<TouchableOpacity 
            key={index} 
            onPress={()=>this.setState({traffic:item})}
            style={{width:70,height:30,backgroundColor:ifSelect?'#ffb354':'#fff',borderColor:ifSelect?'#fff':'#d8d8d8',borderWidth:0.5,marginRight:10}}>
           <Text style={{fontSize:15,color:ifSelect?'#fff':'#555',lineHeight:30,textAlign:'center'}}>{item}</Text>
       </TouchableOpacity>)
    })
   }
   brandRender() {
    const arr = ['经济型','舒适型','高级型','豪华型']
    return arr.map((item,index) => {
      const ifSelect = this.state.brand === item
      return (<TouchableOpacity 
            key={index} 
            onPress={()=>this.setState({brand:item})}
            style={{width:70,height:30,backgroundColor:ifSelect?'#ffb354':'#fff',borderColor:ifSelect?'#fff':'#d8d8d8',borderWidth:0.5,marginRight:10}}>
           <Text style={{fontSize:15,color:ifSelect?'#fff':'#555',lineHeight:30,textAlign:'center'}}>{item}</Text>
       </TouchableOpacity>)
    })
   }
   bedRender() {
    const arr = ['单人床','双人床','家庭房']
    return arr.map((item,index) => {
      const ifSelect = this.state.bed === item
      return (<TouchableOpacity 
            key={index} 
            onPress={()=>this.setState({bed:item})}
            style={{width:70,height:30,backgroundColor:ifSelect?'#ffb354':'#fff',borderColor:ifSelect?'#fff':'#d8d8d8',borderWidth:0.5,marginRight:10}}>
           <Text style={{fontSize:15,color:ifSelect?'#fff':'#555',lineHeight:30,textAlign:'center'}}>{item}</Text>
       </TouchableOpacity>)
    })
   }
   onSliderValuesChangeFinish(e) {
    this.setState({priceRange: e})
  }
   render() {
     return (
      <Modal
      transparent={true}
      animationType={'slide'}
      visible={this.props.conditionModalVisible}>
      {
      this.props.type === '长租'?
      <View style={{flex:1,backgroundColor: 'rgba(0,0,0,.5)',justifyContent:'space-between'}}>
       <Text style={{flex:1}}  onPress={()=>this.props.conditionModalVisibleHandle()}></Text>
       <View style={{backgroundColor:'#fff',paddingTop:10,paddingLeft:15,paddingRight:15}}>
         <Text style={styles.moreModalTitle}>价格范围<Text style={{paddingLeft:20,color:'#ffb354'}}>¥{this.state.priceRange[0]}以内</Text></Text>
         <MultiSlider
           values={this.state.priceRange}
           allowOverlap
           snapped
           min={50}
           max={1000}
           sliderLength={WIDTH-50}
           trackStyle={{
             height:4,
             backgroundColor: '#fff',
           }}
           unselectedStyle={{
             backgroundColor: '#e1e1e1',
           }}
           selectedStyle={{
             backgroundColor: '#ffb354',
           }}
           touchDimensions={{
             height: 40,
             width: 40,
             borderRadius: 20,
             slipDisplacement: 40,
           }}
           markerOffsetY={2}
           onValuesChangeFinish={this.onSliderValuesChangeFinish}
           customMarker={()=><View style={{width:20,height:20,borderRadius:10,borderColor:'#ffb354',borderWidth:1,backgroundColor:'#fff'}}></View>}
         />
         <View style={{height:0.5,backgroundColor:'#d8d8d8'}}></View>
         <Text style={styles.moreModalTitle}>出租类型</Text>
         <View style={{paddingTop:10,paddingBottom:20,flexDirection:'row',paddingLeft:10}}>
            {this.rentTypeRender()}
         </View>
         <View style={{height:0.5,backgroundColor:'#d8d8d8'}}></View>
         <Text style={styles.moreModalTitle}>房源户型</Text>
         <View style={{paddingTop:10,paddingBottom:20,flexDirection:'row',paddingLeft:10}}>
           {this.layoutRender()}
         </View>  
         <View style={{height:0.5,backgroundColor:'#d8d8d8'}}></View>
         <Text style={styles.moreModalTitle}>位置与交通</Text>
         <View style={{paddingTop:10,paddingBottom:20,flexDirection:'row',paddingLeft:10}}>
           {this.trafficRender()}
         </View>
         <View style={{flexDirection:'row',borderTopColor:'#d8d8d8',borderTopWidth:0.5,marginRight:-20,marginLeft:-10}}>
            <TouchableOpacity style={{width:'40%',height:50,alignItems:'center',justifyContent:'center'}}>
               <Text style={{fontSize:17}}>清空</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>this.props.conditionModalVisibleHandle({
              price: this.state.priceRange[0],
              leaseMode: this.state.leaseMode,
              layout: this.state.layout
            })} style={{width:'60%',height:50,backgroundColor:'#ff9c40',alignItems:'center',justifyContent:'center'}}>
               <Text style={{fontSize:17,color:'#fff'}}>确定</Text>
            </TouchableOpacity>
         </View>
       </View>
      </View>:
      <View style={{flex:1,backgroundColor: 'rgba(0,0,0,.5)',justifyContent:'space-between'}}>
       <Text style={{flex:1}} onPress={()=>this.props.conditionModalVisibleHandle()}></Text>
       <View style={{backgroundColor:'#fff',paddingTop:10,paddingLeft:15,paddingRight:15}}>
         <Text style={styles.moreModalTitle}>价格范围<Text style={{paddingLeft:20,color:'#ffb354'}}>¥{this.state.priceRange[0]}以内</Text></Text>
         <MultiSlider
           values={this.state.priceRange}
           min={50}
           max={1000}
           sliderLength={WIDTH-50}
           trackStyle={{
             height:4,
             backgroundColor: '#fff',
           }}
           unselectedStyle={{
             backgroundColor: '#e1e1e1',
           }}
           selectedStyle={{
             backgroundColor: '#ffb354',
           }}
           touchDimensions={{
             height: 40,
             width: 40,
             borderRadius: 20,
             slipDisplacement: 40,
           }}
           markerOffsetY={2}
           onValuesChangeFinish={this.onSliderValuesChangeFinish}
           customMarker={()=><View style={{width:20,height:20,borderRadius:10,borderColor:'#ffb354',borderWidth:1,backgroundColor:'#fff'}}></View>}
         />
         <View style={{height:0.5,backgroundColor:'#d8d8d8'}}></View>
         <Text style={styles.moreModalTitle}>品牌</Text>
         <View style={{paddingTop:10,paddingBottom:20,flexDirection:'row',paddingLeft:10}}>
            {this.brandRender()}
         </View>
         <View style={{height:0.5,backgroundColor:'#d8d8d8'}}></View>
         <Text style={styles.moreModalTitle}>位置与交通</Text>
         <View style={{paddingTop:10,paddingBottom:20,flexDirection:'row',paddingLeft:10}}>
         {this.trafficRender()}
         </View>
         <View style={{height:0.5,backgroundColor:'#d8d8d8'}}></View>
         <Text style={styles.moreModalTitle}>床型选择</Text>
         <View style={{paddingTop:10,paddingBottom:20,flexDirection:'row',paddingLeft:10}}>
         {this.bedRender()}
         </View>
         <View style={{flexDirection:'row',borderTopColor:'#d8d8d8',borderTopWidth:0.5,marginRight:-20,marginLeft:-10}}>
            <TouchableOpacity style={{width:'40%',height:50,alignItems:'center',justifyContent:'center'}}>
               <Text style={{fontSize:17}}>清空</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>this.props.conditionModalVisibleHandle()} style={{width:'60%',height:50,backgroundColor:'#ff9c40',alignItems:'center',justifyContent:'center'}}>
               <Text style={{fontSize:17,color:'#fff'}}>确定</Text>
            </TouchableOpacity>
         </View>
       </View>
      </View>
    }
  </Modal>
     )
   }
 }
 
 const styles = StyleSheet.create({
  searchView:{
    position: 'absolute',
    left:10,
    right:-10,
    backgroundColor:'#fff',
   height:35,
   borderRadius:5,
   borderColor:'#aaa',
   borderWidth:0.5,
   alignItems: 'center',
   flexDirection: 'row',
  },
  moreModalTitle:{
    fontSize:16,
    marginTop: 20,
    marginBottom: 20,
    marginLeft:10
  }
})
 export default HotelModal