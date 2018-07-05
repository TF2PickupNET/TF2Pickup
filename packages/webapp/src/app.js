// @flow

import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
import io from 'socket.io-client';
import auth from '@feathersjs/authentication-client';

import { API_ENDPOINT } from './config';

const socket = io(API_ENDPOINT, {
  path: '/ws/',
  transports: ['websocket'],
  reconnectionDelay: 5 * 1000,
  reconnectionDelayMax: 60 * 1000,
  timeout: 2000,
});
const app = feathers();

app
  .configure(socketio(socket))
  .configure(auth({ storage: window.localStorage }));

export default app;
