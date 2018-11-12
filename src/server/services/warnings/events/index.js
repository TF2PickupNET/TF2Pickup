// @flow

import { type ServerApp } from '@feathersjs/feathers';
import debug from 'debug';

import onCreateWarning from './on-create-warning';
import onReadWarning from './on-read-warning';

const log = debug('TF2Pickup:warnings:events');

export default function events(app: ServerApp) {
  log('Setting up events for the warnings service');

  app.on('socket-connection', (socket) => {
    socket.on('warnings:create', onCreateWarning(app, socket));

    socket.on('warnings:read', onReadWarning(app, socket));
  });
}
