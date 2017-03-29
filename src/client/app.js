import feathers from 'feathers/client';
import socketio from 'feathers-socketio/client';
import io from 'socket.io-client';
import hooks from 'feathers-hooks';
import auth from 'feathers-authentication-client';
import cookie from 'js-cookie';

import configureStore from './redux/configure-store';
import {
  loginUser,
  logoutUser,
  updateUser,
} from './redux/user/actions';

const socket = io(window.location.origin, { path: '/ws/' });
const app = feathers();

app
  .configure(hooks())
  .configure(socketio(socket))
  .configure(auth({ storage: window.localStorage }))
  .configure(configureStore);

app.redirectToSteam = function redirectToSteam() {
  window.location = '/auth/steam';
};

app.set('userId', null);

app.on('logout', () => {
  app.store.dispatch(logoutUser());

  app.set('userId', null);
});

app.on('authenticated', async ({ accessToken }) => {
  const verifiedToken = await app.passport.verifyJWT(accessToken);

  cookie.set('feathers-jwt', accessToken);
  app.set('userId', verifiedToken.id);

  const user = await app.service('users').get(verifiedToken.id);

  app.store.dispatch(loginUser(user));
});

app.service('users').on('patched', (data) => {
  app.store.dispatch(updateUser(data));
});

app.service('users').on('login', console.log);

app.service('users').on('logout', console.log);

window.app = app;

export default app;
