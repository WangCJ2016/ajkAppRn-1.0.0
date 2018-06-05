import React from 'react'
import { SafeAreaView } from 'react-native'

const InphoneXHoc = (WrappedCom) => {
  return class newCom extends React.Component {
    render() {
      return (
        <SafeAreaView style={{flex:1}}>
           <WrappedCom {...this.props}></WrappedCom>
        </SafeAreaView>
      )
    }
  }
}


export default InphoneXHoc