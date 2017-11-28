import debug from 'debug';

import steamApi from './steam-api';

const log = debug('TF2Pickup:users:steam:friends');

/**
 * Get the steam friends of a user.
 *
 * @param {String} id - The users steamId.
 * @param {Object} app - The feathers app.
 * @param {Boolean} oneDaySinceLastUpdate - If the last update is at least one day ago.
 * @returns {Object} - The updated data for the user.
 */
export default async function getSteamFriends(id, app, oneDaySinceLastUpdate) {
  if (!oneDaySinceLastUpdate) {
    return {};
  }

  log('Requesting steam friends', id);

  let friends = [];

  try {
    const result = await steamApi.get('ISteamUser/GetFriendList/v0001/', {
      params: {
        steamid: id,
        relationship: 'friend',
      },
    });

    friends = result.data.friendslist.friends;
  } catch (error) {
    log('Error while requesting steam friends', id, error);

    return {};
  }

  return { friends: friends.map(friend => friend.steamid) };
}
