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
    const logs = app.service('logs');

    try {
      const yesterday = moment().subtract(1, 'day');
      const oneDaySinceLastUpdate = moment(connection.user.lastUpdate).isBefore(yesterday);
      const updatedData = await getNewUserData(connection.user.id, oneDaySinceLastUpdate, app);

      updatedData.online = true;

      log('Updating user data for user with id', connection.user.id, updatedData);

      await users.patch(connection.user.id, updatedData);

      log('User logged in with id', connection.user.id);

      await logs.create({
        message: 'User logged in',
        environment: 'server',
        steamId: connection.user.id,
      });
    } catch (error) {
      await logs.create({
        message: 'Error on login callback',
        environment: 'server',
        info: error,
        steamId: connection.user.id,
      });
    }
  };
}
