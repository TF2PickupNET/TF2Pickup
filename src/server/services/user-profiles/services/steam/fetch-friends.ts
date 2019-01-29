import debug from 'debug';

import UserProfile from '../../../../../types/UserProfile';
import steamApi from '../../../../utils/steam-api';

const log = debug('TF2Pickup:userId-user-profiles:steam:friends');

interface Friend {
  steamid: string,
}

async function fetchFriends(user: UserProfile, oneDaySinceLastUpdate: boolean) {
  if (!oneDaySinceLastUpdate) {
    return {};
  }

  try {
    const { data } = await steamApi.get('ISteamUser/GetFriendList/v0001/', {
      params: {
        steamid: user.id,
        relationship: 'friend',
      },
    });
    const friends = data.friendslist.friends.map((friend: Friend) => friend.steamid);

    return { friends };
  } catch (error) {
    log('Error while requesting steam friends', {
      userId: user.id,
      error,
    });

    return {};
  }
}

export default fetchFriends;
