import React from 'react'
import { 
  View,
  Text,
  StyleSheet,
  Platform,
  Alert,
  AsyncStorage
 } from 'react-native'
 import { List,Button } from 'antd-mobile'
 import ViewUtils from '../../utils/viewUtils'
 import ImagePicker from 'react-native-image-crop-picker'
 import {uploadImage,modifyHeadPicture} from '../../reducers/user.redux'
 import { intialStateSuccess as intialStateSuccessLongRent } from '../../reducers/longRent.redux'
 import {initialStateSuccess as intialStateSuccessUser} from '../../reducers/user.redux'
 import { connect } from 'react-redux'
 
 import InphoneXHoc from '../../hoc/inphoneXhoc'
 import ImageActionSheetHoc from '../../hoc/imageActionSheetHoc'

 
 @InphoneXHoc
 @connect(
   null,
   {
    uploadImage,modifyHeadPicture,intialStateSuccessLongRent,intialStateSuccessUser
   }
 )
 @ImageActionSheetHoc
 class UserSettingPage extends React.Component {
   constructor() {
     super()
     this.state = {
       head:''
     }
     this.logout = this.logout.bind(this)
     this.showActionSheet = this.showActionSheet.bind(this)
     this.selectImage = this.selectImage.bind(this)
     this.goPage = this.goPage.bind(this)
   }
   logout() {
     Alert.alert(
      '确认退出账号吗',
      '',
      [
        {text: '取消'},
        {text: '确定', onPress: () => {
          this.props.intialStateSuccessLongRent()
          this.props.intialStateSuccessUser()
          this.props.navigation.navigate('Login'),AsyncStorage.clear()}
        },
      ],
      { cancelable: false }
    )
   }
   showActionSheet() {
      this.props.ActionSheet.show()
    }
   selectImage(e) {
    if(e === 1) {
      ImagePicker.openCamera({
        compressImageQuality: 0.1,
        cropping:true
      }).then(image => {
        this.props.uploadImage(image.path,'headImg',this.props.modifyHeadPicture)
      });
   }
    if(e === 2) {
      ImagePicker.openPicker({
        compressImageQuality: 0.1,
        cropping:true
      }).then(images => {
        this.props.uploadImage(images.path,images.fileName,this.props.modifyHeadPicture)
      });
    } 
  }
   
  goPage(page) {
     this.props.navigation.navigate(page)
   }
   render() {
     return (
       <View style={{flex:1}}>
            <List>
              {ViewUtils.itemhasArr(require('../../assets/images/ic_qr.png'),'二维码','',20,20)}
            </List>
            
            <List style={{marginTop:10}}>
              {ViewUtils.itemhasArr(require('../../assets/images/ic_user.png'),'身份绑定',()=>this.goPage('Identify'),20,22)}
              {ViewUtils.itemhasArr(require('../../assets/images/ic_head.png'),'头像更换',this.showActionSheet,22,22)}
            </List>
            <List style={{marginTop:10}}>
              {ViewUtils.itemhasArr(require('../../assets/images/ic_tel.png'),'手机绑定',()=>this.goPage('BindPhone'),14,27)}
              {ViewUtils.itemhasArr(require('../../assets/images/ic_lock.png'),'修改密码',()=>this.goPage('ModifyPsw'),20,23)}
            </List>
            <Button type='primary' onClick={this.logout} style={styles.fixBotton}>退出当前账号</Button>
       </View>
     )
   }
 }
 const styles = StyleSheet.create({
  fixBotton:{
     position: 'absolute',
     bottom:0,
     left:0,
     right:0
   }
 })
 export default UserSettingPage