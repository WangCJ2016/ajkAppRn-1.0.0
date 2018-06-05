import React from 'react'
import { 
  View,
  Text,
  Image
 } from 'react-native'

 class HomeTabItem extends React.Component {
   state = {  }
   render() {

     return (
       <View style={{marginTop:14}}> 
         {
           this.props.focused?<Image style={[{width:35,height:35}]} source={require('../assets/images/home.png')} />
           :
           <Image style={[{width:35,height:35}]} source={require('../assets/images/home.png')} />
         }

       </View>
     )
   }
 }
 
 export default HomeTabItem