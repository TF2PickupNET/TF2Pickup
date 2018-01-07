// eslint-disable-next-line filenames/match-exported
import debug from 'debug';

import steamApi from './steam-api';

const tf2AppId = 440;
const log = debug('TF2Pickup:authentication:tf2-hours');

/**
 * Get the played tf2 hours of a user.
 *
 * @param {String} id - The users steamId.
 * @returns {Number} - The updated data for the user.
 */
export default async function getTF2Hours(id) {
  try {
    const result = await steamApi.get('IPlayerService/GetOwnedGames/v0001/', {
      params: {
        steamid: id,
        include_played_free_games: 1, // eslint-disable-line camelcase
      },
    });
    const game = result.data.response.games.find(({ appid }) => appid === tf2AppId);

    return Math.floor(game.playtime_forever / 60);
  } catch (error) {
    log('Error while getting tf2 hours', id, error);

    return null;
  }
}
