// @flow

import debug from 'debug';
import { type UserProfile } from '@tf2pickup/types';

import steamApi from '../../../steam-api';

const log = debug('TF2Pickup:user-profile:steam:data');

export default async function getSteamData(user: UserProfile, oneDaySinceLastUpdate: boolean) {
  if (!oneDaySinceLastUpdate) {
    return {};
  }

  try {
    const params = { steamids: user.id };
    const result = await steamApi.get('ISteamUser/GetPlayerSummaries/v0002/', { params });
    const player = result.data.response.players[0];

    return {
      steam: {
        id: user.id,
        customUrl: player.profileurl,
        avatar: {
          small: player.avatar,
          medium: player.avatarmedium,
          large: player.avatarfull,
        },
      },
    };
  } catch (error) {
    log('Error while requesting steam data', user.id, error);

    return {};
  }
}
