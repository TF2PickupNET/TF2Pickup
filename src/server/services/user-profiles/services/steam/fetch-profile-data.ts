import debug from 'debug';

import UserProfile from '../../../../../types/UserProfile';
import steamApi from '../../../../utils/steam-api';

const log = debug('TF2Pickup:userId-user-profiles:steam:data');

async function fetchProfileData(user: UserProfile) {
  try {
    const { data } = await steamApi.get(
      'ISteamUser/GetPlayerSummaries/v0002/',
      { params: { steamids: user.id } },
    );
    const player = data.response.players[0];

    return {
      id: user.id,
      customUrl: player.profileurl,
      avatar: {
        small: player.avatar,
        medium: player.avatarmedium,
        large: player.avatarfull,
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

export default fetchProfileData;
