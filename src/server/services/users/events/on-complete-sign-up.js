// @flow

import { NotAuthenticated } from '@feathersjs/errors';
import { type App } from '@feathersjs/express';
import { type SocketConnection } from '@feathersjs/socketio';
import debug from 'debug';

const log = debug('TF2Pickup:users:on-complete-sign-up');

export default function onCompleteSignUp(app: App, connection: SocketConnection) {
  return async (data: {}, cb: (error: null | Error) => void) => {
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
