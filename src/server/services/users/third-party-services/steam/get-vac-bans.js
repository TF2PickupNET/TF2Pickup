import createSteamApi from './create-steam-api';

/**
 * Get the VAC bans for a user.
 *
 * @param {String} id - The steamId of the user.
 * @param {Object} app - The feathers app.
 * @returns {Object} - Returns the update data for the user.
 */
export default async function getVACBans(id, app) {
  let player = {};

  try {
    const result = await createSteamApi().get('ISteamUser/GetPlayerBans/v1/', { steamids: id });

    player = result.data.players[0];
  } catch (error) {
    app.service('logs').create({
      message: 'Error while updating steam vac bans',
      environment: 'server',
      info: error,
      steamId: id,
    });

    return {};
  }

  return { services: { steam: { vacBanned: player.VACBanned && player.DaysSinceLastBan < 365 } } };
}
