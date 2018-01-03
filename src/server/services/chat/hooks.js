import hooks from 'feathers-hooks-common';

import {
  getDataForUserItem,
  getUserIdFromHook,
} from '../../../utils/users';
import { map } from '../../../utils/functions';

export default {
  before: {
    all(hook) {
      if (hook.method === 'create' || hook.method === 'find') {
        return hook;
      }

      return hooks.disallow()(hook);
    },

    create(hook) {
      return {
        ...hook,
        data: {
          ...hook.data,
          userId: getUserIdFromHook(hook),
        },
      };
    },
  },

  after: {
    async create(hook) {
      const user = await hook.app.service('users').get(hook.result.userId);

      return {
        ...hook,
        result: {
          ...hook.result,
          user: getDataForUserItem(user),
        },
      };
    },

    async find(hook) {
      const populatedMessages = await Promise.all(
        map(async (message) => {
          const user = await hook.app.service('users').get(message.userId);

          return {
            ...message,
            user: getDataForUserItem(user),
          };
        })(hook.result),
      );

      return {
        ...hook,
        result: populatedMessages,
      };
    },
  },
};
