import debug from 'debug';
import {
  isBefore,
  subDays,
} from 'date-fns';

import { getDataForUserItem } from '../../../utils/users';

import getNewUserData from './third-party-services';

const log = debug('TF2Pickup:users:on-login');

/**
 * The login callback for the user.
 *
 * @param {Object} app - The feathers app object.
 * @returns {Function} - Returns the actual login callback.
 */
export default function onLogin(app) {
  return async (payload, { connection }) => {
    log('User logged in', connection.user.id);

    try {
      const yesterday = subDays(new Date(), 1);
      const oneDaySinceLastUpdate = isBefore(connection.user.lastUpdate, yesterday);
      const updatedData = await getNewUserData(connection.user.id, oneDaySinceLastUpdate, app);

      await app.service('users').patch(connection.user.id, {
        ...updatedData,
        online: true,
      });
    } catch (error) {
      log('Error in login callback', connection.user.id, error);
    }

    // This is needed because on the first login the user doesn't have a name yet
    if (connection.user.name) {
      app.service('users').emit('login', getDataForUserItem(connection.user));
    }
  };
}
