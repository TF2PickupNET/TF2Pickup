import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import user from './user/reducer';
import notifications from './notifications/reducer';
import dialog from './dialog/reducer';
import connected from './connected/reducer';
import pickupQueue from './pickup-queue/reducer';
import drawerOpened from './drawer-opened/reducer';
import onlineUsers from './online-users/reducer';

/**
 * Combine the reducers and setup all of the event listeners for the stores.
 *
 * @param {Object} app - The feathers app.
 * @returns {Object} - Returns the combined reducers.
 */
export default function reducers(app) {
  user.setupListeners(app);
  connected.setupListeners(app);
  pickupQueue.setupListeners(app);
  onlineUsers.setupListeners(app);
  notifications.setupListeners(app);

  return combineReducers({
    user,
    notifications,
    dialog,
    connected,
    pickupQueue,
    drawerOpened,
    onlineUsers,
    router: routerReducer,
  });
}
