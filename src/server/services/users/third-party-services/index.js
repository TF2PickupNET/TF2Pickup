/* eslint-disable filenames/match-exported */

import getETF2LData from './etf2l/get-etf2l-data';
import getSteamData from './steam/get-steam-data';
import getSteamFriends from './steam/get-steam-friends';
import getVACBans from './steam/get-vac-bans';
import getOZFortressUserData from './ozfortress/get-ozfortress-user-data';

/**
 * Get all of the updated user data.
 *
 * @param {String} steamId - The steamId of the user.
 * @param {Boolean} oneDaySinceLastUpdate - If one day has passed since the last update.
 * @param {Object} app - The feathers app.
 * @returns {Object} - Returns the updated data.
 */
export default async function getUserData(steamId, oneDaySinceLastUpdate, app) {
  const newData = await Promise.all([
    getSteamData(steamId, app),
    getVACBans(steamId, app),
    getETF2LData(steamId, app, oneDaySinceLastUpdate),
    getSteamFriends(steamId, app, oneDaySinceLastUpdate),
    getOZFortressUserData(steamId, app),
  ]);

  return newData
    .concat(oneDaySinceLastUpdate ? { lastUpdate: new Date() } : {})
    .reduce((current, data) => Object.assign({}, current, data), {});
}
