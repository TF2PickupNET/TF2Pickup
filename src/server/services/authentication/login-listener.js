import moment from 'moment';

import getNewUserData from '../users/third-party-services/index';
import { onlineUsersLogin } from '../../../config/event-names';

export default function createLoginListener(app) {
  return async (payload, { connection }) => {
    const users = app.service('users');
    const logs = app.service('logs');

    try {
      const yesterday = moment().subtract(1, 'day');
      const oneDaySinceLastUpdate = !connection.user.lastUpdate
        || moment(connection.user.lastUpdate).isBefore(yesterday);
      const updatedData = await getNewUserData(connection.user.id, oneDaySinceLastUpdate, app);

      updatedData.online = true;

      await users.patch(connection.user.id, updatedData);

      users.emit(onlineUsersLogin, )

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
