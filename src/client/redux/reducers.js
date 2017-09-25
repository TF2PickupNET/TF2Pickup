import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import user from './user/reducer';
import notifications from './notifications/reducer';
import onlineUsers from './online-users/reducer';
import connected from './connected/reducer';
import pickupQueue from './pickup-queue/reducer';

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
  connected.setupListeners(app);
  pickupQueue.setupListeners(app);

  return combineReducers({
    user,
    notifications,
    onlineUsers,
    connected,
    pickupQueue,
    router: routerReducer,
  });
}
