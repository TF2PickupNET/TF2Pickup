import { ServerApp } from '@feathersjs/feathers';
import {
  Meta,
  Payload,
} from '@feathersjs/authentication';
import config from 'config';
import debug from 'debug';

const log = debug('TF2Pickup:users:events:on-logout');

async function getUserFromPayload(app: ServerApp, payload: Payload) {
  try {
    const token = await app.passport.verifyJWT(
      payload.accessToken,
      { secret: config.get('auth.secret') },
    );

    return app.service('users').get(token.id);
  } catch (error) {
    log('Error while verifying JWT in logout callback', { error });

    return null;
  }
}

export default function onLogout(app: ServerApp) {
  return async (payload: Payload, meta: Meta) => {
    if (meta.provider === 'rest') {
      return;
    }

    try {
      const user = await getUserFromPayload(app, payload);

      if (user === null) {
        return;
      }

      // Check if the userId is still authenticated on any other socket
      const isStillConnected = app
        .channel('authenticated')
        .filter(connection => connection.user && connection.user.id === user.id)
        .length > 0;

      // Don't set the userId to online: false when the userId has still active sockets
      if (isStillConnected) {
        return;
      }

      await app.service('users').patch(user.id, {
        online: false,
        lastOnline: Date.now(),
      });

      log('Successfully logged out user', { userId: user.id });
    } catch (error) {
      log('Error in logout callback', { error });
    }
  };
}
