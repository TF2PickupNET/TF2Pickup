// @flow

import feathers, { type ClientApp } from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
import io from 'socket.io-client';
import auth from '@feathersjs/authentication-client';

import events from './store/events';
import {
  loginUser,
  logoutUser,
} from './store/user-id/actions';
import store from './store';

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
const app: ClientApp = feathers();

app
  .configure(socketio(socket, { timeout: SOCKET_TIMEOUT }))
  .configure(auth({ storage: window.localStorage }))
  .configure(events());

app.on('logout', () => {
  store.dispatch(logoutUser());
});

app.on('authenticated', async (payload: { accessToken: string }) => {
  const verifiedToken = await app.passport.verifyJWT(payload.accessToken);

  store.dispatch(loginUser(verifiedToken.id));
});

export { API_ENDPOINT };

export default app;
