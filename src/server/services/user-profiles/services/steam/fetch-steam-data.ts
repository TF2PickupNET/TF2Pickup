import debug from 'debug';

import UserProfile, { SteamProfile } from '@typings/UserProfile';
import steamApi from '@server/utils/steam-api';

import fetchFriends from './fetch-friends';
import fetchVacBans from './fetch-vac-bans';

const log = debug('TF2Pickup:userId-user-profiles:steam:data');


async function fetchSteamData(
  profile: UserProfile,
  oneDaySinceLastUpdate: boolean,
): Promise<{ steam?: SteamProfile }> {
  try {
    const { data } = await steamApi.get(
      'ISteamUser/GetPlayerSummaries/v0002/',
      { params: { steamids: profile.id } },
    );
    const player = data.response.players[0];

    const [bans, friends] = await Promise.all([
      fetchVacBans(profile),
      fetchFriends(profile, oneDaySinceLastUpdate),
    ]);

    return {
      steam: {
        ...profile.steam,
        id: profile.id,
        name: player.personaname,
        customUrl: player.profileurl,
        avatar: {
          small: player.avatar,
          medium: player.avatarmedium,
          large: player.avatarfull,
        },
        ...friends,
        ...bans,
      },
    };
  } catch (error) {
    log('Error while requesting steam data', {
      userId: profile.id,
      error,
    });

    return {};
  }
}

export default fetchSteamData;
