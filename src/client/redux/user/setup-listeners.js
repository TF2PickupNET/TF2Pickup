import cookie from 'js-cookie';

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
    console.log(accessToken);

    const verifiedToken = await app.passport.verifyJWT(accessToken);

    console.log(verifiedToken);

    cookie.set('feathers-jwt', accessToken);

    app.set('userId', verifiedToken.id);

    const user = await users.get(verifiedToken.id);

    console.log(user);

    app.store.dispatch(loginUser(user));
  });

  users.on('patched', (data) => {
    app.store.dispatch(updateUser(data));
  });

  app.on('logout', () => {
    app.store.dispatch(logoutUser());

    app.set('userId', null);
  });
}
