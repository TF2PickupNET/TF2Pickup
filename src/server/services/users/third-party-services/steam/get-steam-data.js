import debug from 'debug';

import createSteamApi from './create-steam-api';

const log = debug('TF2Pickup:users:steam:data');

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

  log('Requesting steam data', id);

  try {
    const params = { steamids: id };
    const result = await api.get('ISteamUser/GetPlayerSummaries/v0002/', { params });

    log('Finished request for steam data', id);

    player = result.data.response.players[0];

    return {
      services: {
        steam: {
          customUrl: player.profileurl,
          avatar: {
            small: player.avatar,
            medium: player.avatarmedium,
            large: player.avatarfull,
          },
        },
      },
    };
  } catch (error) {
    log('Error while requesting steam data', id, error);

    app.service('logs').create({
      message: 'Error while updating steam info',
      environment: 'server',
      info: error,
      steamId: id,
    });

    return {};
  }
}
