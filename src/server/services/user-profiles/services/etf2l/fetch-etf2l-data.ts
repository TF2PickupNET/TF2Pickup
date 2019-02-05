// eslint-disable-next-line filenames/match-exported
import axios from 'axios';
import debug from 'debug';
import { isBefore } from 'date-fns';

import UserProfile, {
  WithBans,
  ETF2LProfile,
} from '@typings/UserProfile';

import getETF2LDivisions from './fetch-etf2l-divisions';

interface Ban {
  start: Date,
  end: Date,
}

interface Player {
  id: string,
  name: string,
  bans: Ban[],
}

interface Response {
  player: Player,
}

const log = debug('TF2Pickup:user-profiles:etf2l:fetch-data');

function getBannedStatus(player: Player): WithBans {
  if (player.bans !== null) {
    const currentBan = player.bans.find(
      ban => isBefore(ban.start, new Date()) && isBefore(new Date(), ban.end),
    );

    if (currentBan) {
      return {
        isBanned: true,
        bannedUntil: 0,
      };
    }
  }

  return {
    isBanned: false,
    bannedUntil: null,
  };
}

async function fetchETF2LData(
  profile: UserProfile,
  oneDaySinceLastUpdate: boolean,
): Promise<{ etf2l?: ETF2LProfile }> {
  try {
    const { data } = await axios.get<Response>(`http://api.etf2l.org/player/${profile.id}.json`);
    const player = data.player;

    const divs = await getETF2LDivisions(profile.id, player.id, oneDaySinceLastUpdate);

    return {
      etf2l: {
        ...profile.etf2l,
        id: player.id,
        name: player.name,
        ...getBannedStatus(player),
        ...divs,
      },
    };
  } catch (error) {
    log('Error while requesting ETF2L player data', {
      userId: profile.id,
      error,
    });

    return {};
  }
}

export default fetchETF2LData;
