import React from 'react'
import { 
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView
 } from 'react-native'
import { Modal} from 'antd-mobile'
import { connect } from 'react-redux'
import { landlordHouseDetail } from '../../reducers/longRent.redux'

@connect(
   state=>({longRent: state.longRent}),
   {
     landlordHouseDetail
   }
)
 class RentHousePage extends React.Component {
   constructor() {
     super()
     this.state = {
      visible:false
     }
   }
  static navigationOptions = ({navigation,screenProps}) => ({  
    headerTitle:'房源出租信息',  
    headerRight: (  
        <TouchableOpacity onPress={()=>navigation.navigate('SmartTest')}>
          <View style={{flexDirection:'row',alignItems:'center',marginRight:10}}>
            <Text style={{color:'#3c3c3c'}}>房源检测</Text>
          </View>
        </TouchableOpacity>
    ),  
   })
   componentDidMount() {
     this.props.landlordHouseDetail(this.props.navigation.state.params)
   }
   render() {
    const houseDetail = this.props.longRent.landlordHouseDetailalready
   
     return (
      houseDetail?
      <SafeAreaView style={{flex:1}}>
       <ScrollView>
           <View style={styles.flex_row_center}>
             <View style={styles.leftIcon}></View>
             <View style={styles.titleView}>
                <Text style={{fontSize:16}}>出租人信息</Text>
             </View>
           </View>
           <View style={{paddingLeft:15,paddingRight:15,paddingTop:10,paddingBottom:10,backgroundColor:'#fff'}}>
             <Text style={styles.contentText}>姓名：<Text style={{color:'#000'}}>{houseDetail.record.name?houseDetail.record.name:''}</Text></Text>
             <Text style={styles.contentText}>手机号码：<Text style={{color:'#000'}}>{houseDetail.record.telephone}</Text></Text>
             <Text style={styles.contentText}>入住时间：<Text style={{color:'#000'}}>{houseDetail.record.startTime}</Text></Text>
             <Text style={styles.contentText}>入住房号：<Text style={{color:'#000'}}>{houseDetail.title}</Text></Text>
           </View>
           <View style={[styles.flex_row_center,{marginTop: 15}]}>
             <View style={styles.leftIcon}></View>
             <View style={styles.titleView}>
                <Text style={{fontSize:16}}>租赁合同信息</Text>
             </View>
           </View>
           <View style={{paddingLeft:15,paddingRight:15,paddingTop:10,paddingBottom:10,backgroundColor:'#fff'}}>
             <Text style={styles.contentText}>开始时间：<Text style={{color:'#000'}}>{houseDetail.record.startTime}</Text></Text>
             <Text style={styles.contentText}>结束时间：<Text style={{color:'#000'}}>{houseDetail.record.endTime}</Text></Text>
             <Text style={styles.contentText}>出租人（甲方）：<Text style={{color:'#000'}}>{houseDetail.landlord.name}</Text></Text>
             <Text style={styles.contentText}>承租人（乙方）：<Text style={{color:'#000'}}>{houseDetail.record.name?houseDetail:''}</Text></Text>
             <TouchableOpacity onPress={()=>this.props.navigation.navigate('ContinueAgreeMent',{houseId:houseDetail.id,title:'续签租赁合同'})}>
               <View style={[styles.btnView,{right:90,bottom:5}]}>
                 <Text style={styles.btnText}>续签合同</Text>
               </View>
             </TouchableOpacity>
             <TouchableOpacity onPress={()=>this.setState({visible:true})}>
               <View style={[styles.btnView,{right:0,bottom:5}]}>
                 <Text style={styles.btnText}>终止合同</Text>
               </View>
             </TouchableOpacity>
           </View>
           <View style={[styles.flex_row_center,{marginTop: 15}]}>
             <View style={styles.leftIcon}></View>
             <View style={styles.titleView}>
                <Text style={{fontSize:16}}>平台协议信息</Text>
             </View>
           </View>
           <View style={{paddingLeft:15,paddingRight:15,paddingTop:10,paddingBottom:10,backgroundColor:'#fff'}}>
             <Text style={styles.contentText}>开始时间：<Text style={{color:'#000'}}>{houseDetail.protocolStime}</Text></Text>
             <Text style={styles.contentText}>结束时间：<Text style={{color:'#000'}}>{houseDetail.protocolEtime}</Text></Text>
             <Text style={styles.contentText}>甲方：<Text style={{color:'#000'}}>爱居客网络科技有限公司</Text></Text>
             <TouchableOpacity onPress={()=>this.props.navigation.navigate('ContinueAgreeMent',{houseId:houseDetail.id,title:'续签协议信息'})}>
               <View style={[styles.btnView,{right:0,bottom:5}]}>
                 <Text style={styles.btnText}>续签协议</Text>
               </View>
             </TouchableOpacity>
           </View>
           <Modal
            title={'终止租赁合同'}
            transparent={true}
            maskClosable={true}
            onClose={()=>this.setState({visible:false})}
            visible={this.state.visible}
            footer={[{ text: '取消',style: { color:"#ccc" }, onPress: ()=>this.setState({visible:false}) },
            { text: '确定',style: { fontWeight: 'bold' }, onPress: () => {this.props.navigation.navigate('EndAgreeMent',{recordId:houseDetail.record.id,type:'landlord',title:'终止合同'})} }]}
          >
           <View style={{marginTop:10}}>
             <Text style={{fontSize:15,lineHeight:20,paddingBottom:10}}>您与当前的租客签署的租赁合同未到期，继续操作将违反租赁合同，需要支付违约金</Text>
           </View>
          </Modal>
       </ScrollView>
       </SafeAreaView>
       :null
     )
   }
 }
 
 const styles = StyleSheet.create({
   leftIcon:{
     width: 7,
     height: 19,
     backgroundColor: '#ffb354'
   },
   flex_row_center:{
     flexDirection:'row',
     alignItems:'center',
     backgroundColor:'#fff'
   },
   titleView:{
     flex:1,
     height:40,
     borderColor: '#d8d8d8',
     borderBottomWidth:0.5,
     justifyContent: 'center',
     marginLeft: 10
   },
   contentText:{
     height:25,
     lineHeight:25,
     fontSize: 15,
     color:'#555'
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
 export default RentHousePage