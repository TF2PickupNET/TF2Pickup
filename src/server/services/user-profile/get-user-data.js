// @flow

import subDays from 'date-fns/sub_days';
import isBefore from 'date-fns/is_before';
import deepMerge from 'deepmerge';

import { type UserProfile } from '../../../types';

import getSteamData from './services/steam/get-steam-data';
import getSteamFriends from './services/steam/get-steam-friends';
import getVACBans from './services/steam/get-vac-bans';
import getOzfortressUserData from './services/ozfortress/get-ozfortress-data';
import getETF2LData from './services/etf2l/get-etf2l-data';

export default async function getUserData(user: UserProfile) {
  const yesterday = subDays(new Date(), 1);
  const oneDaySinceLastUpdate = user.lastUpdate ? isBefore(user.lastUpdate, yesterday) : true;
  const data = await Promise.all([
    getSteamData(user, oneDaySinceLastUpdate),
    getSteamFriends(user, oneDaySinceLastUpdate),
    getVACBans(user),
    getOzfortressUserData(user, oneDaySinceLastUpdate),
    getETF2LData(user, oneDaySinceLastUpdate),
  ]);

  return deepMerge.all([
    oneDaySinceLastUpdate ? { lastUpdate: new Date() } : {},
    ...data,
  ]);
}
