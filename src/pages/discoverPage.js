import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  WebView
} from 'react-native';
import Calendar from 'react-native-whc-calendar'

 class DiscoverPage extends React.Component {
   state = {
    numbers: [1,2,4],
    obj:{a:1}
   }
   handleClick() {
     const obj = this.state.obj
     obj.b=2
     this.setState({
      obj: obj
     })
   }
    render() {
      return (
        <View style={styles.container}>
          <WebView source={{uri:'http://m.amap.com/around/?&keywords=美食,KTV,地铁站,公交站&defaultIndex=3&defaultView=&searchRadius=5000&key=db834b40077df1a9574a3faf3cd17f72'}}></WebView>
        </View>
      );
      }
 }
 const styles = StyleSheet.create({
  container: {
    flex: 1,
   
  },
  
});
 export default DiscoverPage
