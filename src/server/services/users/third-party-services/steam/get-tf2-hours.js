// eslint-disable-next-line filenames/match-exported
import createSteamApi from './create-steam-api';

const tf2AppId = 440;

/**
 * Get the played tf2 hours of a user.
 *
 * @param {String} id - The users steamId.
 * @param {Object} app - The feathers app object.
 * @param {Boolean} oneDaySinceLastUpdate - If the last update is at least one day ago.
 * @returns {Object} - The updated data for the user.
 */
export default async function getTF2Hours(id, app, oneDaySinceLastUpdate) {
  if (!oneDaySinceLastUpdate) {
    return {};
  }

  let games = [];

  try {
    const result = await createSteamApi().get('IPlayerService/GetOwnedGames/v0001/', {
      params: {
        steamid: id,
        include_played_free_games: 1, // eslint-disable-line camelcase
      },
    });

    games = result.data.response.games;
  } catch (error) {
    app.service('logs').create({
      message: 'Error while getting tf2 hours',
      environment: 'server',
      info: error,
      steamId: id,
    });

    return {};
  }

  const tf2 = games.find(({ appid }) => appid === tf2AppId);
  const tf2Hours = Math.floor(tf2.playtime_forever / 60);

  return { services: { steam: { tf2Hours } } };
}
