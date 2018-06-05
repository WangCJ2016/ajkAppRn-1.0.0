import React from 'react'
import { 
  View,
  Text,
  TouchableOpacity,
  StyleSheet
 } from 'react-native'
import PropTypes from 'prop-types'

 class GetVerCode extends React.Component {
   state = { 
     count:60
    }
   render() {
     return (
      <TouchableOpacity 
        style={[styles.verCodeBtn,{
          backgroundColor: this.props.verCodeBtnDisabled?'#fff':'#ffb354',
        }]}
        onPress={this.props.getVerCode}>
        <Text style={{fontSize:14,color: this.props.verCodeBtnDisabled?'#ccc':'#fff',}}>{this.props.count===60?'获取验证码':this.props.count+'s'}</Text>
    </TouchableOpacity>
     )
   }
 }


 GetVerCode.propTypes = {
  getVerCode: PropTypes.func.isRequired,
  verCodeBtnDisabled: PropTypes.bool,
  count: PropTypes.number.isRequired
 }
 GetVerCode.defaultProps = {
  verCodeBtnDisabled:true
 }
 const styles = StyleSheet.create({
  verCodeBtn: {
    alignItems: 'center',
    padding:5,
    borderRadius: 2,
    right:10,
    top:10,
    position: 'absolute'
  }
 })
 export default GetVerCode