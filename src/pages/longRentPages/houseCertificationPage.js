import React from 'react'
import { 
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Platform,
  ScrollView,
  SafeAreaView
 } from 'react-native'
 import { List} from 'antd-mobile'
 import ImagePicker from 'react-native-image-crop-picker'
 import { connect } from 'react-redux'
 import { imgUpload } from '../../reducers/longRent.redux'
 import ImageActionSheetHoc from '../../hoc/imageActionSheetHoc'
 
 const Item = List.Item
 const directionStyles = [
  [
    {
      label: '是',
      value: '1',
    },
    {
      label: '否',
      value: '2',
    }
  ]
]


// @InphoneXHoc
@connect(
  state=>({longRent: state.longRent}),
  {
    imgUpload
  }
)
@ImageActionSheetHoc
class HouseCertificationPage extends React.Component {
  static navigationOptions = ({navigation,screenProps}) => ({   
    title :'资质证明',
    headerRight: (  
        <TouchableOpacity onPress={()=>navigation.state.params.submit()}>
          <View style={{flexDirection:'row',alignItems:'center',marginRight:10}}>
            <Image style={{tintColor:'#ffb354'}} source={require('../../assets/images/next_icon.png')}></Image>
            <Text style={{color:'#ffb354'}}>下一步</Text>
          </View>
        </TouchableOpacity>
    ),  
   })
   constructor(props) {
     super(props)
     this.state = {
      certificateX: props.longRent.houseCertificationInfo.certificateX,
      rentalAptitudeX: props.longRent.houseCertificationInfo.rentalAptitudeX,
      fireAptitudeX: props.longRent.houseCertificationInfo.fireAptitudeX,
      recordAptitudeX: props.longRent.houseCertificationInfo.recordAptitudeX,
     }
     this.selectImage = this.selectImage.bind(this)
     this.onSubmit = this.onSubmit.bind(this)
     this.showActionSheet = this.showActionSheet.bind(this)
   }
   componentDidMount() {
     this.props.navigation.setParams({submit:this.onSubmit})
   }
   componentWillReceiveProps(nextProps) {
     this.setState({
       certificateX: nextProps.longRent.houseCertificationInfo.certificateX,
       rentalAptitudeX: nextProps.longRent.houseCertificationInfo.rentalAptitudeX,
       fireAptitudeX: nextProps.longRent.houseCertificationInfo.fireAptitudeX,
       recordAptitudeX: nextProps.longRent.houseCertificationInfo.recordAptitudeX,
     })
   }
   onSubmit() {
    this.props.navigation.navigate('JoinHouseMes')
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
        this.props.imgUpload(image.path,this.type,'houseCertificationInfo')
      });
   }
    if(e === 2) {
      ImagePicker.openPicker({
        compressImageQuality: 0.1,
        cropping:true
      }).then(images => {
        this.props.imgUpload(images.path,this.type,'houseCertificationInfo')
      });
    } 
  }
   render() {
     return (
      <SafeAreaView style={{flex:1}}>
       <ScrollView>
          <List>
          <Item>
            <Text style={styles.title}>房产证</Text>
            <Text style={[styles.brefText,{marginTop:6}]}>房产证要看到产权人的姓名</Text>
            <TouchableOpacity style={{width:'50%'}} onPress={()=>{this.showActionSheet();this.type='certificateX'}}>
              {
                this.state.certificateX?
                <Image source={{uri: this.state.certificateX,width:60,height:60}} style={{marginTop:10}}></Image>
                :
                <View style={[styles.rect,{marginTop:13,width:60,height:60}]}>
                  <Image source={require('../../assets/images/plus_s_icon.png')}></Image>
                  <Text style={{marginTop:2,color:'#b3b3b3'}}>添加</Text>
                </View>
              }           
            </TouchableOpacity>
          </Item>

          <Item>
            <Text style={styles.title}>出租资质</Text>
            <Text style={[styles.brefText,{marginTop:6}]}>需要上传出租的资质</Text>
            <TouchableOpacity style={{width:'50%'}} onPress={()=>{this.showActionSheet();this.type='rentalAptitudeX'}} >
              {
                this.state.rentalAptitudeX?
                <Image source={{uri: this.state.rentalAptitudeX,width:60,height:60}} style={{marginTop:10}}></Image>
                :
                <View style={[styles.rect,{marginTop:13,width:60,height:60}]}>
                  <Image source={require('../../assets/images/plus_s_icon.png')}></Image>
                  <Text style={{marginTop:2,color:'#b3b3b3'}}>添加</Text>
                </View>
              }
            </TouchableOpacity>
          </Item>

          <Item>
            <Text style={styles.title}>消防资质</Text>
            <Text style={[styles.brefText,{marginTop:6}]}>需要上传房源的消防资质</Text>
            <TouchableOpacity style={{width:'50%'}}  
              onPress={()=>{this.showActionSheet();this.type='fireAptitudeX'}}>
              {
                this.state.fireAptitudeX?
                <Image source={{uri: this.state.fireAptitudeX,width:60,height:60}} style={{marginTop:10}}></Image>
                :
                <View style={[styles.rect,{marginTop:13,width:60,height:60}]}>
                  <Image source={require('../../assets/images/plus_s_icon.png')}></Image>
                  <Text style={{marginTop:2,color:'#b3b3b3'}}>添加</Text>
                </View>
              }
            </TouchableOpacity>
          </Item>

          <Item>
            <Text style={styles.title}>备案资质</Text>
            <Text style={[styles.brefText,{marginTop:6}]}>需要上传房源在公安局的备案资质</Text>
            <TouchableOpacity style={{width:'50%'}}  
              onPress={()=>{this.showActionSheet();this.type='recordAptitudeX'}}
            >
              {
                this.state.recordAptitudeX?
                <Image source={{uri: this.state.recordAptitudeX,width:60,height:60}} style={{marginTop:10}}></Image>
                :
                <View style={[styles.rect,{marginTop:13,width:60,height:60}]}>
                  <Image source={require('../../assets/images/plus_s_icon.png')}></Image>
                  <Text style={{marginTop:2,color:'#b3b3b3'}}>添加</Text>
                </View>
              }
            </TouchableOpacity>
          </Item>
          </List>
        </ScrollView>
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
   title:{
     fontSize: 17
   },
   rect:{
    width: 60,
    height:60,
    borderWidth:1,
    borderColor:'#d8d8d8',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: '#f6f6f6'
  },
   brefText:{
     fontSize:14,
     color:'#808080'
   }
 })

 export default HouseCertificationPage