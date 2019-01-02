import { ServerApp } from '@feathersjs/feathers';
import { Meta } from '@feathersjs/authentication';
import debug from 'debug';

const log = debug('TF2Pickup:users:events:on-login');

export default function onLogin(app: ServerApp) {
  return async (_: {}, meta: Meta) => {
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
