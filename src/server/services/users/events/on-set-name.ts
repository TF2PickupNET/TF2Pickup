import {
  NotAuthenticated,
  BadRequest,
} from '@feathersjs/errors';
import {
  ServerApp,
  SocketEventHandler,
} from '@feathersjs/feathers';
import { SocketConnection } from '@feathersjs/socketio';
import debug from 'debug';

const log = debug('TF2Pickup:users:events:on-set-name');

export default function onSetName(
  app: ServerApp,
  connection: SocketConnection,
): SocketEventHandler<'users:set-name'> {
  const users = app.service('users');

  return async (data, cb) => {
    const { user } = connection.feathers;

    // Make sure the user is authenticated
    if (!user) {
      return cb(new NotAuthenticated());
    }

    if (user.name !== null) {
      return cb(new BadRequest('You already have a name'));
    }

    const [existingUser] = await users.find({
      query: {
        name: data.name,
        $limit: 1,
      },
    });

    if (existingUser) {
      return cb(new BadRequest('This name is already taken'));
    }

    try {
      await users.patch(user.id, { name: data.name });

      log('Successfully set the name of a user', {
        userId: user.id,
        data,
      });

      return cb(null);
    } catch (error) {
      log('Error while setting user name', {
        userId: user.id,
        data,
        error,
      });

      return cb(error);
    }
  };
}
