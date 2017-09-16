// eslint-disable-next-line filenames/match-exported
import debug from 'debug';

import createSteamApi from '../users/third-party-services/steam/create-steam-api';

const tf2AppId = 440;
const log = debug('TF2Pickup:authentication:tf2-hours');

/**
 * Get the played tf2 hours of a user.
 *
 * @param {String} id - The users steamId.
 * @param {Object} app - The feathers app object.
 * @returns {Number} - The updated data for the user.
 */
export default async function getTF2Hours(id, app) {
  log('Getting tf2 hours', id);

  try {
    const result = await createSteamApi().get('IPlayerService/GetOwnedGames/v0001/', {
      params: {
        steamid: id,
        include_played_free_games: 1, // eslint-disable-line camelcase
      },
    });
    const game = result.data.response.games.find(({ appid }) => appid === tf2AppId);

    return Math.floor(game.playtime_forever / 60);
  } catch (error) {
    log('Error while getting tf2 hours', id, error);

    app.service('logs').create({
      message: 'Error while getting tf2 hours',
      environment: 'server',
      info: error,
      steamId: id,
    });

    return null;
  }
}
