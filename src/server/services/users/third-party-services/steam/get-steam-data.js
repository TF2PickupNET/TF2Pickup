import createSteamApi from './create-steam-api';

/**
 * Get the users data from steam.
 *
 * @param {String} id - The steam id of the user.
 * @param {Object} app - The feathers app.
 * @returns {Object} - Returns the data from steam.
 */
export default async function getSteamData(id, app) {
  let player = {};
  const api = createSteamApi();

  try {
    const params = { steamids: id };
    const result = await api.get('ISteamUser/GetPlayerSummaries/v0002/', { params });

    player = result.data.response.players[0];
  } catch (error) {
    app.service('logs').create({
      message: 'Error while updating steam info',
      environment: 'server',
      info: error,
      steamId: id,
    });

    return {};
  }

  const profileUrl = player.profileurl.match(/http:\/\/steamcommunity.com\/id\/(\w+\d+)/);

  return {
    services: {
      steam: {
        customUrl: profileUrl[1],
        avatar: {
          small: player.avatar,
          medium: player.avatarmedium,
          large: player.avatarfull,
        },
      },
    },
  };
}
