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

  users.on('online-users.login', (data) => {
    app.store.dispatch(loginUser(data));
  });

  users.on('online-users.logout', (data) => {
    app.store.dispatch(logoutUser(data.id));
  });
}
