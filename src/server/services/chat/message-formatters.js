import { getDataForUserItem } from '../../../utils/users';
import hasPermission from '../../../utils/has-permission';

/**
 * The mention formatter.
 *
 * @param {String} word - The mention to transform.
 * @param {Object} hook - The hook object.
 * @returns {Promise} - Returns the formatted mention.
 */
async function mentionFormatter(word, hook) {
  const user = await hook.app.service('users').get(hook.data.userId);

  if (word === '@this' && hasPermission('chat.use-global-mention', user)) {
    if (hasPermission('chat.use-global-mention', user)) {
      hook.app.service('notifications').create({
        fromUser: user.id,
        forUsers: null,
        forRegion: hook.data.chat === 'global' ? null : hook.data.chat,
        message: `${user.name} mentioned you`,
        sound: 'notification',
      });

      return '<Link href="">@this</Link>';
    }

    return word;
  }

  const users = await hook.app.service('users').find({ query: { name: word.slice(1) } });

  if (users.length === 1) {
    const data = {
      ...getDataForUserItem(users[0]),
      name: `@${users[0].name}`,
    };

    hook.app.service('notifications').create({
      forUsers: [users[0].id],
      message: `${user.name} mentioned you`,
      sound: 'notification',
    });

    return `<UserItem user={${JSON.stringify(data)}} />`;
  }

  return word;
}

mentionFormatter.test = word => /^@\w+$/.test(word);

/**
 * The hashtag formatter for the message.
 *
 * @param {String} word - The word to format.
 * @param {String} hook - The hook object.
 * @returns {Promise} - Returns the new word as a promise.
 */
async function hashtagFormatter(word, hook) {
  const id = parseInt(word.slice(1), 10);

  if (id) {
    const pickups = await hook.app.service('pickup').find({ query: { id } });

    if (pickups.length === 1) {
      return `<Link href="/pickup/${id}">${word}</Link>`;
    }
  }

  return word;
}

hashtagFormatter.test = word => /^#\d+$/.test(word);

const urlRegex = /^(https:\/\/)?(www\.)?([a-z0-9-]+?\.[a-z]+)(\/.*)?$/;

/**
 * Format a link.
 *
 * @param {String} word - The word or in this case the link.
 * @returns {String} - Returns the new string.
 */
function linkFormatter(word) {
  const [,
    protocol = 'https://',
    ,
    host,
    rest = '',
  ] = urlRegex.exec(word);

  return `<Link href="${protocol}${host}${rest}">${host}${rest}</Link>`;
}

linkFormatter.test = word => urlRegex.test(word);

export const formatters = [
  mentionFormatter,
  hashtagFormatter,
  linkFormatter,
];

/**
 * Sanitize the html elements from the message and add some basic markdown formatting.
 *
 * @param {String} message - The message to format.
 * @returns {String} - The new message.
 */
export function markdownFormatter(message) {
  return message
    .replace(/</g, '&gt;')
    .replace(/>/g, '&lt;')
    .replace(/__.+__/g, word => `<b>${word.slice(2, word.length - 2)}</b>`)
    .replace(/\*\*.+\*\*/g, word => `<em>${word.slice(2, word.length - 2)}</em>`);
}
