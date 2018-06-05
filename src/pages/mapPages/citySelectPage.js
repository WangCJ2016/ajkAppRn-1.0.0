import React from 'react'
import { 
  View,
  Text,
  ListView,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
  Dimensions
 } from 'react-native'
import { connect } from 'react-redux'
import { dataSuccess } from '../../reducers/map.redux'
import cities from '../../assets/json/cities.json'
import { pySegSort } from '../../utils/fnUtils'
import ViewUtils from '../../utils/viewUtils'

const {height}  = Dimensions.get('window')
import InphoneXHoc from '../../hoc/inphoneXhoc'

 @InphoneXHoc
@connect(
  state=>({map:state.map}),
  {
    dataSuccess
  }
)
 class CitySelectPage extends React.Component {
   constructor() {
     super()
     this.state = {
      dataSource:null
     }
    this.renderRow = this.renderRow.bind(this)
    this.renderSectionHeader = this.renderSectionHeader.bind(this)
    this.letterRender = this.letterRender.bind(this)
    this.letterClick = this.letterClick.bind(this)
   }
   componentDidMount() {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2
     })
     let allCity = []
     cities.forEach(pro => {
      allCity = [...allCity,...pro.cities]
     })
     let cityData = []
     pySegSort(allCity).map(city => {
      cityData.push({
        [city.letter]:city.data
      })
     })
     this.cityData = cityData
     this.setState({
      cityData:cityData,
      dataSource:ds.cloneWithRowsAndSections(cityData)
     })
   }
   renderSectionHeader(data) {
    return ViewUtils.ListSectionHeader(Object.keys(data)[0])
  }
  renderRow(data) {
    return data.map(city => (
      <TouchableHighlight
      underlayColor={'#ccc'}
      onPress={()=>this.cityClick(city)}
      key={city.name}
      style={{height:40,backgroundColor:'#fff',paddingLeft:10,justifyContent:'center',borderBottomWidth:0.5,borderBottomColor:'#d8d8d8'}}>
       <Text>{city.name}</Text>
     </TouchableHighlight>
    ))
  }
  cityClick(city) {
    this.props.dataSuccess({city:city})
    this.props.navigation.goBack()
  }
  letterRender() {
    return this.state.cityData.map(letter=>(
      <TouchableOpacity 
      onPress={()=>this.letterClick(Object.keys(letter)[0])}
      key={Object.keys(letter)[0]}>
        <Text style={{color:'#ffb354'}}>{Object.keys(letter)[0]}</Text>
      </TouchableOpacity>
    ))
  }
  letterClick(letter) {
    // this.headView.measure((x,y,width,height)=>{
    //   let cityNum=0
    //   let scrollY = 0
    //   this.state.cityData.forEach((data,index) => {
    //     if(Object.keys(data)[0] === letter) {
    //       scrollY=cityNum*40+height+(index)*25
    //     }else{
    //       cityNum+=Object.values(data)[0].length
    //     }
    //   })
    //   this.listview.scrollTo({y:scrollY,animated: true})
    // })
    let cityNum=0
    let scrollY = 0
    this.state.cityData.forEach((data,index) => {
      if(Object.keys(data)[0] === letter) {
        scrollY=cityNum*40+(index)*25
      }else{
        cityNum+=Object.values(data)[0].length
      }
    })
    this.listview.scrollTo({y:scrollY,animated: true})
  }
   render() {
     return (
       <View style={{flex:1}}>
         <View style={{padding:5,position:'absolute',right:0,top:0,height:height,justifyContent:'center',zIndex:99}}>
          {this.state.dataSource?this.letterRender():null}
         </View>
         {
           this.state.dataSource?
           <ListView
          ref={(listview)=>this.listview=listview}
          renderSectionHeader={this.renderSectionHeader}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          
          >
          </ListView>   :null
         }
        
       </View>
     )
  }
}
 export default CitySelectPage