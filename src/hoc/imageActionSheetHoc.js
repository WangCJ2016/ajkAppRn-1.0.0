import React from 'react'
import { View,TouchableOpacity,Image,Text } from 'react-native'
import ActionSheet from 'react-native-actionsheet'

const CANCEL_INDEX = 0
const title = '选择图片'
const options = ['取消','拍照','选择相册']

const ImageActionSheetHoc = (WrappedCom) => {
  
  return class Enhance extends React.Component {
    static navigationOptions = WrappedCom.navigationOptions
    constructor() {
      super()
      this.state = {
        ActionSheet: null
      }
      this.optionSelect = this.optionSelect.bind(this)
    }
    componentDidMount() {
      this.setState({
        ActionSheet: this.ActionSheet
      })
    }
    optionSelect(e) {
      this.wrappedComIntance.selectImage(e)
    }
    render() {
      return (
        <View   style={{flex:1}}>
           <WrappedCom 
            ref={(instance)=>this.wrappedComIntance=instance}
             {...this.props} 
             ActionSheet={this.state.ActionSheet}
             ></WrappedCom>
           <ActionSheet
            ref={o => this.ActionSheet = o}
            title={title}
            options={options}
            cancelButtonIndex={CANCEL_INDEX}  
            onPress={this.optionSelect}
          />
        </View>
      )
    }
  }
  
}


export default ImageActionSheetHoc