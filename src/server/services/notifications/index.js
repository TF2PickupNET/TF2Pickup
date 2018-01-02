import hooks from 'feathers-hooks-common';

import { pluck } from '../../../utils/functions';

const service = { create: notification => Promise.resolve(notification) };

const getUserId = pluck('user.id');

/**
 * Setup the notifications service.
 */
export default function notifications() {
  const that = this;

  that.service('notifications', service);

  that.service('notifications').hooks({ before: { all: hooks.disallow('external') } });

  that.service('notifications').filter({
    created(data, connection) {
      if (!data.forUsers) {
        return data;
      }

      if (data.forUsers.includes(getUserId(connection))) {
        return data;
      }

      return false;
    },
  });
}
