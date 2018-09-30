// @flow

// eslint-disable-next-line filenames/match-exported
import axios from 'axios';
import debug from 'debug';
import isBefore from 'date-fns/is_before';

import { type UserProfile } from '../../../../../types/user-profile';

import getETF2LDivisions from './get-etf2l-divisions';

const log = debug('TF2Pickup:users:etf2l:data');

function findCurrentBan(bans) {
  return bans.find(
    ban => isBefore(ban.start, new Date()) && isBefore(new Date(), ban.end),
  );
}

export default async function getETF2LData(user: UserProfile, oneDaySinceLastUpdate: boolean) {
  try {
    const response = await axios.get(`http://api.etf2l.org/player/${user.id}.json`);
    const player = response.data.player;

    const divs = oneDaySinceLastUpdate ? await getETF2LDivisions(user.id, player.id) : {};
    const ban = player.bans === null ? null : findCurrentBan(player.bans);

    return {
      etf2l: {
        id: player.id,
        name: player.name,
        isBanned: ban !== null,
        bannedUntil: ban ? ban.end : null,
        ...divs,
      },
    };
  } catch (error) {
    log('Error while requesting ETF2L player data', {
      userId: user.id,
      error,
    });

    return {};
  }
}
