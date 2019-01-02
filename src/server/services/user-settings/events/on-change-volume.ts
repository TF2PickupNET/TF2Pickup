import {
  NotAuthenticated,
  BadRequest,
} from '@feathersjs/errors';
import { SocketConnection } from '@feathersjs/socketio';
import debug from 'debug';
import { SocketEventHandler, ServerApp } from '@feathersjs/feathers';

const log = debug('TF2Pickup:users:events:on-change-region');

export default function onChangeVolume(
  app: ServerApp,
  connection: SocketConnection,
): SocketEventHandler<'user-settings:change-volume'> {
  const userSettings = app.service('user-settings');

  return async (data, cb) => {
    const user = connection.feathers.user;

    // Make sure a userId is authenticated
    if (!user) {
      return cb(new NotAuthenticated('You aren\'t authenticated!'));
    }

    if (data.volume < 0 || data.volume > 100) {
      return cb(new BadRequest('Not allowed volume value!'));
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
