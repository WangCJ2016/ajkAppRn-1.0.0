import React from 'react'
import { 
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  LayoutAnimation,
  Dimensions,
  SafeAreaView
 } from 'react-native'
 import { Checkbox,Modal,Toast } from 'antd-mobile'
 import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
 import Card from '../../components/card'
 import { createForm } from 'rc-form'
 import { connect } from 'react-redux'
 import { dataSuccess,endAgreementDevices } from '../../reducers/longRent.redux'
 const HEIGHT = Dimensions.get('window').height
 //import InphoneXHoc from '../../hoc/inphoneXhoc'
 
 //@InphoneXHoc
 @connect(
   state => ({longRent: state.longRent}),
   {
    dataSuccess,endAgreementDevices
   }
 )
 class SignAgreePage extends React.Component {
   constructor(props) {
     super(props)
     this.state = {
       marginTop:0,
       curtainVisible: false,
       airVisible:false,
       tvVisible:false,
       lightVisible: false,
       agreeMentCheck:true,
      //  wireCount: props.longRent.deviceOrderData.wireCount,
      //  wireMeter: props.longRent.deviceOrderData.wireMeter,
      //  airCount: props.longRent.deviceOrderData.airCount,
      //  airInfrareCount: props.longRent.deviceOrderData.airInfrareCount,
      //  airType: props.longRent.deviceOrderData.airType,
      //  tvCount: props.longRent.deviceOrderData.tvCount,
      //  tvInfrareCount: props.longRent.deviceOrderData.tvInfrareCount,
      //  lightCount: props.longRent.deviceOrderData.lightCount,
      //  lightInfrareCount: props.longRent.deviceOrderData.lightInfrareCount,
       wirePriceTotal:0,
       tvPriceTotal:0,
       airPriceTotal:0,
       ligthPriceTotal:0
     }
     this.config = {  
      duration: 150,  
      create: {  
        type: LayoutAnimation.Types.easeOut,  
        property: LayoutAnimation.Properties.opacity,  
      },  
      update: {  
        type: LayoutAnimation.Types.easeInEaseOut,  
      }  
    };  
     this.curtainSubmit = this.curtainSubmit.bind(this)
     this.airSubmit = this.airSubmit.bind(this)
     this.tvSubmit = this.tvSubmit.bind(this)
     this.lightSubmit = this.lightSubmit.bind(this)
     this.handleNext = this.handleNext.bind(this)
    //  this._keyboardDidShow = this._keyboardDidShow.bind(this)
    //  this._keyboardDidHide = this._keyboardDidHide.bind(this)
   }
  static navigationOptions = ({navigation,screenProps}) => ({  
      title: '签署协议',    
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
    this.props.endAgreementDevices()
    // this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow)  
    // this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide)  
  }
  // componentWillUnmount() {  
  //   this.keyboardDidShowListener.remove();  
  //   this.keyboardDidHideListener.remove();  
  // }  
  // _keyboardDidShow(e) {
  //   if(this.state.airVisible) {
  //     this.keyWrap.measure((x,y,width,height,px,py)=>{
  //       let moveY = HEIGHT - py - e.startCoordinates.height - height
  //       if(moveY<0) {
  //         LayoutAnimation.configureNext(this.config)
  //         this.setState({  
  //           marginTop: -moveY   
  //         })
  //       }
  //     })
  //   }
  // }
  // _keyboardDidHide() {
  //   this.setState({  
  //     marginTop:0   
  //   });  
  // }
  handleNext() {
    if(this.state.agreeMentCheck) {
      const endAgreementDevices = this.props.longRent.endAgreementDevices
      const totalPrice = endAgreementDevices['基础套餐'].profile - 0 + this.state.airPriceTotal + this.state.tvPriceTotal + this.state.ligthPriceTotal + this.state.wirePriceTotal 
      this.props.dataSuccess({
        deviceOrderData: {
          ...this.props.longRent.deviceOrderData,
          wireCount: this.state.wireCount,
          wireMeter: this.state.wireMeter,
          airCount: this.state.airCount,
          airInfrareCount: this.state.airInfrareCount,
          airType: this.state.airType,
          tvCount: this.state.tvCount,
          tvInfrareCount: this.state.tvInfrareCount,
          lightCount: this.state.lightCount,
          lightInfrareCount: this.state.lightInfrareCount,
          totalPrice: totalPrice
        }
      })
      this.props.navigation.navigate('HouseCertification')
    }else{
      Toast.info('请先阅读并同意《委托协议》《房源上线标准》')
    }
  }
  curtainSubmit(e) {
     this.setState({
        curtainVisible:false,
        wireCount:this.state._wire,
        wireMeter:this.state._wireMeter,
        wirePriceTotal: this.state.wirePrice+ this.state.wireMeterPrice,
      })
  }
  airSubmit(e) {
      this.setState({
        airVisible:false,
        airCount: this.state._air,
        airInfrareCount: this.state._airInfrare,
        airPriceTotal: this.state.airPrice+ this.state.airInfrarePrice
      })
  }
  tvSubmit(e) {
      this.setState({
        tvVisible:false,
        tvCount: this.state._tv,
        tvInfrareCount: this.state._tvInfrare,
        tvPriceTotal: this.state.tvPrice+ this.state.tvInfrarePrice
      })
  }
  lightSubmit(e) {
      this.setState({
        lightVisible:false,
        lightCount: this.state._light,
        lightInfrareCount: this.state._lightInfrare,
        lightPriceTotal: this.state.lightPrice+ this.state.lightInfrarePrice
      })
  }
   render() {
     const endAgreementDevices = this.props.longRent.endAgreementDevices
     const totalPrice = endAgreementDevices?endAgreementDevices['基础套餐'].profile - 0 + this.state.airPriceTotal + this.state.tvPriceTotal + this.state.ligthPriceTotal + this.state.wirePriceTotal:0
 
     return (endAgreementDevices?
      <SafeAreaView style={{flex:1}}>
       <View style={{flex:1}}>
        <ScrollView style={{flex:1,paddingLeft:10,paddingRight:10}}>
            <Card 
              leftBorderColor='#ff9c40'
              style={{marginTop: 10}}
              titleView={()=>(
                <View style={styles.spaceBetween}>
                  <View style={{flexDirection:'row',flex:1}}>
                    <Text style={styles.font_bold}>基础套餐</Text>
                    <Text style={{color:'#f5a2a2'}}>{endAgreementDevices['基础套餐'].profile}元/间</Text> 
                  </View> 
                  <Checkbox  checked={true} />
                </View>
                )}
                contentView={()=>(
                 <View>
                    <View>
                      <View style={[styles.flex_row_center,{height:30}]}>
                          <View style={[styles.pot]}></View>  
                          <Text style={[styles.content_text,{marginLeft:10,marginRight:10}]}>智能门锁</Text>  
                          <View style={styles.pot}></View>  
                          <Text style={[styles.content_text,{marginLeft:10,marginRight:10}]}>智能主机</Text>  
                          <View style={styles.pot}></View>  
                          <Text style={[styles.content_text,{marginLeft:10,marginRight:10}]}>智能用电传感器</Text>  
                      </View> 
                      <View style={[styles.flex_row_center,{height:30}]}>
                          <View style={[styles.pot]}></View>  
                          <Text style={[styles.content_text,{marginLeft:10,marginRight:10}]}>用电安全监测与识别后台管理系统</Text>    
                      </View> 
                      <View style={[styles.flex_row_center,{height:30}]}>
                          <View style={[styles.pot]}></View>  
                          <Text style={[styles.content_text,{marginLeft:10,marginRight:10}]}>APP移动端平台软件</Text>    
                      </View> 
                    </View> 
                </View>  
              )}
            />

            <Text style={styles.title}>可添加</Text>

            <Card 
              leftBorderColor='#24b7c0'
             
              titleView={()=>(
                <View style={styles.spaceBetween}>
                  <View style={{flexDirection:'row',flex:1,alignItems:'center'}}>
                    <Image  source={require('../../assets/images/chuanglian_icon.png')}/>
                    <Text style={[styles.font_bold,{marginLeft:5}]}>电动窗帘</Text> 
                    <Text style={{fontSize:13,color:'#808080'}}>(可以在手机上控制窗帘开关)</Text>  
                  </View> 
                  <Checkbox style={{padding:10}}  checked={!!(this.state.wireCount>0)&&!!(this.state.wireMeter>0)} onChange={(e)=>this.setState({curtainVisible:!this.state.curtainVisible})}/>
                </View>
              )}
              contentView={()=>(
                <View>
                  <Text style={[styles.font_bold,{fontWeight:'400'}]}>窗帘电机+电动窗帘轨道</Text> 
                  <View style={{flexDirection:'row',marginTop:15}}>
                    <View style={styles.potWrap}>
                      <View style={styles.pot}></View> 
                    </View> 
                    <Text style={[styles.content_text,{fontSize:15,marginLeft:10}]}><Text style={{color:'#ffb354'}}>窗帘电机</Text>与您一个窗户上的窗帘相关联，窗户上为一个窗帘，电机为1个；窗户上为两个窗帘，电机为2个</Text> 
                  </View>  
                  <View style={{flexDirection:'row',marginTop:10}}>
                    <View style={styles.potWrap}>
                      <View style={styles.pot}></View> 
                    </View> 
                    <Text style={[styles.content_text,{fontSize:15,marginLeft:10}]}><Text style={{color:'#ffb354'}}>电动窗帘轨道</Text>为您窗帘的米数，不足一米按照一米去计算，如窗帘为4.6米，实际需要5米</Text> 
                  </View>   
                </View>  
              )}
            />

            <Card 
              leftBorderColor='#309fda'
              style={{marginTop: 10}}
              titleView={()=>(
                <View style={styles.spaceBetween}>
                  <View style={{flexDirection:'row',flex:1,alignItems:'center'}}>
                    <Image  source={require('../../assets/images/kongtiao_icon.png')}/>
                    <Text style={[styles.font_bold,{marginLeft:5}]}>空调</Text> 
                    <Text style={{fontSize:13,color:'#808080'}}>(控制空调/调节空调温度/取代空调遥控器)</Text>  
                  </View> 
                  <Checkbox checked={!!(this.state.airCount>0)&&!!(this.state.airInfrareCount>0)}  onChange={(e)=>this.setState({airVisible:!this.state.airVisible})}/>
                </View>
              )}
              contentView={()=>(
                <View>
                  <Text style={[styles.font_bold,{fontWeight:'400'}]}>空调面板+360度红外转发器</Text> 
                  <View style={{flexDirection:'row',marginTop:15}}>
                    <View style={styles.potWrap}>
                      <View style={styles.pot}></View> 
                    </View> 
                    <Text style={[styles.content_text,{fontSize:15,marginLeft:10}]}><Text style={{color:'#ffb354'}}>空调面板</Text>为添加空调必备的设备，一个空调需要一个空调面板</Text> 
                  </View>  
                  <View style={{flexDirection:'row',marginTop:10}}>
                      <View style={styles.potWrap}>
                        <View style={styles.pot}></View> 
                      </View> 
                    <Text style={[styles.content_text,{fontSize:15,marginLeft:10}]}><Text style={{color:'#ffb354'}}>360度红外转发器</Text>一个房间需要安装一个，可以控制这个房间的所有设备，包括电视，空调</Text> 
                  </View>   
                </View>  
              )}
            />

            <Card 
              leftBorderColor='#45c463'
              style={{marginTop: 10}}
              titleView={()=>(
                <View style={styles.spaceBetween}>
                  <View style={{flexDirection:'row',flex:1,alignItems:'center'}}>
                    <Image  source={require('../../assets/images/tv_icon1.png')}/>
                    <Text style={[styles.font_bold,{marginLeft:5}]}>电视</Text> 
                    <Text style={{fontSize:13,color:'#808080'}}>(调节电视机顶盒/节目选择/取代电视、机顶盒遥控)</Text>  
                  </View> 
                  <Checkbox checked={!!(this.state.tvCount>0)&&!!(this.state.tvInfrareCount>0)}  onChange={(e)=>this.setState({tvVisible:!this.state.tvVisible})} />
                </View>
              )}
              contentView={()=>(
                <View>
                  <Text style={[styles.font_bold,{fontWeight:'400'}]}>智能电感+360度红外转发器</Text> 
                  <View style={{flexDirection:'row',marginTop:15}}>
                    <View style={styles.potWrap}>
                      <View style={styles.pot}></View> 
                    </View> 
                    <Text style={[styles.content_text,{fontSize:15,marginLeft:10}]}><Text style={{color:'#ffb354'}}>电视面板</Text>为智能电视必备设备，一个电视需要一个电视面板</Text> 
                  </View>  
                  <View style={{flexDirection:'row',marginTop:10}}>
                      <View style={styles.potWrap}>
                        <View style={styles.pot}></View> 
                      </View> 
                    <Text style={[styles.content_text,{fontSize:15,marginLeft:10}]}><Text style={{color:'#ffb354'}}>360度红外转发器</Text>一个房间需要安装一个，可以控制这个房间的所有设备，包括电视，空调</Text> 
                  </View>   
                </View>  
              )}
            />

            <Card 
              leftBorderColor='#f4d421'
              style={{marginTop: 10}}
              titleView={()=>(
                <View style={styles.spaceBetween}>
                  <View style={{flexDirection:'row',flex:1,alignItems:'center'}}>
                    <Image  source={require('../../assets/images/ligth_icon.png')}/>
                    <Text style={[styles.font_bold,{marginLeft:5}]}>灯</Text> 
                    <Text style={{fontSize:13,color:'#808080'}}>(可以在手机上控制灯的开关)</Text>  
                  </View> 
                  <Checkbox checked={!!(this.state.lightCount>0)&&!!(this.state.lightInfrareCount)}  onChange={(e)=>this.setState({lightVisible:!this.state.lightVisible})}/>
                </View>
              )}
              contentView={()=>(
                <View>
                  <Text style={[styles.font_bold,{fontWeight:'400'}]}>智能开关面板+红外人体感应器</Text> 
                  <View style={{flexDirection:'row',marginTop:15}}>
                    <View style={styles.potWrap}>
                      <View style={styles.pot}></View> 
                    </View> 
                    <Text style={[styles.content_text,{fontSize:15,marginLeft:10}]}><Text style={{color:'#ffb354'}}>智能开关面板</Text>为智能灯必备设备，一个房间需要一个开关面板</Text> 
                  </View>  
                  <View style={{flexDirection:'row',marginTop:10}}>
                      <View style={styles.potWrap}>
                        <View style={styles.pot}></View> 
                      </View> 
                    <Text style={[styles.content_text,{fontSize:15,marginLeft:10}]}><Text style={{color:'#ffb354'}}>红外人体感应器</Text>为在红外人体感应器感应到有人的状态下，自动开启灯光，检测到无人，在指定时间内自动关闭，一个房间需要一个红外人体感应</Text> 
                  </View>   
                </View>  
              )}
            />

         </ScrollView>

         <View style={styles.countBottom}>
           <Checkbox checked={this.state.agreeMentCheck} onChange={(e)=>this.setState({agreeMentCheck:e.target.checked})}></Checkbox>
           <View style={{marginLeft:10,height:50,justifyContent:'space-between'}}>
             <Text style={{color:'#555'}}>我已经阅读并同意<Text style={{color:'#f2080d'}}>《委托协议》</Text></Text>
             <Text style={{color:'#f2080d'}}>《房源上线标准》</Text>
             <View style={{flexDirection:'row'}}><Image source={require('../../assets/images/att.png')}></Image><Text style={{fontSize:11,color:'#808080'}}>金额价格仅供参考，正式安装之时多退少补</Text></View>
           </View>   
           <View style={{width:95,backgroundColor:'#ff9c40',height:'100%',justifyContent:'center',alignItems:'center'}}>
             <Text style={{color:'#fff',fontSize:16}}>合计</Text>
             <Text style={{color:'#fff',fontSize:16,fontWeight:'bold'}}>¥{totalPrice}</Text>
           </View>
         </View>

         

        <Modal
          title="电动窗帘"
          transparent={true}
          visible={this.state.curtainVisible}
          footer={[{ text: '取消',style: { color:"#ccc" },onPress:()=>this.setState({curtainVisible:false}) },
          { text: '确定',style: { fontWeight: 'bold' }, onPress:()=>this.curtainSubmit() }]}
         >
         {
           endAgreementDevices['窗帘'].attrs.map(item => (
            <View key={item.id} style={[styles.modelView,{borderBottomColor:'#d8d8d8',borderBottomWidth:0.5}]}>
              <Text style={{fontSize:15,color:this.state['_'+item.type]>0?'#333':'red'}}>{item.title}</Text>
              <TextInput 
                defaultValue={this.state['_'+item.type]}
                style={styles.modelTextInput} 
                keyboardType='numeric' 
                placeholder={item.title} onChangeText={(e)=>this.setState({['_'+item.type]:e,[item.type+'Price']:e*item.price})}></TextInput>
            </View>
           ))
         }
          
          
        </Modal>
       
        <Modal
          title="空调"
          transparent
          maskClosable={false}
          visible={this.state.airVisible}
          footer={[{ text: '取消',style: { color:"#ccc" }, onPress: ()=>this.setState({airVisible:false}) },
          { text: '确定',style: { fontWeight: 'bold' }, onPress:()=>this.airSubmit() }]}
         >
         {
          endAgreementDevices['空调'].attrs.map(item => (
           <View key={item.id} style={[styles.modelView,{borderBottomColor:'#d8d8d8',borderBottomWidth:0.5}]}>
             <Text style={{fontSize:15,color:this.state['_'+item.type]>0?'#333':'red'}}>{item.title}</Text>
             <TextInput 
               defaultValue={this.state['_'+item.type]}
               style={styles.modelTextInput} 
               keyboardType='numeric' 
               placeholder={item.title} onChangeText={(e)=>this.setState({['_'+item.type]:e,[item.type+'Price']:e*item.price})}></TextInput>
           </View>
          ))
        }
         
        </Modal>
      
        <Modal
          title="电视"
          transparent
          maskClosable={false}
          visible={this.state.tvVisible}
          footer={[{ text: '取消',style: { color:"#ccc" }, onPress: ()=>this.setState({tvVisible:false}) },
          { text: '确定',style: { fontWeight: 'bold' }, onPress:()=>this.tvSubmit() }]}
         >
         {
          endAgreementDevices['电视'].attrs.map(item => (
           <View key={item.id} style={[styles.modelView,{borderBottomColor:'#d8d8d8',borderBottomWidth:0.5}]}>
             <Text style={{fontSize:15,color:this.state[item.type]>0?'#333':'red'}}>{item.title}</Text>
             <TextInput 
               defaultValue={this.state['_'+item.type]}
               style={styles.modelTextInput} 
               keyboardType='numeric' 
               placeholder={item.title} onChangeText={(e)=>this.setState({['_'+item.type]:e,[item.type+'Price']:e*item.price})}></TextInput>
           </View>
          ))
        }
         
        </Modal>

        <Modal
          title="灯"
          transparent
          maskClosable={false}
          visible={this.state.lightVisible}
          footer={[{ text: '取消',style: { color:"#ccc" }, onPress: ()=>this.setState({lightVisible:false}) },
          { text: '确定',style: { fontWeight: 'bold' }, onPress:()=>this.lightSubmit() }]}
         >
         {
          endAgreementDevices['灯'].attrs.map(item => (
           <View key={item.id} style={[styles.modelView,{borderBottomColor:'#d8d8d8',borderBottomWidth:0.5}]}>
             <Text style={{fontSize:15,color:this.state['_'+item.type]>0?'#333':'red'}}>{item.title}</Text>
             <TextInput 
               defaultValue={this.state['_'+item.type]}
               style={styles.modelTextInput} 
               keyboardType='numeric' 
               placeholder={item.title} onChangeText={(e)=>this.setState({['_'+item.type]:e,[item.type+'Price']:e*item.price})}></TextInput>
           </View>
          ))
        }
         
        </Modal>
       </View>
       </SafeAreaView>:null
     )
   }
 }
 
 const styles = StyleSheet.create({
   modelView:{
    padding:10,flexDirection:'row',alignItems:'center',justifyContent:'space-between',height:50
   },
   modelTextInput:{
    flex:1,textAlign:'right'
   },
   spaceBetween:{
     flexDirection:'row',
     justifyContent: 'space-between',
     paddingLeft: 10,
     paddingRight: 10
   },
   font_bold:{
     fontSize: 16,
     fontWeight: 'bold',
     marginRight:10
   },
   potWrap:{
    height:12,justifyContent:'center'
   },
   pot:{
     width: 4,
     height: 4,
     borderRadius: 2,
     backgroundColor: '#d8d8d8'
   },
   flex_row_center:{
     flexDirection:'row',
     alignItems:'center'
   },
   content_text:{
     color:'#555',
     fontSize:15,
     lineHeight:20
   },
   title:{
     marginLeft:15,
     height:40,
     lineHeight:40,
     fontSize:16,
     color:'#808080'
   },
   countBottom:{
     flexDirection:'row',
     justifyContent:'space-between',
     alignItems:'center',
     backgroundColor:'#fff',
     height:80,
     paddingLeft:15,
     borderColor: '#d8d8d8',
     borderTopWidth:0.5
   }
 })


 export default SignAgreePage