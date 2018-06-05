import React from 'react'
import { 
  View,
  Text,
  ImageBackground,
  TouchableWithoutFeedback,
  TouchableHighlight,
  Image,
  StyleSheet
 } from 'react-native'
 import { hostScenes,smartHostCtrl } from '../../reducers/ctrl.redux'
 import { connect } from 'react-redux'
 
 @connect(
   state=>({ctrl:state.ctrl}),
   {
    hostScenes,smartHostCtrl
   }
 )
 class ModelPage extends React.Component {
   state = { 
     selectModel:''
   }
   componentDidMount(){
     const houseHostInfo = this.props.ctrl.houseHostInfo
     this.props.hostScenes({
      serverId:houseHostInfo.serverId
     })
   }
   modelClick(name,sceneId) {
     const houseHostInfo = this.props.ctrl.houseHostInfo
     this.setState({
       selectModel: name
     })
     const data = {
        houseId:houseHostInfo.houseId,
        deviceType:'SCENE',
        port:houseHostInfo.port,
        serverId:houseHostInfo.serverId,
        sceneId: sceneId
      }
     this.props.smartHostCtrl(data)
   }
   modelsRender(){
     const models = this.props.ctrl.scenes
     return models.map(model => {
      return  <View style={styles.modelWrap}>
                <TouchableWithoutFeedback
                key={model.id}
                onPress={()=>this.modelClick(model.name,model.sceneId)}
                >
                  <View style={{flex:1,alignItems: 'center',justifyContent:'center'}}>
                    <View style={[styles.imageWrap,
                      {borderColor:this.borderColor(model.name)},
                      {backgroundColor: this.state.selectModel===model.name?this.borderColor(model.name):'transparent'}
                    ]}> 
                    {this.modelImage(model.name)}
                    </View>
                    <Text style={{color: '#FFFFFF',marginTop:10,fontSize:18}}>{model.name.replace('情景',' ')}</Text>
                  </View>
                  </TouchableWithoutFeedback>
              </View>
          
     })
   }
   borderColor(name) {
     switch (name) {
       case '情景影视':
         return '#61bb7b'
       case '情景起床':
        return '#ea7f4c'
       case '情景睡眠':
        return '#db4e79'
       case '情景外出':
        return '#e89544'
       case '情景会客':
        return '#367da3'
       default:
         return '#25b394'
     }
   }
   modelImage(name) {
     switch (name) {
       case '情景影视':
          return <Image source={require('../../assets/images/model_movie_icon.png')}></Image>
       case '情景起床':
        return <Image source={require('../../assets/images/mode_getup_icon.png')}></Image>
       case '情景睡眠':
        return <Image source={require('../../assets/images/model_sleep_icon.png')}></Image>
       case '情景外出':
        return <Image source={require('../../assets/images/model_check_out_icon.png')}></Image>
       case '情景会客':
        return <Image source={require('../../assets/images/model_meet_icon.png')}></Image>
       default:
        return <Image source={require('../../assets/images/model_common_icon.png')}></Image>;
     }
   }
   render() {
     return (
       <ImageBackground style={{flex:1,flexDirection:'row',flexWrap:'wrap'}} source={require('../../assets/images/model_bg.png')}>
          {this.modelsRender()}
       </ImageBackground>
     )
   }
 }
 
 const styles = StyleSheet.create({
   imageWrap:{
     width: 100,
     height: 100,
     borderRadius:10,
     alignItems: 'center',
     justifyContent: 'center',
     borderWidth:2
   },
   modelWrap:{
     width: '50%',
     height: 200,    
     alignItems: 'center',
     justifyContent: 'center'
   }
 })
 export default ModelPage