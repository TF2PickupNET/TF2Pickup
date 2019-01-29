import UserProfile from '../../../../../types/UserProfile';

import fetchFriends from './fetch-friends';
import fetchVacBans from './fetch-vac-bans';
import fetchProfileData from './fetch-profile-data';

async function fetchSteamData(user: UserProfile, oneDaySinceLastUpdate: boolean) {
  const [profile, bans, friends] = await Promise.all([
    fetchProfileData(user),
    fetchVacBans(user),
    fetchFriends(user, oneDaySinceLastUpdate),
  ]);

  return {
    steam: {
      ...user.steam,
      ...profile,
      ...bans,
      ...friends,
    },
  };
}

export default fetchSteamData;
