// @flow

import { type App } from '@feathersjs/express';
import { type Meta } from '@feathersjs/authentication';
import debug from 'debug';

const log = debug('TF2Pickup:users:events:on-login');

export default function onLogin(app: App) {
  return async (payload: {}, meta: Meta) => {
    if (meta.provider === 'rest') {
      return;
    }

    const userId = meta.connection.user.id;

    try {
      await app.service('users').patch(userId, { online: true });

      log('User successfully logged in', { userId });
    } catch (error) {
      log('Error in login callback', {
        error,
        userId,
      });
    }
  };
}
