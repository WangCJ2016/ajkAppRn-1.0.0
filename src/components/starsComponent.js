import React from 'react'
import { 
  View,
  Text,
  Image,
  TouchableOpacity
 } from 'react-native'
 import PropTypes from 'prop-types'
 import { numToArr } from '../utils/fnUtils'

 class StarsComponent extends React.Component { 
   render() {
     const num = this.props.num
     return (
      <View style={{flex:1,flexDirection:'row'}}>
      {numToArr(num).map((_,index)=><TouchableOpacity key={index} disabled={this.props.disabled} onPress={()=>this.props.cb(index)}>
          <Image style={{marginRight:5,width: this.props.width,height:this.props.height}}  source={require('../assets/images/star_full_icon.png')}></Image>
        </TouchableOpacity>)}
      {numToArr(5-num).map((_,index)=><TouchableOpacity key={index} key={index} disabled={this.props.disabled} onPress={()=>this.props.cb(index+num)}>
           <Image style={{marginRight:5,width: this.props.width,height:this.props.height}}  source={require('../assets/images/star_icon.png')}></Image>
        </TouchableOpacity> )}
    </View>
     )
   }
 }

 StarsComponent.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  cb: PropTypes.func,
  disabled: PropTypes.bool
 }
 StarsComponent.defaultProps = {
   width: 14,
   height:13,
   disabled:true 
 }
 export default StarsComponent
 
 
