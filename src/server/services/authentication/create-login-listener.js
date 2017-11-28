import moment from 'moment';
import debug from 'debug';

import getNewUserData from '../users/third-party-services/index';

const log = debug('TF2Pickup:authentication:login');

/**
 * Create a login listener to update the user third party data and emit events.
 *
 * @param {Object} app - The feathers app object.
 * @returns {Function} - The actual callback for the login event.
 */
export default function createLoginListener(app) {
  return async (payload, { connection }) => {
    const users = app.service('users');

    log('User logged in', connection.user.id);

    try {
      const yesterday = moment().subtract(1, 'day');
      const oneDaySinceLastUpdate = moment(connection.user.lastUpdate).isBefore(yesterday);
      const updatedData = await getNewUserData(connection.user.id, oneDaySinceLastUpdate, app);

      await users.patch(connection.user.id, {
        ...updatedData,
        online: true,
      });
    } catch (error) {
      log('Error in login callback', connection.user.id, error);
    }
  };
}
