import { NotAuthenticated } from '@feathersjs/errors';
import { ServerApp, SocketEventHandler } from '@feathersjs/feathers';
import { SocketConnection } from '@feathersjs/socketio';
import debug from 'debug';

const log = debug('TF2Pickup:users:events:on-change-region');

export default function onAcceptRules(
  app: ServerApp,
  connection: SocketConnection,
): SocketEventHandler<'users:accept-rules'> {
  const users = app.service('users');

  return async (_, cb) => {
    const user = connection.feathers.user;

    // Make sure a userId is authenticated
    if (!user) {
      return cb(new NotAuthenticated('You aren\'t authenticated!'));
    }

    try {
      await users.patch(user.id, { hasAcceptedTheRules: true });

      log('User accepted the rules', { userId: user.id });

      return cb(null);
    } catch (error) {
      log('Error while accepting the rules', {
        userId: user.id,
        error,
      });

      return cb(error);
    }
  };
}
