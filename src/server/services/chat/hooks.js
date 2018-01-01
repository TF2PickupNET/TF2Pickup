import { getDataForUserItem } from '../../../utils/users';
import { map } from '../../../utils/functions';

export default {
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
