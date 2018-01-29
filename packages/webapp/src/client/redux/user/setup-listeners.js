import {
  logoutUser,
  updateUser,
} from './actions';

/**
 * Setup listeners for the current user store to change the store
 * when the user logs in, logs out or changes something of his settings.
 *
 * @param {Object} app - The feathers app.
 */
export default function setupListeners(app) {
  const users = app.service('users');

  users.on('patched', (data) => {
    // Only update when the user is actually online
    // This event is still emitted when we change online to false in the server
    // when the user logs out, which results in a wrong state
    if (data.online) {
      app.store.dispatch(updateUser(data));
    }
  });

  app.on('logout', () => {
    app.store.dispatch(logoutUser());

    app.set('userId', null);
  });
}
