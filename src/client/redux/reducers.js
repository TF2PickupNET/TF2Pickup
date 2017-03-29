import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import user from './user/reducer';
import notifications from './notifications/reducer';
import onlineUsers from './online-users/reducer';

export default combineReducers({
  user,
  notifications,
  onlineUsers,
  router: routerReducer,
});
