import is from 'is_js';

import { getDataForUserItem } from '../../../utils/users';

async function mentionFormatter(word, hook) {
  if (word === '@this') {
    return '<Link href="">@this</Link>';
  }

  const users = await hook.app.service('users').find({ query: { name: word.slice(1) } });

  if (users.length === 1) {
    const data = getDataForUserItem(users[0]);

    return `<UserItem user={${JSON.stringify(data)}} />`;
  }

  return word;
}

mentionFormatter.test = word => /^@\w+$/.test(word);

async function hasttagFormatter(word, hook) {
  const id = parseInt(word.slice(1), 10);

  if (id) {
    const pickups = await hook.app.service('pickup').find({ query: { id } });

    if (pickups.length === 1) {
      return `<Link href="/pickup/${id}">${word}</Link>`;
    }
  }

  return word;
}

hasttagFormatter.test = word => /^#\d+$/.test(word);

function linkFormatter(word) {
  return `<Link href="${word}">${word}</Link>`;
}

linkFormatter.test = word => is.url(word);

export const formatters = [
  mentionFormatter,
  hasttagFormatter,
  linkFormatter,
];

export function markdownFormatter(message) {
  return message
    .replace(/</g, '&gt;')
    .replace(/>/g, '&lt;')
    .replace(/__.+__/g, (word) => {
      return `<b>${word.slice(2, word.length - 2)}</b>`;
    })
    .replace(/\*\*.+\*\*/g, (word) => {
      return `<em>${word.slice(2, word.length - 2)}</em>`;
    });
}
