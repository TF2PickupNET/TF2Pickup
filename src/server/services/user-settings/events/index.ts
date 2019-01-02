import { ServerApp } from '@feathersjs/feathers';
import debug from 'debug';

import onChangeVolume from './on-change-volume';
import onChangeEmojiSet from './on-change-emoji-set';

const log = debug('TF2Pickup:user-settings:events');

export default function events(app: ServerApp) {
  log('Setting up events for the user-settings service');

  app.on('socket-connection', (socket) => {
    socket.on('user-settings:change-volume', onChangeVolume(app, socket));

    socket.on('user-settings:change-emoji-set', onChangeEmojiSet(app, socket));
  });
}
