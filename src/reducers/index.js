import { combineReducers } from 'redux';
import { AppNavigator } from '../navigators/AppNavigator';
import {user} from './user.redux'
import { main } from './main.redux'
import { hotel } from './hotel.redux'
import { order } from './shopcar.redux'
import { landlord } from './shortRent.redux'
import { customer } from './customer.redux'
import { map } from './map.redux'
import { ctrl } from './ctrl.redux'
import { longRent } from './longRent.redux'
import { longRentHasRent } from './longRent-hasRent.redux'

// Start with two routes: The Main screen, with the Login screen on top.
// const firstAction = AppNavigator.router.getActionForPathAndParams('Main');
// const tempNavState = AppNavigator.router.getStateForAction(firstAction);
// const initialNavState = AppNavigator.router.getStateForAction(
//   firstAction,
//   tempNavState
// );

// function nav(state , action) {
//   let nextState;
//   switch (action.type) {
//     case 'Login':
//       nextState = AppNavigator.router.getStateForAction(
//         NavigationActions.navigate({ routeName: 'Login' }),
//         state
//       );
//       break;
//     default:
//       nextState = AppNavigator.router.getStateForAction(action, state);
//       break;
//   }

//   // Simply return the original `state` if `nextState` is null or undefined.
//   return nextState || state;
// }

const AppReducer = combineReducers({
  user,
  main,
  hotel,
  order,
  landlord,
  customer,
  map,
  ctrl,
  longRent,
  longRentHasRent
});
export default AppReducer



