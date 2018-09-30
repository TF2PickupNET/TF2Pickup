// @flow

import { NotAuthenticated } from '@feathersjs/errors';
import { type SocketConnection } from '@feathersjs/socketio';
import { type App } from '@feathersjs/express';
import debug from 'debug';

type Data = { volume: number };

const log = debug('TF2Pickup:users:events:on-change-region');

export default function onChangeVolume(app: App, connection: SocketConnection) {
  const userSettings = app.service('user-settings');

  return async (data: Data, cb: (Error | null) => void) => {
    const user = connection.feathers.user;

    // Make sure a userId is authenticated
    if (!user) {
      return cb(new NotAuthenticated('You aren\'t authenticated!'));
    }

    try {
      await userSettings.patch(user.id, { volume: data.volume });

      return cb(null);
    } catch (error) {
      log('Error while changing the volume', {
        userId: user.id,
        error,
        data,
      });

      return cb(error);
    }
  };
}
