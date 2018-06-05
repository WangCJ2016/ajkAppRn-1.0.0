import React from 'react'
import { 
  View,
  Text
 } from 'react-native'
 import ScrollableTabView,{ScrollableTabBar} from 'react-native-scrollable-tab-view'
 import FarCtrl from '../../components/smartTestCom/farCtrl'
 import PowerCom from '../../components/smartTestCom/power'
 import PowerWarm from '../../components/smartTestCom/powerWarn'
 import { powerRelayList,powerRelayControl,currentPower,historyPower,warmPower,addPowerWarm,modifyPowerWarm,powerRecord } from '../../reducers/longRent-hasRent.redux'
 import { connect } from 'react-redux'
 import InphoneXHoc from '../../hoc/inphoneXhoc'
 
 @InphoneXHoc
 @connect(
   state=>({longRentHasRent: state.longRentHasRent,longRent:state.longRent}),
   {
    powerRelayList,powerRelayControl,currentPower,historyPower,warmPower,addPowerWarm,modifyPowerWarm,powerRecord
   }
 )
 class SmartTestPage extends React.Component {
   state = {  }
   componentDidMount() {
      const powerId = this.props.longRent.powerId
      this.props.powerRelayList({powerId:powerId,pageSize:50,pageNo:1})
      this.props.currentPower({powerId:powerId,pageSize:50,pageNo:1})
      this.props.warmPower({powerId:powerId,pageSize:50,pageNo:1})
      this.props.powerRecord({powerId:powerId,pageSize:50,pageNo:1})
   }
   render() {
     const powerId = this.props.longRent.powerId
     return (
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
          locked={true}
          renderTabBar={() => <ScrollableTabBar 
            style={{height: 50, borderWidth: 0.5, elevation: 2}}
                                                />}
        >
        <FarCtrl tabLabel="远程开关控制" powerRelayList={this.props.longRentHasRent.powerRelayList} powerRelayControl={this.props.powerRelayControl}/>
        <PowerCom tabLabel="用电量" currentPowerList={this.props.longRentHasRent.currentPowerList} powerId={powerId} historyPower={this.props.historyPower} />
        <PowerWarm tabLabel="电源预警" 
          powerId={powerId}
          powerRecordList={this.props.longRentHasRent.powerRecordList}
          warmPowerList={this.props.longRentHasRent.warmPowerList}
          modifyPowerWarm={this.props.modifyPowerWarm}
          addPowerWarm={this.props.addPowerWarm} />
      </ScrollableTabView>
  
     )
   }
 }
 
 export default SmartTestPage