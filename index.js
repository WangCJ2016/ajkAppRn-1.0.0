import React from 'react';
// import App from './App';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import codePush from "react-native-code-push";
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'; 
import AppWithNavigationState from './src/navigators/AppNavigator'
import AppReducer from './src/reducers/index';

class Root extends React.Component {
  constructor() {
    super()
    this.store = createStore(AppReducer, compose(applyMiddleware(thunk)))
  }
  componentDidMount(){
    codePush.sync({
      updateDialog: {
        appendReleaseDescription: true,
        descriptionPrefix:'\n\n更新内容：\n',
        title:'更新',
        mandatoryUpdateMessage:'',
        mandatoryContinueButtonLabel:'更新',
      },
      mandatoryInstallMode:codePush.InstallMode.IMMEDIATE,
    })
  }
  render() {
    return (
      <Provider store={this.store}>
        <AppWithNavigationState></AppWithNavigationState>
      </Provider>
    )
  }
}

AppRegistry.registerComponent('ajkAppRn', () => Root);
