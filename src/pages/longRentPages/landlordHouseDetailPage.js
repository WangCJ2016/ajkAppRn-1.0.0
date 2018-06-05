import React from 'react'
import { 
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  Alert,
  DeviceEventEmitter,
  SafeAreaView
 } from 'react-native'
 import { Button,Modal,Toast,NoticeBar } from 'antd-mobile'
 import { connect } from 'react-redux'
 import { landlordHouseDetail } from '../../reducers/longRent.redux'
 import { modifyLandlordHouseStatus } from '../../reducers/longRent-hasRent.redux'
 import { addLintent } from '../../reducers/main.redux'
 import { TransformDepositType,TransfromDecorate,TransformOrientation } from '../../utils/fnUtils'
 import ActionButton from 'react-native-action-button'
 import PhotoAlbumModal from '../../components/photoAlbumModal'
 import NavigateToMapHoc from '../../hoc/navigateToMapHoc'


 @NavigateToMapHoc
 @connect(
    state=>({longRent: state.longRent,user:state.user}),
    {
      landlordHouseDetail,modifyLandlordHouseStatus,addLintent
    }
 )
 class LandlordHouseDetailPage extends React.Component {
  static navigationOptions = ({navigation,screenProps}) => ({  
    headerRight: (
      <View>
      {
        navigation.state.params.DetailFromSource==='landlord'?
         <TouchableOpacity onPress={()=>navigation.navigate('SmartTest')}>
          <View style={{flexDirection:'row',alignItems:'center',marginRight:10}}>
            <Text style={{color:'#3c3c3c'}}>房源检测</Text>
          </View>
        </TouchableOpacity>
        :null
      }
      </View>
      
    ) 
   })
   constructor() {
     super()
     this.state = { 
       visible:false,
       picModalVisible: false
     }
     this.cancelPublish = this.cancelPublish.bind(this)
     this.cancelCb = this.cancelCb.bind(this)
   }
   componentDidMount() {
     this.props.landlordHouseDetail(this.props.navigation.state.params)
     this.props.navigation.setParams({DetailFromSource:this.props.longRent.DetailFromSource})
   }
   cancelPublish() {
     const houseDetail = this.props.longRent.landlordHouseDetailwait
     Alert.alert(
      '确定要取消发布吗？',
      '',
        [
          {text: '取消', onPress: () => {}, style: 'cancel'},
          {text: '确定', onPress: () => {
            this.props.modifyLandlordHouseStatus({houseId:houseDetail.id,type:'cancle'},this.cancelCb);
          }}
        ],
        { cancelable: false }
      )
   }
   cancelCb() {
     this.props.navigation.goBack()
     DeviceEventEmitter.emit('REFRESH')
     Toast.info('已取消发布')
   }
   assortsRender() {
     if(!this.props.longRent.landlordHouseDetailwait.assortsx) {
       return 
     }
    const assorts = this.props.longRent.landlordHouseDetailwait.assortsx.split(',')
    return assorts.map(assort=>{
      const index = assort.indexOf('-')
      const name = assort.slice(0,index)
      const pic = assort.slice(index+1)
     return <View key={name} style={{marginRight:22,alignItems:'center'}}>
            <Image source={{uri: pic,width:22,height:22}} resizeMode='contain'></Image>
            <Text style={{marginTop:5,color:'#aaa'}}>{name}</Text>
        </View>
    })
   }
   loginVertify= (cb) => {
    if(this.props.user.token) {
     cb()
    }else{
      this.props.navigation.navigate('Login')
    }
  }
   render() {
     const houseDetail = this.props.longRent.landlordHouseDetailwait
     return (
       houseDetail?
       <SafeAreaView style={{flex:1}}>
        <View style={{flex:1}}>
        {
          this.props.longRent.DetailFromSource==='landlord'?
          <ActionButton buttonColor="rgba(231,76,60,1)" style={{zIndex:99}}>
            <ActionButton.Item buttonColor='#9b59b6' title="取消发布" onPress={this.cancelPublish}>
              <Image source={require('../../assets/images/cancel_publish.png')}></Image>
            </ActionButton.Item>
            <ActionButton.Item buttonColor='#3498db' title="线下租房" onPress={()=>this.props.navigation.navigate('OffLineLease',{houseId: houseDetail.id })}>
              <Image source={require('../../assets/images/xianxia_rent.png')}></Image>
            </ActionButton.Item>
          </ActionButton>
          :null
        }
          
       <ScrollView>
        {
          this.props.longRent.DetailFromSource==='passShenHe'?
          <NoticeBar mode="closable" icon={null}>我们将安装智能设备，并确认房源信息</NoticeBar>
          :null
        }
         <TouchableOpacity onPress={()=>this.setState({picModalVisible: true})}>
            <Image style={{width:'100%',height:170}} source={{uri: houseDetail.pictures.split(',')[0]}}></Image>
         </TouchableOpacity>
         <View style={[{paddingLeft:15,paddingRight:15,backgroundColor:'#fff'},styles.border_bottom]}>
           <View style={[styles.flex_row_center]}>
            <Text style={[styles.houseName,{flex:1}]} numberOfLines={1}>{houseDetail.title}</Text>
            <Text style={[styles.houseName,{color:'#f2080d'}]}>¥{houseDetail.rent}/月</Text>
           </View> 
           <View style={[{height:50},styles.flex_row_center]}>
             {
              houseDetail.depositType?
              <View style={styles.advantage}>
                <Text style={{color:'#555'}}>{TransformDepositType(houseDetail.depositType)}</Text>
              </View>:null
             }
             {
              houseDetail.decorate?
              <View style={styles.advantage}>
                <Text style={{color:'#555'}}>{TransfromDecorate(houseDetail.decorate)}</Text>
              </View>:null
             }
             {
              houseDetail.orientation?
              <View style={styles.advantage}>
                <Text style={{color:'#555'}}>{TransformOrientation(houseDetail.orientation)}</Text>
              </View>:null
             }
           </View>
           <View style={[styles.flex_row_center,styles.border_bottom,{paddingTop:10,paddingBottom:10}]}>
           {
            houseDetail.area? 
            <View style={{flexDirection:'row',alignItems:'center'}}>
            <Text style={styles.text_green}>{houseDetail.area}㎡</Text>
            <View style={styles.border_right}></View>
            </View>
            :null
           }
            {
              houseDetail.layout?
              <View style={{flexDirection:'row',alignItems:'center'}}>
                <Text style={styles.text_green}>{houseDetail.layout}</Text>
                <View style={styles.border_right}></View>
              </View>
              :null
            }
           </View>
           <TouchableHighlight underlayColor='#aaa' onPress={()=>this.props.openShow(houseDetail.detailAddress)}>
              <View style={[{height:55,},styles.flex_row_center,styles.border_bottom]}>
                  <Image source={require('../../assets/images/loc_icon2.png')}></Image>
                  <Text style={{marginLeft:15,fontSize:15}}>{houseDetail.address.split('-').slice(-2).join('-') + houseDetail.detailAddress}</Text>
              </View>
           </TouchableHighlight>
           <View style={styles.border_bottom}>
              <View style={[{height:55,},styles.flex_row_center]}>
                <Image source={require('../../assets/images/house_icon.png')}></Image>
                <Text style={{marginLeft:15,fontSize:17}}>房源介绍</Text>
              </View>
              <Text style={{marginLeft:30,lineHeight:20,color:'#555',marginBottom:20}} numberOfLines={5}>
                 {houseDetail.profile}
              </Text>
           </View>
           <View  style={[{paddingBottom:20},styles.border_bottom]}>
            <View style={[{height:55,},styles.flex_row_center]}>
                <Image source={require('../../assets/images/peitao.png')}></Image>
                <Text style={{marginLeft:15,fontSize:17}}>配套设施</Text>
            </View>
            <ScrollView horizontal={true} contentContainerStyle={[styles.flex_row_center]}>
              <View style={[{marginLeft:28,flexWrap:'nowrap',flex:1},styles.flex_row_center]}>
                 {this.assortsRender()}
              </View>
            </ScrollView>
           </View>
           <View style={[{paddingBottom:20},styles.border_bottom]}>
            <View style={[{height:55,},styles.flex_row_center]}>
                <Image source={require('../../assets/images/fujia.png')}></Image>
                <Text style={{marginLeft:15,fontSize:17}}>附加信息</Text>
             </View>
             <Text style={{marginLeft:28,color:'#555',fontSize:15}}>{houseDetail.additional}</Text>
           </View>
           {
            this.props.longRent.DetailFromSource==='landlord'?
            <View style={[{paddingBottom:20},styles.border_bottom]}>
              <View style={[{height:55,},styles.flex_row_center]}>
                  <Image source={require('../../assets/images/xieyi.png')}></Image>
                  <Text style={{marginLeft:15,fontSize:17}}>协议信息</Text>
              </View>
              <View style={{marginLeft:28}}>
                <Text style={styles.protoclText}>开始时间：<Text style={{color:'#000'}}>{houseDetail.protocolStime}</Text></Text>
                <Text style={styles.protoclText}>结束时间：<Text style={{color:'#000'}}>{houseDetail.protocolEtime}</Text></Text>
                <Text style={styles.protoclText}>甲方：<Text style={{color:'#000'}}>爱居客网络科技邮箱公司</Text></Text>
                <Text style={styles.protoclText}>乙方：<Text style={{color:'#000'}}>{houseDetail.landlord.name}</Text></Text>
              </View>
              <TouchableOpacity onPress={()=>this.props.navigation.navigate('ContinueAgreeMent',{houseId:houseDetail.id,title:'续签协议信息'})}>
                <View style={[styles.btnView,{right:90,bottom:-4}]}>
                  <Text style={styles.btnText}>续签协议</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>this.setState({visible:true})}>
                <View style={[styles.btnView,{right:0,bottom:-4}]}>
                  <Text style={styles.btnText}>终止协议</Text>
                </View>
              </TouchableOpacity>
           </View>:null
           }
           
         </View>
         {
          this.props.longRent.DetailFromSource==='search'?
          <View style={{padding:10,marginTop:10,backgroundColor:'#fff'}}>
           <Button type='primary' onClick={()=> this.loginVertify(()=>this.props.addLintent({houseId: houseDetail.id,landlordId: houseDetail.landlord.id},()=>Toast.info('已预约')) )}>预约看房</Button>
         </View>
         :null 
         }
         
         <Modal
            title={'终止租赁合同'}
            transparent={true}
            maskClosable={true}
            onClose={()=>this.setState({visible:false})}
            visible={this.state.visible}
            footer={[{ text: '取消',style: { color:"#ccc" }, onPress: ()=>this.setState({visible:false}) },
            { text: '确定',style: { fontWeight: 'bold' }, onPress: () => {this.props.navigation.navigate('EndAgreeMent',{houseId:houseDetail.id,type:'landlord',type:'down',title:'终止协议'})} }]}
          >
           <View style={{marginTop:10}}>
             <Text style={{fontSize:15,lineHeight:20,paddingBottom:10}}>您与签署的协议未到期，继续操作将违反协议，需要支付违约金</Text>
           </View>
          </Modal>
        </ScrollView>
        <PhotoAlbumModal 
          pics={houseDetail.pictures.split(',')}
          visible={this.state.picModalVisible}
          onClose={()=>this.setState({picModalVisible: false})}
        />

        </View>
       </SafeAreaView>
       :null
     )
   }
 }
 
 const styles = StyleSheet.create({
   houseName:{ 
     fontSize: 17,  
     color: '#ff9c40',
     marginTop: 15,
     marginBottom: 15
   },
   advantage:{
     paddingLeft:5,
     paddingRight:5,
     justifyContent: 'center',
     borderColor: "#555",
     height:30,
     borderWidth:1,
     borderRadius: 3,
     marginRight: 10
   },
   border_bottom:{
     borderColor: '#d8d8d8',
     borderBottomWidth:0.5
   },
   flex_row_center:{
     flexDirection:'row',
     alignItems:'center'
   },
   border_right:{
     height:10,
     width:0.5,
     backgroundColor:'#d8d8d8'
   },
   text_green:{
     color:'#4acb18',
     fontSize:14,
     marginLeft: 15,
     marginRight:15
   },
   protoclText:{
     lineHeight:25,
     fontSize:15,
     color: '#555'
   },
   btnView:{
    position: 'absolute',
    borderColor:'#ff9c40',
    borderWidth:1,
    borderRadius: 2,
    padding: 5
  },
  btnText:{
    fontSize: 16,
    color:'#ff9c40'
  }
 })
 export default LandlordHouseDetailPage