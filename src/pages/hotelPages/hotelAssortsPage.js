import React from 'react'
import { 
  View,
  Text,
  Image,
  StyleSheet
 } from 'react-native'
 import InphoneXHoc from '../../hoc/inphoneXhoc'
 
 @InphoneXHoc
 class HotelAssortPage extends React.Component {
   state = {  }
   assortsRender() {
    const assorts = this.props.navigation.state.params.assorts
    return assorts.map(assort=>{
      const index = assort.indexOf('-')
      const title = assort.slice(0,index)
      const img = assort.slice(index+1)
      return (
        <View key={assort} style={{alignItems:'center',padding:10}}>
            <Image source={{uri:img,width:20,height:20}}></Image>
            <Text style={{marginTop:10}}>{title}</Text>
        </View>
      )
    })
   }
   serviceRender() {
    const services = this.props.navigation.state.params.services
    return services.map(assort=>{
      const index = assort.indexOf('-')
      const title = assort.slice(0,index)
      const img = assort.slice(index+1)
      return (
        <View key={assort} style={{alignItems:'center',padding:10}}>
            <Image source={{uri:img,width:20,height:20}}></Image>
            <Text style={{marginTop:10}}>{title}</Text>
        </View>
      )
    })
   }
   render() {
     return (
       <View style={{backgroundColor: '#FFFFFF',padding:10}}>
         <View style={{borderBottomWidth:.5,borderBottomColor:'#d8d8d8'}}>
          <Text style={styles.title}>智能设施</Text>
         </View>
         <View style={{flexDirection:'row'}}>
         {this.assortsRender()}
         </View>
         <View style={{borderBottomWidth:.5,borderBottomColor:'#d8d8d8'}}>
          <Text style={styles.title}>通用设施</Text>
         </View>
         <View style={{flexDirection:'row'}}>
         {this.serviceRender()}
         </View>
       </View>
     )
   }
 }
 
 const styles = StyleSheet.create({
   title: {
     fontSize: 16,
     padding:10,
   },

 })

 export default HotelAssortPage