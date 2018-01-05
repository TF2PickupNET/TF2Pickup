import is from 'is_js';

import { getDataForUserItem } from '../../../utils/users';

/**
 * The mention formatter.
 *
 * @param {String} word - The mention to transform.
 * @param {Object} hook - The hook object.
 * @returns {Promise} - Returns the formatted mention.
 */
async function mentionFormatter(word, hook) {
  if (word === '@this') {
    return '<Link href="">@this</Link>';
  }

  const users = await hook.app.service('users').find({ query: { name: word.slice(1) } });

  if (users.length === 1) {
    const data = {
      ...getDataForUserItem(users[0]),
      name: `@${users[0].name}`,
    };

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

/**
 * Format a link.
 *
 * @param {String} word - The word or in this case the link.
 * @returns {String} - Returns the new string.
 */
function linkFormatter(word) {
  return `<Link href="https://${word}">${word}</Link>`;
}

linkFormatter.test = word => is.url(word);

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
