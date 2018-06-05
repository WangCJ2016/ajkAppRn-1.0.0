import React from 'react'
import { 
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Platform,
  SafeAreaView
 } from 'react-native'
 import { List, InputItem,Toast } from 'antd-mobile'
 import { createForm } from 'rc-form'
 import ImagePicker from 'react-native-image-crop-picker'
 import { connect } from 'react-redux'
 import { imgUpload,dataSuccess,becomLandlord } from '../../reducers/longRent.redux'
 import ImageActionSheetHoc from '../../hoc/imageActionSheetHoc'

 const Item = List.Item
 
 @connect(
  state=>({longRent: state.longRent}),
  {
    imgUpload,dataSuccess,becomLandlord
  }
)
@ImageActionSheetHoc
 class IDInfoPage1 extends React.Component {
   constructor(props) {
     super(props)
     this.state = {
       name: props.longRent.idInfo.name,
       cardNo: props.longRent.idInfo.cardNo,
       cardPictureFront: props.longRent.idInfo.cardPictureFront,
       cardPictureBack: props.longRent.idInfo.cardPictureBack,
     }
     this.handleNext = this.handleNext.bind(this)
   }
  static navigationOptions = ({navigation,screenProps}) => ({    
    headerRight: (  
        <TouchableOpacity onPress={()=>navigation.state.params.handleNext()}>
          <View style={{flexDirection:'row',alignItems:'center',marginRight:10}}>
            <Image style={{tintColor:'#ffb354'}} source={require('../../assets/images/next_icon.png')}></Image>
            <Text style={{color:'#ffb354'}}>下一步</Text>
          </View>
        </TouchableOpacity>
    ),  
   })
   componentDidMount() {
     this.props.navigation.setParams({handleNext:this.handleNext})
   }
   componentWillReceiveProps(nextProps) {
    this.setState({
      cardPictureFront: nextProps.longRent.idInfo.cardPictureFront,
      cardPictureBack: nextProps.longRent.idInfo.cardPictureBack,
    })
   }
   handleNext() {
     //this.props.navigation.navigate('SignAgree')
     this.props.form.validateFields({ force: true }, (error,values) => {
       if(!error) {
        if(!this.state.cardPictureFront) {
          Toast.info('请上传身份证正面')
          return
        }
        if(!this.state.cardPictureBack) {
          Toast.info('请上传身份证反面')
          return
        }
        this.props.becomLandlord({...this.props.longRent.idInfo,name:encodeURI(values.name),cardNo:values.cardNo})
        this.props.navigation.navigate('SignAgree')
       }
     })
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
          this.props.imgUpload(image.path,this.type,'idInfo')
        });
    }
      if(e === 2) {
        ImagePicker.openPicker({
          compressImageQuality: 0.1,
          cropping:true
        }).then(images => {
          this.props.imgUpload(images.path,this.type,'idInfo')
        });
      } 
    }

   render() {
    const { getFieldProps,getFieldError } = this.props.form
     return (
      <SafeAreaView style={{flex:1}}>
       <List>
       
        <InputItem
          {...getFieldProps('name', {
            initialValue: this.state.name,
            rules: [
              { required: true, message: '请输入姓名' },
             // {pattern:/^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/,message: '格式不正确'}
            ],
          })}
          textAlign='right'
          placeholder="张三"
          >
          <View style={{flexDirection:'row',alignItems:'center'}}>
            <Text style={{fontSize:16,marginRight:5}}>姓名</Text>{!!getFieldError('name')?<Image source={require('../../assets/images/att.png')}></Image>:null}
          </View>
        </InputItem>

        <InputItem
            {...getFieldProps('cardNo', {
              initialValue: this.state.cardNo,
              rules: [
                { required: true, message: '请输入身份证号码' },
                {pattern:/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,message: '格式不正确'}
              ],
            })}
            textAlign='right'
            placeholder="填写身份证号码"
            >
            <View style={{flexDirection:'row',alignItems:'center'}}>
            <Text style={{fontSize:16,marginRight:5}}>身份证号</Text>{!!getFieldError('cardNo')?<Image source={require('../../assets/images/att.png')}></Image>:null}
            </View>
        </InputItem>

        <Item>
          <Text>身份证</Text>
          <View style={{marginTop:10,flexDirection:'row',}}>
            <View style={{marginRight:15}}>
              <TouchableOpacity onPress={()=>{this.showActionSheet();this.type='cardPictureFront'}}>
                  <View style={[styles.rect]}>
                    {
                      this.state.cardPictureFront?
                      <Image source={{uri: this.state.cardPictureFront,width:40,height:40}}></Image>
                      :
                      <Image source={require('../../assets/images/puls_icon.png')}></Image>
                    }
                  </View>
              </TouchableOpacity>
              <Text style={{marginTop:6,textAlign:'center',color:'#b3b3b3'}}>正面</Text>
            </View>
            <View>
              <TouchableOpacity 
                onPress={()=>{this.showActionSheet();this.type='cardPictureBack'}}
               >
                  <View style={styles.rect}>
                  {
                    this.state.cardPictureBack?
                    <Image source={{uri: this.state.cardPictureBack,width:40,height:40}}></Image>
                    :
                    <Image source={require('../../assets/images/puls_icon.png')}></Image>
                  }
                  </View>
              </TouchableOpacity>
              <Text style={{marginTop:6,textAlign:'center',color:'#b3b3b3'}}>反面</Text>
            </View>
          </View>
        </Item>
       </List>
       </SafeAreaView>
     )
   }
 }
 const styles = StyleSheet.create({
  flex_row_between:{
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems:'center'
  },
  rect:{
    width: 40,
    height:40,
    borderWidth:1,
    borderColor:'#d8d8d8',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: '#f6f6f6'
  },
  brefText:{
    fontSize:10,
    color:'#808080'
  }
})
 const IDInfoPage = createForm()(IDInfoPage1)
 export default IDInfoPage