// @flow

import {
  NotAuthenticated,
  Forbidden,
} from '@feathersjs/errors';
import { type App } from '@feathersjs/express';
import { type SocketConnection } from '@feathersjs/socketio';
import debug from 'debug';

type Data = { id: string };

const log = debug('TF2Pickup:warnings:on-read-warning');

export default function onMarkAsRead(app: App, connection: SocketConnection) {
  return async (data: Data, cb: (error: null | Error) => void) => {
    const currentUser = connection.feathers.user;

    // Make sure a userId is authenticated
    if (!currentUser) {
      return cb(new NotAuthenticated());
    }

    try {
      const warning = await app.service('warnings').get(data.id);

      if (warning.for !== currentUser.id) {
        return cb(new Forbidden('You can only mark your own warnings as read'));
      }

      await app.service('warnings').patch(data.id, {
        read: true,
        readOn: Date.now(),
      });

      return cb(null);
    } catch (error) {
      log('Error while reading a warning', {
        userId: currentUser.id,
        data,
        error,
      });

      return cb(error);
    }
  };
}
