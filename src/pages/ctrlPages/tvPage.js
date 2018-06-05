import React from 'react'
import { 
  View,
  Text,
  Dimensions,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  TouchableHighlight,
  Image
 } from 'react-native'
 import { connect } from 'react-redux'
 import { tvDevicesInfo,smartHostCtrl,dataSuccess } from '../../reducers/ctrl.redux'
import ViewSlider from '../../components/ViewSlider/viewSlider'

const { width,height } = Dimensions.get('window')

@connect(
  state=>({ctrl:state.ctrl}),
  {
    tvDevicesInfo,smartHostCtrl,dataSuccess
  }
)
 class TvCtrlPage extends React.Component {
   constructor(){
     super()
     this.state={
       status:'tv'
     }
     this.renderView=this.renderView.bind(this)
     this.changePage = this.changePage.bind(this)
   }
   componentDidMount() {
     const houseHostInfo = this.props.ctrl.houseHostInfo
     this.props.tvDevicesInfo({
       houseId:houseHostInfo.houseId
     })
   }
   changePage() {
     this.setState({
       status:this.state.status==='tv'?'tvbox':'tv'
     })
   }
   ctrlClick(tvinfo,key) {
      if(key==='OFF'||key==='ON'&&this.state.status==='tv'){
        this.props.dataSuccess({tvStatus:key})
      }
      if(key==='OFF'||key==='ON'&&this.state.status==='tvbox'){
        this.props.dataSuccess({tvboxStatus:key})
      }
      const houseHostInfo = this.props.ctrl.houseHostInfo
      let keyword = this.state.status==='tv'?'电视机':'机顶盒'
      let deviceId
      for(let i in tvinfo){
        if (i.indexOf(keyword)>-1) {
          deviceId = tvinfo[i]
        }
      }
      const data = {
        houseId:houseHostInfo.houseId,
        deviceType:'VIRTUAL_TV_DVD_REMOTE',
        deviceId:deviceId,
        key:key
      }
     this.props.smartHostCtrl(data)
   }
   renderView() {
     const tvInfo = this.props.ctrl.tvInfo
     return tvInfo.map((tv,index)=>(
       <View key={index} style={styles.viewWrap}>
       {
         this.state.status==='tv'?
         <View style={[styles.itemWrap,{marginLeft:20,marginRight:20,marginTop:10}]}>
         <TouchableOpacity
           style={styles.mainBtn}
           onPress={this.changePage}>
           <View style={styles.swtichBtn}>
             <Text style={{color:'#fff'}}>TV</Text>
           </View> 
          </TouchableOpacity>
          <TouchableOpacity
           onPress={()=>this.ctrlClick(tv,this.props.ctrl.tvStatus==='OFF'?'ON':'OFF')}
           style={[styles.mainBtn,{backgroundColor:this.props.ctrl.tvStatus==='OFF'?"transparent":'#6095f0'}]}>
            <Image source={require('../../assets/images/souce_icon.png')}></Image>
          </TouchableOpacity>
          <TouchableOpacity
          style={styles.mainBtn}
          onPress={()=>this.ctrlClick(tv,'VOL_PLUS')}>
            <Image source={require('../../assets/images/voice_plus.png')}></Image>
          </TouchableOpacity>
          <TouchableOpacity
          style={styles.mainBtn}
          onPress={()=>this.ctrlClick(tv,'VOL_SUB')}>
            <Image source={require('../../assets/images/voice_munis.png')}></Image>
          </TouchableOpacity>
         </View>
         :<View style={[styles.itemWrap,{marginLeft:20,marginRight:20,marginTop:10}]}>
         <TouchableOpacity
          style={styles.mainBtn}
          onPress={this.changePage}>
            <View style={styles.swtichBtn}>
              <Text style={{color:'#fff'}}>AV</Text>
            </View> 
          </TouchableOpacity>
         <TouchableOpacity
          style={[styles.mainBtn,{backgroundColor:this.props.ctrl.tvboxStatus==='OFF'?"transparent":'#6095f0'}]}
          onPress={()=>this.ctrlClick(tv,this.props.ctrl.tvboxStatus==='OFF'?'ON':'OFF')}>
           <Image source={require('../../assets/images/souce_icon.png')}></Image>
         </TouchableOpacity>
         <TouchableOpacity
         style={styles.mainBtn}
          onPress={()=>this.ctrlClick(tv,'MUTE')}>
           <Image source={require('../../assets/images/mute_icon.png')}></Image>
         </TouchableOpacity>
         <TouchableOpacity
         style={styles.mainBtn}
         onPress={()=>this.ctrlClick(tv,'RETURN')}
         >
           <Image source={require('../../assets/images/back_icon.png')}></Image>
         </TouchableOpacity>
        </View>
       }
         
         <View style={[styles.itemWrap,{margin:20}]}>
            <View style={styles.rect}>
                <TouchableOpacity 
                  onPress={()=>this.ctrlClick(tv,'UP')}
                  style={styles.imageWrap}>
                  <Image source={require('../../assets/images/arr_top_icon.png')}></Image>
                </TouchableOpacity>
                <Text style={{color:'#6095f0',fontSize:16}}>频道</Text>
                <TouchableOpacity
                onPress={()=>this.ctrlClick(tv,'DOWN')} 
                style={styles.imageWrap}>
                    <Image source={require('../../assets/images/arr_down_icon.png')}></Image>
              </TouchableOpacity>
            </View>
            <View style={styles.round_bg}>
                <View style={styles.round_small}>
                  <TouchableOpacity
                    onPress={()=>this.ctrlClick(tv,'OK')}
                    style={styles.ok}>
                    <Text style={{color: '#FFFFFF',fontSize:16,fontWeight:'700'}}>OK</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity 
                  onPress={()=>this.ctrlClick(tv,'UP')}
                  style={[styles.imageWrap,{position: 'absolute',top:0}]}>
                  <Image source={require('../../assets/images/arr_top_icon.png')}></Image>
                </TouchableOpacity>
                <TouchableOpacity 
                  onPress={()=>this.ctrlClick(tv,'LEFT')}
                  style={[styles.imageWrap,{position: 'absolute',left:0}]}>
                  <Image source={require('../../assets/images/arr_left_icon.png')}></Image>
                </TouchableOpacity>
                <TouchableOpacity 
                  onPress={()=>this.ctrlClick(tv,'RIGHT')}
                  style={[styles.imageWrap,{position: 'absolute',right:0}]}>
                  <Image source={require('../../assets/images/arr_right_icon.png')}></Image>
                </TouchableOpacity>
                <TouchableOpacity 
                  onPress={()=>this.ctrlClick(tv,'DOWN')}
                  style={[styles.imageWrap,{position: 'absolute',bottom:0}]}>
                  <Image source={require('../../assets/images/arr_down_icon.png')}></Image>
                </TouchableOpacity>
            </View>
            <View style={styles.rect}>
                <TouchableOpacity 
                  onPress={()=>this.ctrlClick(tv,'VOL_PLUS')}
                  style={styles.imageWrap}>
                  <Image source={require('../../assets/images/arr_top_icon.png')}></Image>
                </TouchableOpacity>
                <Text style={{color:'#6095f0',fontSize:16}}>音量</Text>
                <TouchableOpacity 
                onPress={()=>this.ctrlClick(tv,'VOL_SUB')}
                style={styles.imageWrap}>
                    <Image source={require('../../assets/images/arr_down_icon.png')}></Image>
              </TouchableOpacity>
            </View>
        </View>
         <View style={[styles.itemWrap,{justifyContent: 'space-around',alignItems:'center'}]}>
           <TouchableHighlight
            onPress={()=>this.ctrlClick(tv,'STOP')}
             style={styles.btn}
           >
             <Text style={{color:'#fff',lineHeight:32,textAlign: 'center',fontSize:16}}>点播</Text>
           </TouchableHighlight>
           <TouchableOpacity
             onPress={()=>this.ctrlClick(tv,'HOME')}>
             <Image source={require('../../assets/images/home_menu.png')}></Image>
           </TouchableOpacity>
           <TouchableHighlight
             onPress={()=>this.ctrlClick(tv,'PLAY')}
             style={styles.btn}
           >
             <Text style={{color:'#fff',lineHeight:32,textAlign: 'center',fontSize:16}}>回看</Text>
           </TouchableHighlight>
         </View>
         <View style={[styles.numWrap]}>
            <View style={styles.numItem}>
              <TouchableOpacity
              onPress={()=>this.ctrlClick(tv,'1')}>
                <Text style={styles.num}>1</Text>
              </TouchableOpacity>
              <TouchableOpacity
              onPress={()=>this.ctrlClick(tv,'2')}>
                <Text style={styles.num}>2</Text>
              </TouchableOpacity>
              <TouchableOpacity
              onPress={()=>this.ctrlClick(tv,'3')}>
                <Text style={styles.num}>3</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.numItem}>
              <TouchableOpacity
              onPress={()=>this.ctrlClick(tv,'4')}>
                <Text style={styles.num}>4</Text>
              </TouchableOpacity>
              <TouchableOpacity
              onPress={()=>this.ctrlClick(tv,'5')}>
                <Text style={styles.num}>5</Text>
              </TouchableOpacity>
              <TouchableOpacity
              onPress={()=>this.ctrlClick(tv,'6')}>
                <Text style={styles.num}>6</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.numItem}>
              <TouchableOpacity
              onPress={()=>this.ctrlClick(tv,'7')}>
                <Text style={styles.num}>7</Text>
              </TouchableOpacity>
              <TouchableOpacity
              onPress={()=>this.ctrlClick(tv,'8')}>
                <Text style={styles.num}>8</Text>
              </TouchableOpacity>
              <TouchableOpacity
              onPress={()=>this.ctrlClick(tv,'9')}>
                <Text style={styles.num}>9</Text>
              </TouchableOpacity>
            </View>
            <View style={{alignItems: 'center'}}>
              <TouchableOpacity
              onPress={()=>this.ctrlClick(tv,'0')}>
                <Text style={styles.num}>0</Text>
              </TouchableOpacity>
            </View>
         </View>
       </View>
     ))
   }
   render() {
     return (
      <ViewSlider
        renderView={this.renderView}
        backgroundImage={require('../../assets/images/tv_bg.png')}
      ></ViewSlider>
     )
   }
 }
 
 const styles = StyleSheet.create({
   viewWrap:{
     width: width,
     height: height,
   },
   mainBtn:{
     width: 50,
     height:50,
     borderRadius:25,
     alignItems: 'center',
     justifyContent:'center'
   },
   swtichBtn:{
     width: 30,
     height: 30,
     borderRadius: 15,
     backgroundColor: '#6095f0',
     alignItems:'center',
     justifyContent:'center'
   },
   itemWrap:{
     flexDirection: 'row',
     justifyContent: 'space-between'
   },
   rect:{
    width:45,height:175,
    borderRadius: 23,
    borderWidth:1,
    borderColor: '#6095f0',
    marginLeft: 10,
    marginRight: 10,
    justifyContent: 'space-between',
    alignItems: 'center'
   },
   imageWrap:{
     width: 44,
     height:44,
     borderRadius:22,
     justifyContent: 'center',
     alignItems: 'center'
   },
   round_bg:{
     width: 190,
     height:190,
     borderRadius:95,
     borderWidth:1,
     borderColor: '#6095f0',
     justifyContent: 'center',
     alignItems: 'center'
   },
   round_small:{
    width: 90,
    height:90,
    borderRadius:45,
    borderWidth:1,
    borderColor: '#6095f0',
    justifyContent: 'center',
     alignItems: 'center'
   },
   ok:{
    width: 60,
    height:60,
    borderRadius:30,
    backgroundColor: '#6095f0',
    justifyContent: 'center',
    alignItems: 'center'
   },
   btn:{
     width: 62,
     height:34,
     borderColor: '#6095f0',
     borderWidth:1,
   },
   numWrap:{
     marginLeft:40,
     marginRight:40,
     marginTop: 40,
     borderTopWidth:1,
     borderColor:'#6095f0',
     paddingLeft: 20,
     paddingRight: 20
   },
   numItem:{
     flexDirection:'row',
     justifyContent: 'space-between'
   },
   num:{
     color: '#FFFFFF',
     fontSize:20,
     textAlign:'center',
     lineHeight:50
   }
 })
 export default TvCtrlPage