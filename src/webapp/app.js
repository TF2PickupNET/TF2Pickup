// @flow

import feathers from '@feathersjs/feathers';
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
  reconnectionDelay: 5 * 1000,
  reconnectionDelayMax: 60 * 1000,
  timeout: SOCKET_TIMEOUT,
});
const app = feathers();

app
  .configure(socketio(socket, { timeout: SOCKET_TIMEOUT }))
  .configure(auth({ storage: window.localStorage }))
  .configure(events());

app.on('logout', () => {
  app.set('userId', null);
});

app.on('authenticated', async ({ accessToken }) => {
  const verifiedToken = await app.passport.verifyJWT(accessToken);

  app.set('userId', verifiedToken.id);
});

export { API_ENDPOINT };

export default app;
