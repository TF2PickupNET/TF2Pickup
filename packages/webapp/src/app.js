// @flow

import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
import io from 'socket.io-client';
import auth from '@feathersjs/authentication-client';

import {
  API_ENDPOINT,
  SOCKET_TIMEOUT,
} from './config';

const socket = io(API_ENDPOINT, {
  path: '/ws/',
  transports: ['websocket'],
  reconnectionDelay: 5 * 1000,
  reconnectionDelayMax: 60 * 1000,
  timeout: SOCKET_TIMEOUT,
});
const app = feathers();

app
  .configure(socketio(socket, { timeout: SOCKET_TIMEOUT }))
  .configure(auth({ storage: window.localStorage }));

export default app;
