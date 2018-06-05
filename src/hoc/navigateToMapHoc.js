import React from 'react'
import { View,Linking } from 'react-native'
import ActionSheet from 'react-native-actionsheet'

const CANCEL_INDEX = 0
const title = '选择地图类型'

const NavigateToMapHoc = (WrappedCom) => {
  return class newCom extends React.Component {
    constructor() {
      super()
      this.state = {
        actionSheetHandle:'',
        options:['取消']
      }
      this.mapNavigation = this.mapNavigation.bind(this)
      this.openShow = this.openShow.bind(this)
    }
    componentDidMount() {
      Linking.canOpenURL('iosamap://')
      .then(res=>{
        if(res) {
          this.setState({options:[...this.state.options,'高德地图']})
        }
      })
      Linking.canOpenURL('baidumap://')
      .then(res=>{
         if(res) {
          this.setState({options:[...this.state.options,'百度地图']})
         }
        })
     
    }
    mapNavigation(e) {
       if(this.state.options[e] === '高德地图') {
         Linking.openURL(`iosamap://poi?sourceApplication=applicationName&name=${this.state.address}`)
         return 
       }
       if(this.state.options[e] === '百度地图') {
        Linking.openURL(`baidumap://map/place/search?&query=${this.state.address}&src=webapp.poi.yourCompanyName.yourAppName`)
        return 
      }
    }
    openShow(address) {
      this.ActionSheet.show()
      this.setState({
        address: address
      })
    }
    render() {
     
      return (
        <View style={{flex:1}}>
          <WrappedCom openShow={this.openShow.bind(this)} {...this.props}></WrappedCom>
          <ActionSheet
            ref={o => this.ActionSheet = o}
            title={title}
            options={this.state.options}
            cancelButtonIndex={CANCEL_INDEX}  
            onPress={this.mapNavigation}
          />
        </View>
      )
    }
  }
}

export default NavigateToMapHoc