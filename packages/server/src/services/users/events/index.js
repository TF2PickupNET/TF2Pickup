// @flow

import { type App } from '@feathersjs/express';
import debug from 'debug';

import onLogin from './on-login';
import onLogout from './on-logout';
import onChangeRegion from './on-change-region';
import onAcceptRules from './on-accept-rules';

const log = debug('TF2Pickup:users:events');

export default function events(app: App) {
  log('Setting up events for the users service');

  app.on('login', (payload, { connection }) => onLogin(app, connection));

  app.on('logout', (payload, { connection }) => onLogout(app, connection));

  app.on('connection', (connection) => {
    connection.on('users:change-region', onChangeRegion(app, connection));

    connection.on('users:accept-rules', onAcceptRules(app, connection));
  });
}
