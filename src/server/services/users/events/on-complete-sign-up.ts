import { NotAuthenticated } from '@feathersjs/errors';
import {
  ServerApp,
  SocketEventHandler,
} from '@feathersjs/feathers';
import { SocketConnection } from '@feathersjs/socketio';
import debug from 'debug';

const log = debug('TF2Pickup:users:on-complete-sign-up');

export default function onCompleteSignUp(
  app: ServerApp,
  connection: SocketConnection,
): SocketEventHandler<'users:complete-sign-up'> {
  return async (_, cb) => {
    const user = connection.feathers.user;

    // Make sure a userId is authenticated
    if (!user) {
      return cb(new NotAuthenticated());
    }

    try {
      await app.service('users').patch(user.id, { hasCompletedSignUp: true });

      log('User successfully completed the sign-up process', { userId: user.id });

      return cb(null);
    } catch (error) {
      log('Error while completing the sign-up process', {
        userId: user.id,
        error,
      });

      return cb(error);
    }
  };
}
