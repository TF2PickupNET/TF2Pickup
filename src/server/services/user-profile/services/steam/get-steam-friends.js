// @flow

import debug from 'debug';

import { type UserProfile } from '../../../../../types';
import steamApi from '../../../steam-api';

const log = debug('TF2Pickup:user-profile:steam:friends');

export default async function getSteamFriends(user: UserProfile, oneDaySinceLastUpdate: boolean) {
  if (!oneDaySinceLastUpdate) {
    return {};
  }

  try {
    const result = await steamApi.get('ISteamUser/GetFriendList/v0001/', {
      params: {
        steamid: user.id,
        relationship: 'friend',
      },
    });
    const friends = result.data.friendslist.friends;

    return { friends: friends.map(friend => friend.steamid) };
  } catch (error) {
    log('Error while requesting steam friends', user.id, error);

    return {};
  }
}
