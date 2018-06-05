import React from 'react'
import { 
  View,
  Text,
  StyleSheet
 } from 'react-native'
 import PropTypes from 'prop-types'
class Card extends React.Component {
  state = {  }
  render() {
    return (<View style={[styles.agreeMentCell,this.props.style,{backgroundColor:this.props.leftBorderColor}]}>
      <View style={[styles.agreeMentCell_wrap]}>
        <View style={styles.agreeMent_title}>
          {this.props.titleView()}
        </View>
        <View style={styles.agreeMent_content}>
           {this.props.contentView()}
        </View>
      </View>
     </View>)
  }
}

Card.propTypes = {
  leftBorderColor:PropTypes.string,
  titleView: PropTypes.func,
  contentView: PropTypes.func,
  style: PropTypes.object
}
Card.defaultProps = {
  leftBorderColor: '#fff',
  titleView:()=>{},
  contentView:() => {},
  style:{}
}

const styles = StyleSheet.create({
  agreeMentCell:{
    borderRadius:5,
  },
  agreeMentCell_wrap:{
    marginLeft:4,
    backgroundColor:'#fff',
    borderBottomRightRadius:5,
    borderTopRightRadius:5
  },
  agreeMent_title:{
    height:50,
    overflow:'hidden',
    borderBottomColor:'#d8d8d8',
    borderBottomWidth:0.5,
    marginRight:5,
    flexDirection:'row',
    alignItems:'center'
  },
  agreeMent_content:{
    padding: 10
  }
})
export default Card