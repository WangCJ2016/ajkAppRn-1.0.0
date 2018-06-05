import React from 'react'
import { 
  View,
  Text,
  ScrollView,
  Dimensions,
  ImageBackground
 } from 'react-native'
 import PropTypes, { number } from 'prop-types'
 const { width,height } = Dimensions.get('window')

 class ViewSlider extends React.Component {
   constructor() {
     super()
   }
   
   render() {
     return (
       <ImageBackground style={{flex:1}} source={this.props.backgroundImage}>
        <ScrollView
          horizontal={true}
          pagingEnabled={true}
          >
         {this.props.renderView?this.props.renderView():null}
        </ScrollView>
       </ImageBackground>
     )
   }
 }
 ViewSlider.propTypes={
   length:PropTypes.number,
   renderView:PropTypes.func,
   
 }
 ViewSlider.defaultProps={
   length:1,
   backgroundImage:require('../../assets/images/homectrl_bg.png')
 }
 export default ViewSlider