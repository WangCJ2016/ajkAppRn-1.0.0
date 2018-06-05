import React from 'react'
import { 
  View,
  Text,
  Image,
  TouchableHighlight,
 } from 'react-native'
import PropTypes from 'prop-types'

 class ListCell extends React.Component {
   state = {  }
   render() {
     return (
      <TouchableHighlight onPress={()=>{this.props.cb()}} >
        <View style={{padding:10,flexDirection:'row',backgroundColor: '#faf9f9',alignItems:'center',borderBottomWidth:0.5,borderColor:'#d8d8d8'}}>
          <Image source={{uri:this.props.image,width:75,height:60}}></Image>
          <View style={{marginLeft:10,flex:1,justifyContent:'space-between',height:60}}>
            <Text numberOfLines={1} style={[{color:'#ababab'},this.props.p1Style]}>{this.props.p1}</Text>
            <Text numberOfLines={1} style={[{color:'#ababab'},this.props.p2Style]}>{this.props.p2}</Text>
            <Text numberOfLines={1} style={[{color:'#ababab'},this.props.p3Style]}>{this.props.p3}</Text>
          </View>
          {this.props.rightRender?this.props.rightRender():null}
        </View>
    </TouchableHighlight>
     )
   }
 }
 
 ListCell.propTypes = {
   image:PropTypes.string,
   p1:PropTypes.string,
   p2:PropTypes.string,
   p3:PropTypes.string,
   p1Style:PropTypes.object,
   p2Style:PropTypes.object,
   p3Style:PropTypes.object,
   cb:PropTypes.func,
   rightRender:PropTypes.func
 }
 ListCell.defaultProps = {
   cb:()=>{}
 }
 export default ListCell