import debug from 'debug';

import steamApi from './steam-api';

const log = debug('TF2Pickup:users:steam:vac');

/**
 * Get the VAC bans for a user.
 *
 * @param {String} id - The steamId of the user.
 * @returns {Object} - Returns the update data for the user.
 */
export default async function getVACBans(id) {
  let player = {};

  log('Requesting VAC bans', id);

  try {
    const params = { steamids: id };
    const result = await steamApi.get('ISteamUser/GetPlayerBans/v1/', { params });

    player = result.data.players[0];
  } catch (error) {
    log('Error while requesting VAC bans', id, error);

    return {};
  }

  return { services: { steam: { vacBanned: player.VACBanned && player.DaysSinceLastBan < 365 } } };
}
