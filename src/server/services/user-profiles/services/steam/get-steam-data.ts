import debug from 'debug';

import UserProfile from '../../../../../types/UserProfile';
import steamApi from '../../../../utils/steam-api';
import getSteamFriends from './get-steam-friends';
import getVACBans from './get-vac-bans';

const log = debug('TF2Pickup:userId-user-profiles:steam:data');

export default async function getSteamData(user: UserProfile, oneDaySinceLastUpdate: boolean) {
  try {
    const params = { steamids: user.id };
    const result = await steamApi.get('ISteamUser/GetPlayerSummaries/v0002/', { params });
    const player = result.data.response.players[0];
    const friends = await getSteamFriends(user, oneDaySinceLastUpdate);
    const bans = await getVACBans(user);

    return {
      steam: {
        ...user.steam,
        ...bans,
        id: user.id,
        customUrl: player.profileurl,
        friends,
        avatar: {
          small: player.avatar,
          medium: player.avatarmedium,
          large: player.avatarfull,
        },
      },
    };
  } catch (error) {
    log('Error while requesting steam data', {
      userId: user.id,
      error,
    });

    return {};
  }
}
