import moment from 'moment';
import merge from 'lodash.merge';

import updateETF2LData from './third-party-services/update-etf2l-data';
import updateSteamUser from './third-party-services/update-steam-user';
import updateSteamFriends from './third-party-services/update-steam-friends';
import updateVACBans from './third-party-services/update-vac-bans';
import updateTF2Hours from './third-party-services/update-tf2-hours';

export default async function getNewUserData(user, app) {
  const yesterday = moment().subtract(1, 'day');
  const oneDaySinceLastUpdate = moment(user.lastUpdate).isBefore(yesterday) || !user.lastUpdate;
  const methods = [
    updateSteamUser(user.id, app),
    updateVACBans(user.id, app),
    updateETF2LData(user.id, app, oneDaySinceLastUpdate),
  ];

  if (oneDaySinceLastUpdate) {
    methods.push(
      updateSteamFriends(user.id, app),
      updateTF2Hours(user.id, app),
    );
  }

  const newData = await Promise.all(methods);

  return newData
    .concat(oneDaySinceLastUpdate ? { lastUpdate: new Date() } : {})
    .reduce((current, data) => merge({}, current, data), {});
}
