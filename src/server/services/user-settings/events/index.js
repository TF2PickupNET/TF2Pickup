// @flow

import { type ServerApp } from '@feathersjs/feathers';
import debug from 'debug';

import onChangeVolume from './on-change-volume';

const log = debug('TF2Pickup:userId-settings:events');

export default function events(app: ServerApp) {
  log('Setting up events for the userId-settings service');

  app.on('socket-connection', (socket) => {
    socket.on('user-settings:change-volume', onChangeVolume(app, socket));
  });
}
