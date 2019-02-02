import debug from 'debug';
import { addDays } from 'date-fns';

import UserProfile, { WithBans } from 'types/UserProfile';
import steamApi from '../../../../utils/steam-api';

const log = debug('TF2Pickup:userId-user-profiles:steam:vac');

async function fetchVacBans(user: UserProfile): Promise<WithBans> {
  try {
    const params = { steamids: user.id };
    const result = await steamApi.get('ISteamUser/GetPlayerBans/v1/', { params });
    const player = result.data.players[0];

    return {
      isBanned: player.VACBanned && player.DaysSinceLastBan < 365,
      bannedUntil: addDays(new Date(), 365 - player.DaysSinceLastBan).getUTCSeconds(),
    };
  } catch (error) {
    log('Error while requesting VAC bans', {
      userId: user.id,
      error,
    });

    return {
      isBanned: false,
      bannedUntil: null,
    };
  }
}

export default fetchVacBans;
