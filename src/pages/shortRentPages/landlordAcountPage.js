import React from 'react'
import { 
  View,
  Text,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Button,
  SafeAreaView
 } from 'react-native'
 import ScrollableTabView,{ScrollableTabBar} from 'react-native-scrollable-tab-view'
 import Calendar from '../../components/rn-date-picker/Calendar'
import { connect } from 'react-redux' 
import { monthIncome,dayIncome } from '../../reducers/shortRent.redux'
import { dateFormat } from '../../utils/fnUtils'
import viewUtils from '../../utils/viewUtils'
import Modal from "react-native-modal"
const ITEM_HEIGHT = 117

@connect(
  state => ({landlord: state.landlord}),
  {
    monthIncome,dayIncome
  }
)
 class LandLoadAccountPage extends React.Component {
    static navigationOptions = ({navigation,screenProps}) => ({  
      headerTitle: '我的收入',    
      headerRight: (  
        <TouchableOpacity onPress={()=>navigation.state.params.openModal()}>
          <ImageBackground style={{width:20,height:21,marginRight:10,justifyContent:'center'}} source={require('../../assets/images/calendar_icon.png')}>
            <Text style={{textAlign: 'center',fontSize:12,color: '#ababab'}}>{navigation.state.params?navigation.state.params.month:0}</Text>
          </ImageBackground>
        </TouchableOpacity>
      ),  
    })
   constructor(props) {
     super(props)
      this.state = {
        modalVisible:false,
        selectYear:new Date().getFullYear(),
        selectMonth:new Date().getMonth()+1
      };
      this.openModal = this.openModal.bind(this)
      this.onModalHide = this.onModalHide.bind(this)
      props.navigation.setParams({openModal:this.openModal,month:this.state.selectMonth})
   }
   componentDidMount() {
     this.props.monthIncome({month:dateFormat(new Date).slice(0,-3)})
   }
   onChangeTab() {}
   renderRow(data) {
     return (
       <View>
        {viewUtils.orderTitle(data.item.hotelName)}
        {viewUtils.orderDetailItem(data.item.picture,data.item.houseName,'订单号'+data.item.orderCode,'¥'+data.item.totalFee)}
       </View>
     )
   }
   dayIncomeSelcet(value, prevValue, selectedRange) {
     this.props.dayIncome({date:dateFormat(value)})
   }
   monthIncomeTotal() {
    if(!this.props.landlord.inComeLists) return
     let total = 0
    this.props.landlord.inComeLists.forEach(item=>{
      total+=parseFloat(item.totalFee)
    })
    return total.toFixed(2)
   }
   openModal() {
     this.setState({
       modalVisible:!this.state.modalVisible
     })
   }
   onModalHide() {
     const month = this.state.selectMonth>9?this.state.selectMonth:'0'+this.state.selectMonth
    this.props.monthIncome({month:this.state.selectYear+'-'+month})
    this.props.navigation.setParams({openModal:this.openModal,month:this.state.selectMonth})
   }
   yearsRender() {
     const year = new Date().getFullYear()
     const yearArr = [year-1,year]
     return yearArr.map(year=>(
      <TouchableOpacity key={year} onPress={()=>this.setState({selectYear:year})} style={[styles.year_btn,{backgroundColor:this.state.selectYear===year?'#ffb354':'#fff'}]}>
        <Text style={[styles.text,{color:this.state.selectYear===year?'#fff':'#ffb354'}]}>{year}</Text>
      </TouchableOpacity>
     ))
   }
   monthsRender() {
     const year = new Date().getFullYear()
     let monthNum = 0
     if(this.state.selectYear === year) {
      monthNum = new Date().getMonth()
     }else {
      monthNum=12
     }
     let monthEle = []
     for(let i = 0;i<=monthNum;i++) {
      monthEle.push((
        <TouchableOpacity key={i} onPress={()=>{this.setState({selectMonth:i+1})}} style={[styles.year_btn,{backgroundColor:this.state.selectMonth===i+1?'#ffb354':'#fff'}]}>
          <Text style={[styles.text,{color:this.state.selectMonth===i+1?'#fff':'#ffb354'}]}>{i+1}</Text>
        </TouchableOpacity>
      ))
     }
     return monthEle
   }
   keyExtractor(item) {
     return item.id
   }

   render() {
     return (
      <SafeAreaView style={{flex:1}}>
       <View style={{flex:1}}>
          <ScrollableTabView
              style={{flex:1}}
              tabBarUnderlineStyle={{backgroundColor: '#ffb354', height: 2}}
              tabBarInactiveTextColor='mintcream'
              tabBarActiveTextColor='#ffb354'
              tabBarInactiveTextColor='#333'
              tabBarTextStyle={{fontSize:16}}
              ref="scrollableTabView"
              tabBarBackgroundColor="#fff"
              initialPage={0}
              onChangeTab={this.onChangeTab.bind(this)}
              renderTabBar={() => <ScrollableTabBar 
                style={{height: 50, borderWidth: 0.5, elevation: 2}}
                                                    />}
            >
            <View tabLabel="日报表" style={{flex:1}} >      
              <View style={{flex:1}}>
                <Calendar
                startFromMonday={false} 
                monthsCount={1} 
                rangeSelect={false}
                startDate={new Date()}
                selectAllDate={true}
                monthIncomeTitle={'本月预估收入：'+this.monthIncomeTotal()}
                onSelectionChange={this.dayIncomeSelcet.bind(this)}
                />
              </View>
                <FlatList
                style={{flex:0}}
                data={this.props.landlord.dayIncome}
                renderItem={this.renderRow.bind(this)}
                keyExtractor={this.keyExtractor}
                getItemLayout={(data, index) => (
                  {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index}
                )}
              
              >
              </FlatList>       
            </View>
            <View tabLabel="月报表" >
            {
                this.props.landlord.inComeLists?
                <FlatList
                data={this.props.landlord.inComeLists}
                renderItem={this.renderRow.bind(this)}
                keyExtractor={this.keyExtractor}
                getItemLayout={(data, index) => (
                  {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index}
                )}
              >
              </FlatList>:null

              }
            </View>
          </ScrollableTabView>
          <Modal
           backdropColor='#f6f6f6'
           backdropOpacity={1}
           onModalHide={this.onModalHide.bind(this)}
           style={{padding:10,marginTop:10}}
           isVisible={this.state.modalVisible}>
           <TouchableOpacity onPress={this.openModal}>
            <Text style={{fontSize:16}} onPress={this.openModal}>返回</Text>
           </TouchableOpacity>
            <View style={{ flex: 1,alignItems:'center' }}>
              <Text style={styles.title}>请选择年份</Text>
              <View style={{flexDirection:'row',justifyContent:'center'}}>
              {this.yearsRender()}
              </View>
              <Text style={styles.title}>请选择月份</Text>
              <View style={{flexDirection:'row',flexWrap:'wrap',padding:10,justifyContent:'center'}}>
                  {this.monthsRender()}
              </View>
            </View>
          </Modal>
       </View>
       </SafeAreaView>
     )
   }
 }
 const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    color:'#616161',
    lineHeight: 40,
    fontSize: 16
  },
  year_btn: {
    width: 75,
    height: 33,
    borderRadius: 3,
    backgroundColor: '#FFFFFF',
    justifyContent:'center',
    marginRight:10,
    marginTop: 5
  },
  text:{
    color: '#ffb354',
    textAlign:'center',
    fontSize: 16
  }
});
 export default LandLoadAccountPage