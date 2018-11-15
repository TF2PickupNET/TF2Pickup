// @flow

import feathers, { type ClientApp } from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
import io from 'socket.io-client';
import auth from '@feathersjs/authentication-client';

import events from './store/events';

const API_ENDPOINT = window.location.hostname === 'localhost'
  ? 'http://localhost:3000'
  : 'https://api.tf2pickup.net';
const SOCKET_TIMEOUT = 2000;

const socket = io(API_ENDPOINT, {
  path: '/ws/',
  transports: ['websocket'],
  reconnection: false,
  timeout: SOCKET_TIMEOUT,
  autoConnect: false,
});
const app: ClientApp = feathers();

app
  .configure(socketio(socket, { timeout: SOCKET_TIMEOUT }))
  .configure(auth({ storage: window.localStorage }))
  .configure(events());

export {
  API_ENDPOINT,
  socket,
};

export default app;
