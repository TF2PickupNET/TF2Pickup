import merge from 'lodash.merge';

import updateETF2LData from './etf2l/update-etf2l-data';
import updateSteamUserData from './steam/update-steam-user-data';
import updateSteamFriends from './steam/update-steam-friends';
import updateVACBans from './steam/update-vac-bans';
import updateTF2Hours from './steam/update-tf2-hours';

export default async function getUserData(steamId, oneDaySinceLastUpdate, app) {
  const methods = [
    updateSteamUserData(steamId, app),
    updateVACBans(steamId, app),
    updateETF2LData(steamId, app, oneDaySinceLastUpdate),
  ];

  if (oneDaySinceLastUpdate) {
    methods.push(
      updateSteamFriends(steamId, app),
      updateTF2Hours(steamId, app),
    );
  }

  const newData = await Promise.all(methods);

  return newData
    .concat(oneDaySinceLastUpdate ? { lastUpdate: new Date() } : {})
    .reduce((current, data) => merge({}, current, data), {});
}
