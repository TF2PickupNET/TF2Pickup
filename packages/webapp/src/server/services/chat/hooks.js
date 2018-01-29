import {
  find,
  pipe,
} from '@tf2-pickup/utils';

import { getDataForUserItem } from '../../../utils/users';
import { populateResult } from '../hooks';

import { formatters } from './message-formatters';

/**
 * Populate a message with the user data.
 *
 * @param {Object} message - The message object.
 * @param {Object} hook - The hook object.
 * @returns {Object} - Returns the populated data.
 */
async function populate(message, hook) {
  const user = await hook.app.service('users').get(message.userId);

  return {
    ...message,
    user: getDataForUserItem(user),
  };
}

export default {
  before: {
    async create(hook) {
      const findFormatter = word => find(formatter => formatter.test(word), () => word);
      const formattedWords = await Promise.all(
        hook.data.message
          .split(' ')
          .map(word => pipe(
            findFormatter(word),
            formatter => formatter(word, hook),
          )(formatters)),
      );

      return {
        ...hook,
        data: {
          ...hook.data,
          message: formattedWords.join(' '),
        },
      };
    },
  },

  after: {
    create: populateResult(populate),
    find: populateResult(populate),
  },
};
