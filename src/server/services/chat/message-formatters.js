import { getDataForUserItem } from '../../../utils/users';

export async function mentionFormatter(word, hook) {
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

export async function hasttagFormatter(word, hook) {
  const id = parseInt(word.slice(1), 10);

  if (id) {
    const pickups = await hook.app.service('pickup').find({ query: { id } });

    if (pickups.length === 1) {
      return `<Link href="/pickup/${id}">${word}</Link>`;
    }
  }

  return word;
}
