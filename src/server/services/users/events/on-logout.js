// @flow

import { type App } from '@feathersjs/express';
import { type Connection } from '@feathersjs/feathers';
import debug from 'debug';

const log = debug('TF2Pickup:users:events:on-logout');

export default function onLogout(app: App, connection: Connection) {
  return async () => {
    // Check if the user is still authenticated on any other socket
    const isStillConnected = app
      .channels('authenticated')
      .filter(({ user }) => user.id === connection.user.id)
      .length > 0;

    // Don't set the user to online: false when the user has still active sockets
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
  };
}
