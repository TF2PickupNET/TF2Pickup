import debug from 'debug';

import UserProfile from '../../../../../types/UserProfile';
import steamApi from '../../../../utils/steam-api';

const log = debug('TF2Pickup:userId-user-profiles:steam:friends');

interface Friend {
  steamid: string,
}

export default async function getSteamFriends(user: UserProfile, oneDaySinceLastUpdate: boolean) {
  if (!oneDaySinceLastUpdate) {
    return user.steam.friends;
  }

  try {
    const { data } = await steamApi.get('ISteamUser/GetFriendList/v0001/', {
      params: {
        steamid: user.id,
        relationship: 'friend',
      },
    });

    return data.friendslist.friends.map((friend: Friend) => friend.steamid);
  } catch (error) {
    log('Error while requesting steam friends', {
      userId: user.id,
      error,
    });

    return user.steam.friends;
  }
}
