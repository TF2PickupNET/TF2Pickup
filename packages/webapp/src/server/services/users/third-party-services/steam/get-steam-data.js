import debug from 'debug';

import steamApi from './steam-api';

const log = debug('TF2Pickup:users:steam:data');

/**
 * Get the users data from steam.
 *
 * @param {String} id - The steam id of the user.
 * @returns {Object} - Returns the data from steam.
 */
export default async function getSteamData(id) {
  try {
    const params = { steamids: id };
    const result = await steamApi.get('ISteamUser/GetPlayerSummaries/v0002/', { params });
    const player = result.data.response.players[0];

    return {
      'services.steam.customUrl': player.profileurl,
      'services.steam.avatar.small': player.avatar,
      'services.steam.avatar.medium': player.avatarmedium,
      'services.steam.avatar.large': player.avatarfull,

    };
  } catch (error) {
    log('Error while requesting steam data', id, error);

    return {};
  }
}
