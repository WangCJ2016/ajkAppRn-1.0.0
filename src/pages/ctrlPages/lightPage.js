import React from 'react'
import { 
  View,
  Text,
  TouchableOpacity,
  PanResponder,
  ImageBackground,
  Image,
  StyleSheet,
  Animated,
  LayoutAnimation
 } from 'react-native'
import { quadrant } from '../../utils/fnUtils'
import { connect } from 'react-redux'
import { getDeviceWays,smartHostCtrl,dataSuccess } from '../../reducers/ctrl.redux'

@connect(
  state=>({ctrl:state.ctrl}),
  {
    getDeviceWays,smartHostCtrl,dataSuccess
  }
)
 class LightCtrlPage extends React.Component {
   constructor() {
     super()
     this.state={
       x:100,
       y:100,
       rotateZ:0,
       middle_round_rotate_index:1,
       lightType:'卧室',
       fadeAnim: new Animated.Value(0.25)
     }
     this.currentAngle = 0
     this.onStartShouldSetPanResponder=this.onStartShouldSetPanResponder.bind(this);
      this.onMoveShouldSetPanResponder=this.onMoveShouldSetPanResponder.bind(this);
      this.onPanResponderGrant=this.onPanResponderGrant.bind(this);
      this.onPanResponderMove=this.onPanResponderMove.bind(this);
 
   }
   componentDidMount(){ 
     const houseHostInfo = this.props.ctrl.houseHostInfo
     this.props.getDeviceWays({houseId:houseHostInfo.houseId,deviceType:'SWITCH'})
     this.websocket = new WebSocket("ws://www.live-ctrl.com/aijukex/stServlet.st?serverId="+houseHostInfo.serverId) 
     this.websocket.onmessage = (event) => {
       let lights = this.props.ctrl.deviceWays
        const lightNow = event.data.split('.WAY.')
        const changelihts = lights.map((light, index) => {
          if(light.wayId === lightNow[0]) {
            let newLight = light
            newLight.status = lightNow[1]
          return newLight

          }else {
            return light
          }
      })
      this.props.dataSuccess({deviceWays:changelihts})
     }
    
   }
   componentWillUnmount(){
    this.websocket.close()
   }
   onStartShouldSetPanResponder(evt, gestureState){
    return true;
   }
   
   onMoveShouldSetPanResponder(evt, gestureState){
    return true ;
   }
   onPanResponderGrant(evt, gestureState){   
    this.raduisX=100
    this.raduisY=160
    const moveX = evt.nativeEvent.pageX
    const moveY = evt.nativeEvent.pageY
    const to =((moveX-this.raduisX)/(moveY-this.raduisY))
    const whichquadrant = quadrant(moveX,this.raduisX,moveY,this.raduisY)
    if (whichquadrant === 3) {
       this.currentAngle = Math.atan(to)/( 2 * Math.PI ) * 360 
    } 
    if(whichquadrant === 4){
       this.currentAngle = Math.atan(to)/( 2 * Math.PI ) * 360 + 180
    }
    if(whichquadrant === 2){
      this.currentAngle = Math.atan(to)/( 2 * Math.PI ) * 360 
    }
    if(whichquadrant === 1){
      this.currentAngle = Math.atan(to)/( 2 * Math.PI ) * 360 +180
    }
  }
  onPanResponderMove(evt, gestureState) {
    this.raduisX=100
     this.raduisY=160
    const pageX = evt.nativeEvent.pageX
    const pageY = evt.nativeEvent.pageY
    //判断第几象限
    const whichquadrant = quadrant(pageX,this.raduisX,pageY,this.raduisY)
    const to =((pageX-this.raduisX)/(pageY-this.raduisY))
    let moveAngle
    if (whichquadrant === 3) {
       moveAngle = Math.atan(to)/( 2 * Math.PI ) * 360 
    } 
    if(whichquadrant === 4){
       moveAngle = Math.atan(to)/( 2 * Math.PI ) * 360 + 180
    }
    if(whichquadrant === 2){
      moveAngle = Math.atan(to)/( 2 * Math.PI ) * 360 
    }
    if(whichquadrant === 1){
      moveAngle = Math.atan(to)/( 2 * Math.PI ) * 360 +180
    }
      this.setState({
        rotateZ:(this.state.rotateZ+moveAngle-this.currentAngle)
      },()=>{
        this.currentAngle = moveAngle
      })
  }
 
  componentWillMount(evt, gestureState){
    this._panResponder=PanResponder.create({
      onStartShouldSetPanResponder:this.onStartShouldSetPanResponder,
      onMoveShouldSetPanResponder:this.onMoveShouldSetPanResponder,
      onPanResponderGrant:this.onPanResponderGrant,
      onPanResponderMove:this.onPanResponderMove,
    });
    this._gestureHandlers = {  
      //外部正方形在“捕获期”阻止底层时间成为响应者  
      onStartShouldSetResponderCapture: () => true,  
      onMoveShouldSetResponderCapture: ()=> true, 
    }  
  }
   lightRender() {
     const deviceWays = this.props.ctrl.deviceWays
    return deviceWays.filter(device => device.name.indexOf('灯')>-1)
    .filter(light => light.name.indexOf(this.state.lightType)>-1)
     .map((light,index) => {
       const rotate = -90 + (30*Math.round(index/2))*Math.pow(-1,index+1)
       return (
         <View 
          onStartShouldSetResponderCapture={ () => this.lightClick(light)}
          style={[styles.light,{
          transform:[             
            {
              'rotateZ':rotate+'deg'
            },
          ]
         }]} key={light.id}
         >
          <TouchableOpacity style={[{
            marginTop:-120,
           }]} 
          
          >
          <View style={{
            transform:[             
              {
                'rotateZ':-this.state.rotateZ-rotate+'deg'
              },
            ]
          }}>
          {
            light.status === 'OFF'?
            <ImageBackground style={{width:75,height:75,justifyContent:'center',alignItems: 'center'}} source={require('../../assets/images/light_wrap_bg.png')}>
              <Image source={require('../../assets/images/mianlight_icon.png')}></Image>
              <Text style={{color:'#fff'}}>{light.name.replace(this.state.lightType,'')}</Text>
          </ImageBackground>
          :
          <ImageBackground style={{width:75,height:75,justifyContent:'center',alignItems: 'center'}} source={require('../../assets/images/light_wrap_on.png')}>
              <Image style={{tintColor:'yellow'}} source={require('../../assets/images/mianlight_icon.png')}></Image>
              <Text style={{color:'yellow'}}>{light.name.replace(this.state.lightType,'')}</Text>
          </ImageBackground>
          }
          
          </View>
          </TouchableOpacity>
         </View>
       )
     })
   }
   lightclassRender(){
    const classarray = ['卫生间','卧室','走廊','其他']
    return classarray.map((classs,index) => {
      const rotate =-index*25+30
      const middle_round_rotate=index*25-25
      return (
        <View key={index}
        style={[styles.classTyle,{transform:[
          {
            'rotateZ':rotate+'deg'
          }
        ]}]}>
        <TouchableOpacity
          onPress={this.classTypeClick.bind(this,index,classs)}
          >
          <Text style={[{color:this.state.middle_round_rotate_index===index?'#fff':'#eee',fontSize:this.state.middle_round_rotate_index===index?18:16}]}>{classs}</Text>
        </TouchableOpacity>
        </View>
      )
    })
  }
  classTypeClick(index,classs) {
    LayoutAnimation.spring();
    this.setState({
      middle_round_rotate_index:index,
      lightType:classs,
      rotateZ:0,
      //fadeAnim: new Animated.Value(1.0)
    })
    Animated.timing(
      this.state.fadeAnim,
      {toValue: index*0.25}
    ).start();
  }
  lightClick(light) {
    const houseHostInfo = this.props.ctrl.houseHostInfo
    const status = light.status==='OFF'?'OPEN':'CLOSE'
    this.props.smartHostCtrl({
      houseId: houseHostInfo.houseId,
      deviceType: 'SWITCH',
      actionType: status,
      wayId: light.wayId,
      brightness: 80
    },()=>{
      const deviceWays = this.props.ctrl.deviceWays
      .map(_light=>{
        if(_light.wayId === light.wayId) {
          _light.status = status
        }
        return _light
      })
      this.props.dataSuccess({deviceWays:deviceWays})
    })
  }
   render() {
     return (
      <ImageBackground style={{flex:1}} source={require('../../assets/images/light_bg.png')}>
        <View 
        {...this._panResponder.panHandlers}
        style={{width: 560,
          height: 560,
          justifyContent:'center',
          alignItems: 'center',
          borderRadius: 100,
          backgroundColor: 'rgba(0,0,0,.12)',
          borderRadius:280,
          position: 'absolute',
          alignItems: 'center',
          left:10,
          top:160,
          transform:[
            {
              'rotateZ':this.state.rotateZ+'deg'
            }
          ]
        }}
          >
          {this.lightRender()}
        </View>
        <Animated.View
         style={[styles.middleRound,
          {
            transform:[
              {
                'rotateZ':this.state.fadeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['-25deg', '50deg'] //线性插值，0对应60，0.6对应30，1对应0
                }),
              }
            ]
          }]
         }>
          <ImageBackground style={{width:350,height:350,borderRadius:175,justifyContent:'center',alignItems: 'center',}} source={require('../../assets/images/light_round.png')}>
              <Image source={require('../../assets/images/light_small_round.png')}></Image>
              {this.lightclassRender()}
            </ImageBackground>   
        </Animated.View>
        
      </ImageBackground>
     )
   }
 }
 
 const styles = StyleSheet.create({
   light:{
     width: 68,
     height:280,
     position: 'absolute',
     top:'50%',
     left:'50%',
     marginLeft: -34,
     marginTop: -150
   },
   middleRound:{
     position: 'absolute',
     top:260,
     width:350,height:350,borderRadius:175,justifyContent:'center',alignItems: 'center',
     left:120
   },
   classTyle:{
     position: 'absolute',
     width: 310,
     height:30,
     left:20,
     top:'50%',
     marginTop:-15
   }
 })
 export default LightCtrlPage