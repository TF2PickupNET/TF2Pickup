// @flow

import { type App } from '@feathersjs/express';
import debug from 'debug';

const log = debug('TF2Pickup:users:events');

export default function setupEvents(app: App) {
  app.on('login', async (payload, { connection }) => {
    try {
      await app.service('users').patch(connection.user.id, { online: true });
    } catch (error) {
      log('Error in logout callback', error);
    }
  });

  app.on('logout', async (payload, { connection }) => {
    const isStillConnected = Object
      .values(app.io.sockets.sockets)
      .some((socket: Socket) => {
        if (socket.feathers && socket.feathers.user) {
          return socket.feathers.user.id === connection.user.id;
        }

        return false;
      });

    if (isStillConnected) {
      return;
    }

    try {
      await app.service('users').patch(connection.user.id, {
        online: false,
        lastOnline: Date.now(),
      });
    } catch (error) {
      log('Error in logout callback', error);
    }
  });
}
