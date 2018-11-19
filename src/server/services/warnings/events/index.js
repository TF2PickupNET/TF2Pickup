// @flow

import { type ServerApp } from '@feathersjs/feathers';
import debug from 'debug';

import onCreate from './on-create';
import onMarkAsRead from './on-mark-as-read';

const log = debug('TF2Pickup:warnings:events');

export default function events(app: ServerApp) {
  log('Setting up events for the warnings service');

  app.on('socket-connection', (socket) => {
    socket.on('warnings:create', onCreate(app, socket));

    socket.on('warnings:mark-as-read', onMarkAsRead(app, socket));
  });
}
