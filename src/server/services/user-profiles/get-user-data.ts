import {
  isBefore,
  subDays,
} from 'date-fns';

import UserProfile from '@typings/UserProfile';

import fetchSteamData from './services/steam/fetch-steam-data';
import getOzfortressUserData from './services/ozfortress/fetch-ozfortress-data';
import fetchEtf2lData from './services/etf2l/fetch-etf2l-data';

export default async function getUserData(profile: UserProfile): Promise<UserProfile> {
  const yesterday = subDays(new Date(), 1);
  const oneDaySinceLastUpdate = profile.lastUpdate ? isBefore(profile.lastUpdate, yesterday) : true;
  const [steam, ozfortress, etf2l] = await Promise.all([
    fetchSteamData(profile, oneDaySinceLastUpdate || true),
    getOzfortressUserData(profile, oneDaySinceLastUpdate),
    fetchEtf2lData(profile, oneDaySinceLastUpdate),
  ]);

  return {
    ...profile,
    ...steam,
    ...ozfortress,
    ...etf2l,
    lastUpdate: oneDaySinceLastUpdate ? Date.now() : profile.lastUpdate,
  };
}
