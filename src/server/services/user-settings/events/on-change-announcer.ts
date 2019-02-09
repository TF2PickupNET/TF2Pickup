import {
  NotAuthenticated,
  BadRequest,
} from '@feathersjs/errors';
import { SocketConnection } from '@feathersjs/socketio';
import {
  SocketEventHandler,
  ServerApp,
} from '@feathersjs/feathers';
import debug from 'debug';
import announcers from '@config/announcers';

const log = debug('TF2Pickup:user-settings:events:change-announcer');

export default function onChangeAnnouncer(
  app: ServerApp,
  connection: SocketConnection,
): SocketEventHandler<'user-settings:change-announcer'> {
  const userSettings = app.service('user-settings');

  return async (data, cb) => {
    const user = connection.feathers.user;

    // Make sure a userId is authenticated
    if (!user) {
      return cb(new NotAuthenticated('You aren\'t authenticated!'));
    }

    if (!(data.announcer in announcers)) {
      return cb(new BadRequest('Not a valid announcer!'));
    }

    try {
      await userSettings.patch(user.id, { announcer: data.announcer });

      return cb(null);
    } catch (error) {
      log('Error while changing the announcer', {
        userId: user.id,
        error,
        data,
      });

      return cb(error);
    }
  };
}
