import feathers from 'feathers/client';
import socketio from 'feathers-socketio/client';
import io from 'socket.io-client';
import hooks from 'feathers-hooks';
import auth from 'feathers-authentication-client';
import { authUrl } from '@tf2-pickup/config';

import configureStore from './redux/configure-store';

const socket = io(window.location.origin, {
  path: '/ws/',
  transports: ['websocket'],
  reconnectionDelay: 5 * 1000,
  reconnectionDelayMax: 60 * 1000,
  timeout: 2000,
});
const app = feathers();

app
  .configure(hooks())
  .configure(socketio(socket))
  .configure(auth({ storage: window.localStorage }))
  .configure(configureStore);

app.redirectToSteamAuth = () => {
  const location = window.location;

  window.location = `${authUrl}?url=${location.pathname}`;
};

if (IS_DEV) {
  window.app = app;
}

export default app;
