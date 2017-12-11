import cookie from 'js-cookie';

import { openDialog } from '../dialog/actions';

import {
  loginUser,
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

  app.on('authenticated', async ({ accessToken }) => {
    const verifiedToken = await app.passport.verifyJWT(accessToken);

    cookie.set('feathers-jwt', accessToken);

    app.set('userId', verifiedToken.id);

    const user = await users.get(verifiedToken.id);

    app.store.dispatch(loginUser(user));

    if (user.name === null || user.settings.region === null || !user.hasAcceptedTheRules) {
      app.store.dispatch(openDialog('POST_USER_CREATION_DIALOG'));
    }
  });

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
