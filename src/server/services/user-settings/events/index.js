// @flow

import { type App } from '@feathersjs/express';
import debug from 'debug';

const log = debug('TF2Pickup:user-settings:events');

export default function events(app: App) {
  log('Setting up events for the user-settings service');

  app.on('socket-connection', (socket) => {
    socket.on('user-settings:change-announcer');

    socket.on('user-settings:change-volume');
  });
}
