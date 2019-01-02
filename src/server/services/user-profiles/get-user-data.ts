import { isBefore, subDays } from 'date-fns';
import deepMerge from 'deepmerge';

import UserProfile from '../../../types/UserProfile';

import getSteamData from './services/steam/get-steam-data';
import getOzfortressUserData from './services/ozfortress/get-ozfortress-data';
import getETF2LData from './services/etf2l/get-etf2l-data';

export default async function getUserData(user: UserProfile) {
  const yesterday = subDays(new Date(), 1);
  const oneDaySinceLastUpdate = user.lastUpdate ? isBefore(user.lastUpdate, yesterday) : true;
  const data = await Promise.all([
    getSteamData(user, oneDaySinceLastUpdate || true),
    getOzfortressUserData(user, oneDaySinceLastUpdate),
    getETF2LData(user, oneDaySinceLastUpdate),
  ]);

  return deepMerge.all([
    oneDaySinceLastUpdate ? { lastUpdate: Date.now() } : {},
    ...data,
  ]);
}
