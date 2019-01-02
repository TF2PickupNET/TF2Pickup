import axios from 'axios';
import debug from 'debug';
import config from 'config';

import UserProfile from '../../../../../types/UserProfile';

import { findHighestDiv } from './utils';

const log = debug('TF2Pickup:userId-user-profiles:ozfortress:data');
const apikey = config.get('services.ozfortress.apikey');

export default async function getOzfortressData(
  user: UserProfile,
  oneDaySinceLastUpdate: boolean,
) {
  if (!oneDaySinceLastUpdate || apikey === null) {
    return {};
  }

  try {
    const result = await axios.get(
      `https://warzone.ozfortress.com/api/v1/users/steam_id/${user.id}`,
      { headers: { 'X-API-Key': apikey } },
    );
    const player = result.data.user;

    return {
      ozfortress: {
        ...user.ozfortress,
        id: player.id,
        name: player.name,
        div6v6: findHighestDiv(player.rosters),
      },
    };
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return {};
    }

    log('Error while requesting data from ozfortress', {
      userId: user.id,
      error,
    });

    return {};
  }
}
