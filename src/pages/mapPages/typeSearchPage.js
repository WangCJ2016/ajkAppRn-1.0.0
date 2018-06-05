import React from 'react'
import { 
  View,
  Text,
  StyleSheet,
  SectionList,
  TouchableHighlight
 } from 'react-native'
 import {typeSearch,dataSuccess} from '../../reducers/map.redux'
 import { connect } from 'react-redux'
 import ViewUtils from '../../utils/viewUtils'
const ITEM_HEIGHT = 40
import InphoneXHoc from '../../hoc/inphoneXhoc'

 @InphoneXHoc
@connect(
  state=>({map:state.map}),
  {
    typeSearch,dataSuccess
  }
)
 class TypeSearchPage extends React.Component {
  static navigationOptions = ({navigation}) => ({
      title: '区域位置'
  });
   constructor(props) {
     super(props)
    
     this.state = {
       type:'景点',
     }
     //this.props.navigation.setParams({title:this.props.map.city})
     this.renderRow = this.renderRow.bind(this)
     this.renderSectionHeader = this.renderSectionHeader.bind(this)
   }
   componentDidMount() {
     this.props.typeSearch({
      keywords: this.state.type,
      types:this.state.type,
      city:'杭州',
      children:1,
      offset:100,
      page:1,
      extensions:'base'
     })
   }
   typeClick(type) {
     this.setState({
       type:type
     },()=>{
      this.props.typeSearch({
        keywords: this.state.type,
        types:this.state.type,
        city:'杭州',
        children:1,
        offset:100,
        page:1,
        extensions:'base'
       })
     })
   }
   typeArrRender() {
     const arr = ['景点','公交站','地铁站','商圈','行政区','医院']
    return arr.map(type=>(
       <View key={type} style={{height:40}}>
         <Text 
         style={[{textAlign: 'center',lineHeight:40},
         {backgroundColor: this.state.type===type?'#fff':'transparent'},
         {color:this.state.type===type?'#ffb354':'#333'}]} onPress={()=>this.typeClick(type)}>{type}</Text>
       </View>
     ))
   }
   renderSectionHeader(data) {
    return ViewUtils.ListSectionHeader(data.section.key)
   }
   renderRow(data) {
     const item = data.item
     return  <TouchableHighlight 
         key={item.name}
         style={{padding: 10}}
         underlayColor='#ccc'
         onPress={()=>this.chooseLocaltion(item.name)}>
         <Text>{item.name.replace('('+this.state.type+')','')}</Text>
       </TouchableHighlight>
    
   }
   chooseLocaltion(name) {
     this.props.dataSuccess({chooseLocaltion:name})
     if(this.props.modal) {
       this.props.modalAction(name)
     }else{
       this.props.navigation.navigate('NearbySearch')
     }
   }
   keyExtractor(item) {
    return item.id
  }
   render() {
     return (
        <View style={{flex:1}}>
           <View style={styles.typeLeft}>
           {this.typeArrRender()}
           </View>
           {
            this.props.map.typeData?
              <SectionList
              style={styles.chooseRight}
              renderSectionHeader={this.renderSectionHeader}
              sections={this.props.map.typeData}
              renderItem={this.renderRow}
              keyExtractor={this.keyExtractor}
            />
            :null
           }
        </View>
     )
   }
 }
 
const styles = StyleSheet.create({
  typeLeft: {
    position: 'absolute',
    left:0,
    top:0,
    bottom:0,
    width: 90
  },
  chooseRight: {
    flex: 1,
    marginLeft: 90,
    backgroundColor: '#FFFFFF'
  }
})

 export default TypeSearchPage

