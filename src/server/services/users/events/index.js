// @flow

import { type ServerApp } from '@feathersjs/feathers';
import debug from 'debug';

import onLogin from './on-login';
import onLogout from './on-logout';
import onChangeRegion from './on-change-region';
import onAcceptRules from './on-accept-rules';
import onSetName from './on-set-name';
import onAddRole from './on-add-role';
import onRemoveRole from './on-remove-role';
import onCompleteSignUp from './on-complete-sign-up';

const log = debug('TF2Pickup:users:events');

export default function events(app: ServerApp) {
  log('Setting up events for the users service');

  app.on('login', onLogin(app));

  app.on('logout', onLogout(app));

  app.on('socket-connection', (socket) => {
    socket.on('users:change-region', onChangeRegion(app, socket));

    socket.on('users:accept-rules', onAcceptRules(app, socket));

    socket.on('users:set-name', onSetName(app, socket));

    socket.on('users:add-role', onAddRole(app, socket));

    socket.on('users:remove-role', onRemoveRole(app, socket));

    socket.on('users:complete-sign-up', onCompleteSignUp(app, socket));
  });
}
