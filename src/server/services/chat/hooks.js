import hooks from 'feathers-hooks-common';

import {
  getDataForUserItem,
  getUserIdFromHook,
} from '../../../utils/users';
import {
  filter,
  find,
  map,
  pipe,
} from '../../../utils/functions';
import hasPermission from '../../../utils/has-permission';
import { populateResult } from '../hooks';

import {
  formatters,
  markdownFormatter,
} from './message-formatters';

const globalMention = 'this';

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
    all(hook) {
      if (hook.method === 'create' || hook.method === 'find' || hook.method === 'get') {
        return hook;
      }

      return hooks.disallow()(hook);
    },

    create: [
      (hook) => {
        return {
          ...hook,
          data: {
            ...hook.data,
            userId: getUserIdFromHook(hook),
          },
        };
      },

      async (hook) => {
        await Promise.all(
          pipe(
            filter(word => word.startsWith('@')),
            map(mention => mention.slice(1)),
            filter((mention) => {
              if (mention === globalMention) {
                return hasPermission('chat.use-global-mention', hook.params.user);
              }

              return true;
            }),
            map((mention) => {
              if (mention === globalMention) {
                return hook.data.chat === 'global' ? null : {
                  online: true,
                  'settings.region': hook.data.chat,
                };
              }

              return { name: mention };
            }),
            map(async (query) => {
              const users = query
                ? await hook.app.service('users').find({ query })
                : null;

              await hook.app.service('notifications').create({
                fromUser: hook.params.user.id,
                forUsers: users ? users.map(user => user.id) : null,
                message: `${hook.params.user.name} mentioned you`,
                sound: 'notification',
              });
            }),
          )(hook.data.message.split(' ')),
        );
      },

      // Format some markdown things like __ and **
      (hook) => {
        return {
          ...hook,
          data: {
            ...hook.data,
            message: markdownFormatter(hook.data.message),
          },
        };
      },

      // Format the words with a special formatter
      async (hook) => {
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
    ],
  },

  after: {
    create: populateResult(populate),
    find: populateResult(populate),
  },
};
