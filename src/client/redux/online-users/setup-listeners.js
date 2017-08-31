import {
  onlineUsersLogin,
  onlineUsersLogout,
} from '../../../config/event-names';

import {
  loginUser,
  logoutUser,
} from './actions';

/**
 * Setup the event listeners for the online users.
 *
 * @param {Object} app - The feathers app.
 */
export default function setupListeners(app) {
  const users = app.service('users');

  users.on(onlineUsersLogin, (data) => {
    app.store.dispatch(loginUser(data));
  });

  users.on(onlineUsersLogout, (data) => {
    app.store.dispatch(logoutUser(data.id));
  });
}
