import feathers from 'feathers/client';
import socketio from 'feathers-socketio/client';
import io from 'socket.io-client';
import hooks from 'feathers-hooks';
import auth from 'feathers-authentication-client';

import { isDev } from '../config/client';

import configureStore from './redux/configure-store';

const socket = io(window.location.origin, {
  path: '/ws/',
  transports: ['websocket'],
});
const app = feathers();

app
  .configure(hooks())
  .configure(socketio(socket))
  .configure(auth({ storage: window.localStorage }))
  .configure(configureStore);

if (isDev) {
  window.app = app;
}

export default app;
