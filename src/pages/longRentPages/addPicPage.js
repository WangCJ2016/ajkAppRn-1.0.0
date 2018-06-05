import React from 'react'
import { 
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Platform,
  Dimensions,
 } from 'react-native'
 import { Button } from 'antd-mobile'
 import { connect } from 'react-redux'
 import { imgUpload,delPic,dataSuccess } from '../../reducers/longRent.redux'
 import InphoneXHoc from '../../hoc/inphoneXhoc'
 import ImagePicker from 'react-native-image-crop-picker'
 import ActionSheet from 'react-native-actionsheet'
 import ImageActionSheetHoc from '../../hoc/imageActionSheetHoc'
 const {width} = Dimensions.get('window')
 


 @InphoneXHoc
 @connect(
  state=>({longRent: state.longRent}),
  {
    delPic,imgUpload,dataSuccess
  }
)
@ImageActionSheetHoc
 class AddPicPage extends React.Component {
   
   constructor(props) {
     super(props)
     this.showActionSheet = this.showActionSheet.bind(this)
     this.selectImage = this.selectImage.bind(this)
     this.del = this.del.bind(this)
   }
   showActionSheet() {
    this.props.ActionSheet.show()
  }
   selectImage(e) {
     if(e === 1) {
        ImagePicker.openCamera({
          compressImageQuality: 0.1
        }).then(image => {
          this.props.imgUpload(image.path,'cameraImg','rentHouseInfo')
        });
     }
      if(e === 2) {
        ImagePicker.openPicker({
          multiple: true,
          compressImageQuality: 0.1
        }).then(images => {
          images.forEach(img=>{
            this.props.imgUpload(img.path,img.filename,'rentHouseInfo')
          })
        });
    }
 
   }
   del(pic) {
     this.props.delPic(pic)
   }
   render() {
     const pictures = this.props.longRent.rentHouseInfo.pictures.split(',').filter(v=>v!=='')
     return (
     
       <View style={{flex:1}} >
           {pictures.length>0?
            <ScrollView style={{flex:1,padding:15}}>
                   <View>
                     <Image source={{uri:pictures[0],width:width-30,height:150}}></Image>
                     <TouchableOpacity onPress={()=>this.del(pictures[0])} style={{position:'absolute',right:-10,top:-10}}>
                      <Image  source={require('../../assets/images/x_icon.png')}></Image>
                     </TouchableOpacity>
                   </View> 
                   <View style={{flexDirection:'row',justifyContent:'space-between',flexWrap:'wrap'}}>
                    {pictures.map((pic,index) => {
                        if(index===0) {
                          return
                        }
                      return <View key={pic} style={{marginTop:10}}>
                        <Image  source={{uri:pic,width:(width-40)/2,height:100}}></Image>
                        <TouchableOpacity onPress={()=>this.del(pic)} style={{position:'absolute',right:-10,top:-10}}>
                          <Image  source={require('../../assets/images/x_icon.png')}></Image>
                        </TouchableOpacity>
                      </View> 
                      }
                      )}
                   </View>
            </ScrollView>:
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <Image source={require('../../assets/images/pic.png')}></Image>
                <Text style={{marginTop:40,fontSize:15,color:'#2496d8'}}>快去上传你的房源吧</Text>
            </View>
          }
           <View style={{padding:10,backgroundColor:'#fff'}}>
             <Button type='primary' onClick={this.showActionSheet}>添加照片</Button>
           </View>
       </View>
     )
   }
 }
 
 export default AddPicPage