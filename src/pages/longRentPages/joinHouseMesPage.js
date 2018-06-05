import React from 'react'
import { 
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  DeviceEventEmitter,
  Alert,
  SafeAreaView,
 } from 'react-native'
 import  { List,Checkbox, TextareaItem, Button, Picker, InputItem, Modal,Toast } from 'antd-mobile'
 import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
 import cityData from '../../assets/json/city-data.json'
 import {decorateStyles,huxingStyles,directionStyles,yanjinStyles,rentStyles} from '../../utils/dataUtils'
 import { createForm } from 'rc-form'
 import ViewUtils from '../../utils/viewUtils'
 import { connect } from 'react-redux'
 import { dataSuccess,addLandlordHouse,houseAssorts,modifyLandlordHouse,modifyDeviceOrder,modifyHouseAptitudes,delLandlordHouse } from '../../reducers/longRent.redux'
 const Item = List.Item

 @connect(
   state=>({longRent: state.longRent}),
   {
     dataSuccess,addLandlordHouse,houseAssorts,modifyLandlordHouse,modifyDeviceOrder,modifyHouseAptitudes,delLandlordHouse
   }
 )
 class JoinHouseMesPage1 extends React.Component {
  
   
   constructor(props) {
     super(props)
     this.state = {
      payType: props.longRent.deviceOrderData.payType,
      visible: false,
      address:props.longRent.rentHouseInfo.address.split('-'),
      assorts:props.longRent.rentHouseInfo.assorts.split(','),
      pictures:props.longRent.rentHouseInfo.pictures.split(','),
      layout:props.longRent.rentHouseInfo.layout?props.longRent.rentHouseInfo.layout.split(','):'',
      decorate:props.longRent.rentHouseInfo.decorate?[props.longRent.rentHouseInfo.decorate+'']:'',
      orientation:props.longRent.rentHouseInfo.orientation?[props.longRent.rentHouseInfo.orientation+'']:'',
      rent:props.longRent.rentHouseInfo.rent,
      detailAddress:props.longRent.rentHouseInfo.detailAddress,
      depositType:props.longRent.rentHouseInfo.depositType?[props.longRent.rentHouseInfo.depositType+'']:'',
      leastIn:props.longRent.rentHouseInfo.leastIn,
      title:decodeURI(props.longRent.rentHouseInfo.title),
      profile:decodeURI(props.longRent.rentHouseInfo.profile),
      additional:decodeURI(props.longRent.rentHouseInfo.additional),
      leaseMode:props.longRent.rentHouseInfo.leaseMode?[props.longRent.rentHouseInfo.leaseMode+'']:'',
      area:props.longRent.rentHouseInfo.area,
     }
     this.handleNext = this.handleNext.bind(this)
     this.onClose = this.onClose.bind(this)
     this.assortsRender = this.assortsRender.bind(this)
     this.payTypeSubmit = this.payTypeSubmit.bind(this)
     this.deleteHouse = this.deleteHouse.bind(this)
   }
   componentDidMount() {
     this.props.navigation.setParams({handleNext:this.handleNext})
     this.props.houseAssorts()
   }
   
   componentWillReceiveProps(nextProps) {
      this.setState({
        assorts: nextProps.longRent.rentHouseInfo.assorts.split(','),
        additional:decodeURI(nextProps.longRent.rentHouseInfo.additional),
        profile:decodeURI(nextProps.longRent.rentHouseInfo.profile),
        pictures: nextProps.longRent.rentHouseInfo.pictures.split(',').filter(v=>!!v)
      })
   }
   onClose() {
    this.setState({
      visible: false
    })
   }
   handleNext() {
    this.props.form.validateFields({ force: true }, (error,values) => {
      if(!error) {
        if(this.props.longRent.rentHouseInfo.pictures.length===0) {
          Toast.info('请选择房源图片')
          return
        }
        if(!this.state.address) {
          Toast.info('请选择房源所在地')
          return
        }
        if(!this.state.leaseMode) {
          Toast.info('请选择房源出租方式')
          return
        }
        if(!this.state.depositType) {
          Toast.info('请选择押金方式')
          return
        }
        if(this.state.assorts.length===0) {
          Toast.info('请选择配套设施')
          return
        }
        if(!this.state.title) {
          Toast.info('请为您的房源填写一个名字')
          return
        }
        if(!this.state.profile) {
          Toast.info('请为您的房源介绍')
          return
        }
        
       
        this.props.dataSuccess({ 
          rentHouseInfo:{
          ...this.props.longRent.rentHouseInfo,
          pictures:this.props.longRent.rentHouseInfo.pictures,
          address:this.state.address.map(v=>encodeURI(v)).join('-'),
          detailAddress:encodeURI(values.detailAddress),
          leaseMode:this.state.leaseMode?encodeURI(this.state.leaseMode.join(',')):'',
          assorts:this.state.assorts?this.state.assorts.join(','):'',
          area:values.area,
          layout:this.state.layout?this.state.layout.map(a=>encodeURI(a)).join(','):'',
          decorate:this.state.decorate?this.state.decorate.join(','):'',
          orientation:this.state.orientation?this.state.orientation.join(','):'',
          rent:values.rent,
          depositType:this.state.depositType?this.state.depositType.join(','):'',
          leastIn:values.leastIn,
          title:encodeURI(this.state.title),
          additional:encodeURI(this.state.additional),
          profile:encodeURI(this.props.longRent.rentHouseInfo.profile)
        }})
      }
    })
    
    
    if(this.props.longRent.houseStatus === 5||this.props.longRent.houseStatus === 2 || this.props.longRent.houseStatus === 11 ) {
      this.props.modifyLandlordHouse(()=>{this.props.navigation.goBack();DeviceEventEmitter.emit('REFRESH')})
      return 
    }else{
      this.setState({
        visible: true
      })
    }
   
   }
   payTypeSubmit(values) {
    if(!this.state.payType) {
      Toast.info('请选择支付方式')
      return
    }
    this.props.dataSuccess({
      deviceOrderData: {
        ...this.props.longRent.deviceOrderData,
        payType: this.state.payType
      }
    })

    if(this.props.longRent.houseStatus === 1||this.props.longRent.houseStatus === 12) {
      this.props.modifyLandlordHouse(()=>{
        this.props.navigation.navigate('PayInfo');
      })
      return 
    }

    this.props.addLandlordHouse(()=>{this.props.navigation.navigate('PayInfo');DeviceEventEmitter.emit('REFRESH')})
   }
   payTypeChange(payType,e) {
     if(e.target.checked) {
       this.setState({
        payType: payType
       })
     }
   }
   assortsRender() {
     const assorts = this.state.assorts
     const selectHouseAssorts = this.props.longRent.houseAssorts.filter(item => assorts.indexOf(item.id)>-1
      )
     return selectHouseAssorts.map(assort => (
        <View key={assort.id} style={styles.shebeiItem}>
          <Image source={{uri: assort.icon,width:22,height:22}} resizeMode='contain'></Image>
          <Text>{assort.title}</Text>
        </View>
     ))
   }
   deleteHouse() {
    Alert.alert(
      '确认删除此房源',
      '删除后房源将不能恢复',
      [
        {text: '取消', onPress: () => {}},
        {text: '确认', onPress: () => this.props.delLandlordHouse(()=>{Toast.info('已删除');this.props.navigation.goBack();DeviceEventEmitter.emit('REFRESH')})},
      ],
      { cancelable: false }
    )
   }
   render() {
     const { getFieldProps,getFieldError } = this.props.form
     return (
      <SafeAreaView style={{flex:1}}>
       <View style={{flex:1}}>
       {
        this.props.longRent.houseStatus===1||this.props.longRent.houseStatus===12?
        <TouchableOpacity 
         onPress={this.deleteHouse}
         style={{position:'absolute',right:10,bottom:50,zIndex:99}}>
            <View  style={{justifyContent:'center',alignItems:'center',width: 50,height:50,borderRadius:25,backgroundColor:'rgba(255,179,84,.8)'}}>
              <Text style={{color:'#fff',fontSize:16}}>删除</Text>
            </View>
         </TouchableOpacity>:null
       }
         
         <KeyboardAwareScrollView>     
          <TouchableHighlight underlayColor='#ccc' onPress={()=>this.props.navigation.navigate('AddPic')}>
            <View>
            {
              this.props.longRent.rentHouseInfo.pictures.length>0?
              <Image source={{uri: this.state.pictures[0]}} style={{height:170,width:'100%'}}></Image>
              :
              <View style={{height:170,justifyContent:'center',alignItems:'center',backgroundColor:'#fff'}}>
                <Image source={require('../../assets/images/pic.png')}></Image>
                <Text style={{fontSize:15,color:'rgb(152,152,152)',marginTop:15}}>添加房源图片</Text>
            </View>
            }
            {
              (this.props.longRent.auditFail&&this.props.longRent.auditFail.indexOf(1)>-1)?
              <Text style={{position:'absolute',color:'#f2080d',fontSize:16,left:0,right:0,textAlign:'center',bottom:'20%'}}>需修改</Text>
              :null
            }
            </View>
          </TouchableHighlight>

          {ViewUtils.houseMesTitle(require('../../assets/images/loc_icon2.png'),'地区')}
          <List>
            <Picker
              data={cityData}
              title="选择地区"
              extra={<Text style={{color:'#ccc',fontSize:17}}>请选择</Text>}
              value={this.state.address}
              onChange={v => this.setState({ address: v })}
              >
              <Item arrow="horizontal" >
                  请选择房源所在地区及国家 
              </Item>
            </Picker>
            
            <InputItem
              {...getFieldProps('detailAddress', {
                initialValue: this.state.detailAddress,
                rules: [
                  { required: true, message: '请输入姓名' },
                //  {pattern:/^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/,message: '格式不正确'}
                ],
              })}
              textAlign='right'
              placeholder="请输入详细地址"
              >
              <View style={{flexDirection:'row',alignItems:'center'}}>
              <Text style={{
                fontSize:16,marginRight:5,
                color:(this.props.longRent.auditFail&&this.props.longRent.auditFail.indexOf(2)>-1)?
                '#f2080d':'#333'
              }}>详细地址</Text>{!!getFieldError('detailAddress')?<Image source={require('../../assets/images/att.png')}></Image>:null}
              </View>
            </InputItem>
            
          </List>

            {ViewUtils.houseMesTitle(require('../../assets/images/house_icon.png'),'房源详情')}

          <List>
            <InputItem
              {...getFieldProps('area', {
                initialValue: this.state.area,
                rules: [
                  { required: true, message: '请输入姓名' }
                ],
              })}
              textAlign='right'
              placeholder="请输入房间面积"
              >
              <View style={{flexDirection:'row',alignItems:'center'}}>
              <Text style={{fontSize:16,marginRight:5,
                color:(this.props.longRent.auditFail&&this.props.longRent.auditFail.indexOf(5)>-1)?
                '#f2080d':'#333'}}>房间面积</Text>{!!getFieldError('area')?<Image source={require('../../assets/images/att.png')}></Image>:null}
              </View>
            </InputItem>

            <Picker
              data={huxingStyles}
              title="房源户型"
              cascade={false}
              extra={<Text style={{color:'#ccc',fontSize:17}}>请选择</Text>}
              value={this.state.layout}
              onChange={v => this.setState({ layout: v })}
             >
              <Item arrow="horizontal" extra={'请选择房源户型'} >
                房源户型 <Text style={{color:'rgb(179,179,179)'}}>(选填)</Text>
              </Item>
            </Picker>
            
            <Picker
              data={decorateStyles}
              title="装修风格"
              cascade={false}
              extra={<Text style={{color:'#ccc',fontSize:17}}>请选择</Text>}
              value={this.state.decorate}
              onChange={v => this.setState({ decorate: v })}
              >
              <Item arrow="horizontal" extra={'请选择装修风格'}  >
                装修风格<Text style={{color:'rgb(179,179,179)'}}>(选填)</Text>
              </Item>
            </Picker>
            
            <Picker
              data={directionStyles}
              title="房屋朝向"
              cascade={false}
              extra={<Text style={{color:'#ccc',fontSize:17}}>请选择</Text>}
              value={this.state.orientation}
              onChange={v => this.setState({ orientation: v })}
              >
              <Item arrow="horizontal" extra={'请选择房屋朝向'}>
                房屋朝向<Text style={{color:'rgb(179,179,179)'}}>(选填)</Text>
              </Item>
            </Picker>
             
            <Item arrow="horizontal" extra={'房源将提供的配套设施'}   onClick={()=>{this.props.navigation.navigate('DeviceChoose')}}>
            配套设施 
            </Item>
            <View style={{flexDirection:'row',flexWrap:'wrap',paddingLeft:15,paddingRight:15,alignItems:'center'}}>
             {this.assortsRender()}
            </View>

          </List>

          {ViewUtils.houseMesTitle(require('../../assets/images/zuyong_icon.png'),'租用信息')}

          <List>
          <Picker
            data={rentStyles}
            title="出租方式"
            cascade={false}
            extra={<Text style={{color:'#ccc',fontSize:17}}>请选择</Text>}
            value={this.state.leaseMode}
            onChange={v => {this.setState({ leaseMode: v })}}
            >
            <Item arrow="horizontal" extra={'请选择出租方式'}   >
              出租方式 
            </Item>
          </Picker>         

          <Picker
            data={yanjinStyles}
            title="押金方式"
            cascade={false}
            extra={<Text style={{color:'#ccc',fontSize:17}}>请选择</Text>}
            value={this.state.depositType}
            onChange={v => {this.setState({ depositType: v })}}
            >
            <Item arrow="horizontal" extra={'请选择押金方式'}   >
            押金方式 
            </Item>
          </Picker>            
          <InputItem
            {...getFieldProps('rent', {
              initialValue: this.state.rent,
              rules: [
                { required: true, message: '请输入月租金' }
              ],
            })}
            textAlign='right'
            placeholder="请输入月租金"
            >
            <View style={{flexDirection:'row',alignItems:'center'}}>
            <Text style={{fontSize:16,marginRight:5,
              color:(this.props.longRent.auditFail&&this.props.longRent.auditFail.indexOf(6)>-1)?
              '#f2080d':'#333'
            }}>月租金</Text>{!!getFieldError('rent')?<Image source={require('../../assets/images/att.png')}></Image>:null}
            </View>
          </InputItem>      

          <InputItem
            {...getFieldProps('leastIn', {
              initialValue: this.state.leastIn+'',
              rules: [
                { required: true, message: '请输入月租金' }
              ],
            })}
            textAlign='right'
            placeholder="请输入最短入住时间"
            extra='/月'
            >
            <View style={{flexDirection:'row',alignItems:'center'}}>
            <Text style={{fontSize:16,marginRight:5}}>最短入住时间</Text>{!!getFieldError('leastIn')?<Image source={require('../../assets/images/att.png')}></Image>:null}
            </View>
          </InputItem>

          </List>

          {ViewUtils.houseMesTitle(require('../../assets/images/gaikuang_icon.png'),'房源概况')}

          <List>

            <View>
              <Text style={{fontSize:15,color:'rgb(85,85,85)',marginTop:20,marginLeft:10}}>为你的房源起个名字(5-20字)</Text>
              <TextareaItem style={{fontSize:15}}  placeholder='例如：武林广场 精装房 租' onChange={(e)=>this.setState({title:e})} value={this.state.title}></TextareaItem>
            </View>

            <TouchableHighlight 
              underlayColor='#ccc'
              onPress={()=>this.props.navigation.navigate('HouseInfo')}
              style={{borderBottomColor:'#ddd',borderBottomWidth:0.5,paddingBottom:10}}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                  <View style={{flex:1}}>
                  <Text style={{fontSize:15,marginTop:20,marginLeft:10,
                  color:(this.props.longRent.auditFail&&this.props.longRent.auditFail.indexOf(2)>-1)?
                  '#f2080d':'rgb(85,85,85)'
                }}>房源介绍(50-500字)</Text>
                  <Text style={{fontSize:15,color:'#ccc',marginTop:15,marginLeft:10}} numberOfLines={1} >{this.state.profile?this.state.profile:'可以介绍房源的大概位置，结构、基础设施、装修风格、周边信息等'}</Text>
                  </View>
                <Image style={{marginRight:15}} source={require('../../assets/images/right_arr_icon.png')}></Image>
                </View>
            </TouchableHighlight>

            <View style={{marginBottom:15}}>
              <Text style={{fontSize:15,color:'rgb(85,85,85)',marginTop:20,marginLeft:10,marginBottom:5}}>附加条件(选填)</Text>
              <TextareaItem style={{fontSize:16,lineHeight:25,color:'rgb(85,85,85)'}} autoHeight placeholder='填写个人条件，例如：只招女生，不能用宠物等' value={this.state.additional} onChange={(e)=>this.setState({additional:e})}></TextareaItem>
            </View>

          </List>

          <Modal
            title="设备支付方式"
            transparent
            maskClosable={false}
            visible={this.state.visible}
            onClose={this.onClose}
            footer={[{ text: '取消',style: { color:"#ccc" }, onPress: () => {this.onClose(); } },
            { text: '确定',style: { fontWeight: 'bold' }, onPress: () => this.payTypeSubmit()} ]}
           >
            <View style={{padding:10,paddingTop:20,flexDirection:'row',alignItems:'center',justifyContent:'space-between',borderBottomColor:'#d8d8d8',borderBottomWidth:0.5}}>
              <Text style={{fontSize:15}}>直接购买</Text>
              <Checkbox checked={this.state.payType===2} onChange={this.payTypeChange.bind(this,2)}></Checkbox>
            </View>
            <View style={{padding:10,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
              <Text style={{fontSize:15}}>支付押金</Text>
              <Checkbox checked={this.state.payType===1} onChange={this.payTypeChange.bind(this,1)}></Checkbox>
            </View> 
          </Modal>
         </KeyboardAwareScrollView>
       </View>
       </SafeAreaView>
     )
   }
 }
 
 const styles = StyleSheet.create({
   shebeiItem:{
    flexDirection:'row',paddingLeft:5,paddingRight:5,alignItems:'center',height:40
   }
 })

 JoinHouseMesPage1.navigationOptions = ({navigation,screenProps}) => ({  
  headerRight: (  
      <TouchableOpacity onPress={()=>navigation.state.params.handleNext()}>
        <View style={{flexDirection:'row',alignItems:'center',marginRight:10}}>
          <Text style={{color:'#ffb354',fontSize:16}}>发布</Text>
        </View>
      </TouchableOpacity>
   ),  
 })
 const JoinHouseMesPage = createForm()(JoinHouseMesPage1)
 export default JoinHouseMesPage