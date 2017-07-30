import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import user from './user/reducer';
import notifications from './notifications/reducer';
import onlineUsers from './online-users/reducer';

/**
 * Combine the reducers and setup all of the event listeners for the stores.
 *
 * @param {Object} app - The feathers app.
 * @returns {Object} - Returns the combined reducers.
 */
export default function reducers(app) {
  user.setupListeners(app);
  notifications.setupListeners(app);
  onlineUsers.setupListeners(app);

  return combineReducers({
    user,
    notifications,
    onlineUsers,
    router: routerReducer,
  });
}
