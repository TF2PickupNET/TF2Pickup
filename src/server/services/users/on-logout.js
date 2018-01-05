import debug from 'debug';

import { pluck } from '../../../utils/functions';

const log = debug('TF2Pickup:users:on-logout');

/**
 * Create the logout callback.
 *
 * @param {Object} app - The feathers app object.
 * @returns {Function} - Returns the actual callback.
 */
export default function onLogout(app) {
  return async (payload, { connection }) => {
    const isStillConnected = Object
      .values(app.io.sockets.sockets)
      .some(socket => pluck('feathers.user.id')(socket) === connection.user.id);

    if (isStillConnected) {
      return;
    }

    try {
      log('User logged out', connection.user.id);

      await app.service('users').patch(connection.user.id, {
        $set: {
          online: false,
          lastOnline: Date.now(),
        },
      });
    } catch (error) {
      log('Error in logout callback', connection.user.id, error);
    }

    app.service('users').emit('logout', { id: connection.user.id });
  };
}
