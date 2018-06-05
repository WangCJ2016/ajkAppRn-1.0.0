import React from 'react'
import { 
  View,
  Text,
  StyleSheet,
  Image,
  Modal,
  TouchableHighlight,
  TouchableOpacity
 } from 'react-native'
 import ImageSlider from 'react-native-image-slider'
 import InphoneXHoc from '../../hoc/inphoneXhoc'

 @InphoneXHoc
 class HotelPicPage extends React.Component {
   constructor() {
     super()
     this.state={
       selectType:0,
       modalVisible: false,
       imageIndex:0
     }
   }
   picTypeRender() {
     const picArr = this.props.navigation.state.params.picArr
     const arr = ['全部','外观','大厅','餐厅','休息区域','前台','其他']
     let pics = []
      picArr.forEach(arr=>{
        pics=[...pics,...arr.pictures.split(',')]
      })
      const allPicLength = pics.length
     return arr.map((type,index) => {
      const length =  picArr.filter(arr=>arr.type === index-1).length===1?picArr.filter(arr=>arr.type === index-1)[0].pictures.split(',').length:0
      return (
        <View key={type} style={[styles.view,{backgroundColor: this.state.selectType===index?'#ffb354':"#fff"}]}>
          <Text 
          onPress={()=>this.setState({selectType:index})}
          style={[styles.text,{color:this.state.selectType===index?'#fff':"#616161"}]}>{type}({index===0?allPicLength:length})</Text>
        </View>
      )
     })
   }
   render() {
    const picArr = this.props.navigation.state.params.picArr
     let pics = []
     if(this.state.selectType===0) {
       picArr.forEach(arr=>{
         pics=[...pics,...arr.pictures.split(',')]
       })
     }else{
      const arr = picArr.filter(arr=>arr.type===this.state.selectType-1)
      pics=arr.length>0?
      arr[0].pictures.split(','):null
     }
     return (
       <View style={{flex:1,backgroundColor: '#FFFFFF',flexDirection:'row',height:'100%'}}>
          <View style={styles.pic_siderbar}>
              {this.picTypeRender()}
          </View>
          <View style={{flex:1,flexDirection:'row',flexWrap:'wrap'}}>
            {pics.map((pic,index)=>(
              <TouchableOpacity key={pic} onPress={()=>this.setState({
                modalVisible:true,
                imageIndex:index
              })}>
                <Image style={{marginLeft:10,marginTop:10}} source={{uri:pic,width:120,height:90}}></Image>
              </TouchableOpacity>
            ))}
          </View>
          <Modal
            animationType={"fade"}
            transparent={true}
            visible={this.state.modalVisible}
            >
            <TouchableHighlight style={{flex:1}} onPress={()=>this.setState({modalVisible:false})}>
              <View style={{flex:1,backgroundColor: '#000'}}>
                
              </View>
            </TouchableHighlight>
            <View style={{position:'absolute',left:0,right:0,top:'50%',height:220,transform:[{translateY:-110}]}}>
            <ImageSlider images={pics} position={this.state.imageIndex}/>
              </View>
          </Modal>
       </View>
     )
   }
 }
 const styles = StyleSheet.create({
   pic_siderbar:{
     width:85,
    borderColor: '#d8d8d8',
    borderLeftWidth: 0.5,
    borderRadius: 2,
    shadowColor: 'gray',
    shadowOffset: {width:0.5, height: 0.5},
    shadowOpacity: 0.4,
    shadowRadius: 1,
    elevation:2
   },
   view:{
    height:40,justifyContent:'center',
    borderBottomWidth: 0.5,
    borderColor:'#d8d8d8',
    
   },
   text:{
    textAlign: 'center',
    color:'#616161',
    height:'100%',
    lineHeight:40,
   }
 })
 export default HotelPicPage