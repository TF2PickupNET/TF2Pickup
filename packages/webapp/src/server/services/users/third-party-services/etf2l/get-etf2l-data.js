// eslint-disable-next-line filenames/match-exported
import axios from 'axios';
import debug from 'debug';
import { isBefore } from 'date-fns';
import { some } from '@tf2-pickup/utils';

import getDivisions from './get-divisions';

const log = debug('TF2Pickup:users:etf2l');

/**
 * Get the data for the user from ETF2L.
 *
 * @param {String} id - The users steam id.
 * @param {Object} app - The feathers app.
 * @param {Boolean} oneDaySinceLastUpdate - Whether or not we should update the divisions.
 * We only want to do this once a day.
 * @returns {Object} - Returns the updated data.
 */
export default async function getETF2LData(id, app, oneDaySinceLastUpdate) {
  try {
    const response = await axios.get(`http://api.etf2l.org/player/${id}.json`);
    const player = response.data.player;

    const divs = oneDaySinceLastUpdate ? await getDivisions(id, player.id) : {};

    return {
      ...divs,
      'services.etf2l.id': player.id,
      'services.etf2l.name': player.name,
      'services.etf2l.isBanned': player.bans === null ? false : some(
        ban => isBefore(ban.start, new Date()) && isBefore(new Date(), ban.end),
      )(player.bans),
    };
  } catch (error) {
    log('Error while requesting ETF2L player data', id, error);

    return {};
  }
}
