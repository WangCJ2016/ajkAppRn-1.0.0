import React from 'react'
import { 
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Slider
 } from 'react-native'
 import ViewSlider from '../../components/ViewSlider/viewSlider'
 import { curtainData,smartHostCtrl } from '../../reducers/ctrl.redux'
 import { connect } from 'react-redux'

 const { width,height } = Dimensions.get('window')
 
 @connect(
   state => ({ctrl: state.ctrl}),
   {
    curtainData,smartHostCtrl
   }
 )
 class CurtainCtrlPage extends React.Component {
   constructor() {
     super()
     this.renderView = this.renderView.bind(this)
   }
   componentDidMount() {
     const houseHostInfo = this.props.ctrl.houseHostInfo
     this.props.curtainData({
      deviceType:'CURTAIN',
      houseId: houseHostInfo.houseId
     })
   }
   
   onSlidingComplete(e,curtain) {
     this.curtainCtrl(curtain,'OPEN',e)
   }
   renderView() {
    const curtainData = this.props.ctrl.curtainData
     return curtainData.map((curtainArr,index) => {
       return <View key={index} style={styles.viewWrap}>
        {
          curtainArr.map(curtain => (
            <View key={curtain.id}>
                <Text style={[styles.text,{fontSize:20,fontWeight:'bold'}]}>{curtain.name}</Text>
                <View style={{flexDirection:'row',justifyContent:'space-around',marginTop:20}}>
                  {this.btnGroupRend(curtain)}
               </View>
               <Slider 
                style={{margin:20}}
                maximumValue={100}
                minimumTrackTintColor='#6095f0'
                value={50}
                step={1}
                onSlidingComplete={(e)=>this.onSlidingComplete(e,curtain)}>
               </Slider>
            </View>
        ))
        }
       </View>
       
     })
   }
   btnGroupRend(curtain) {
     const curtainBtns = [{title:'打开',type:'OPEN'},{title:'停止',type:'STOP'},{title:'关闭',type:'CLOSE'}]
     return curtainBtns.map(btn => (
      <TouchableOpacity 
      onPress={()=>this.curtainCtrl(curtain,btn.type,80)}
      key={btn.title} style={styles.btn}>
        <View style={{backgroundColor:'#6095f0',flex:1,borderRadius:27,justifyContent:'center',alignItems: 'center'}}>
         <Text style={{color:'#fff'}}>{btn.title}</Text>
        </View>
      </TouchableOpacity>
     ))
   }
   curtainCtrl(curtain,key,brightness) {
     const houseHostInfo = this.props.ctrl.houseHostInfo
     this.props.smartHostCtrl({
       houseId: houseHostInfo.houseId,
       deviceType:'CURTAIN',
       wayId:curtain.wayId,
       actionType:key,
       brightness:brightness
     })
   }
   render() {
     return (
      <ViewSlider
      renderView={this.renderView}
      backgroundImage={require('../../assets/images/curtain_bg.png')}
    ></ViewSlider>
     )
   }
 }
 
 const styles = StyleSheet.create({
  viewWrap:{
    width: width,
    flex:1,
    justifyContent:'space-around'
  },
  text:{
    color: '#6095f0',
    fontSize: 16,
    textAlign: 'center'
  },
  btn:{
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth:1,
    padding: 5,
    borderColor: '#6095f0',
  }
 })
 export default CurtainCtrlPage