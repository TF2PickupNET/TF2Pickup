import hooks from 'feathers-hooks-common';
import {
  omit,
  pluck,
} from '@tf2-pickup/utils';

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
      const userId = getUserId(connection);

      if (userId === data.fromUser) {
        return false;
      }

      if (data.forRegion === pluck('user.settings.region', false)(connection)) {
        return data;
      }

      if (!data.forUsers) {
        return data;
      }

      if (data.forUsers.includes(userId)) {
        return omit('forUsers')(data);
      }

      return false;
    },
  });
}
