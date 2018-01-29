import axios from 'axios';
import debug from 'debug';
import { gamemodes } from '@tf2-pickup/config';
import {
  pluck,
  filter,
  findIndex,
  map,
  reduce,
  pipe,
} from '@tf2-pickup/utils';

const log = debug('TF2Pickup:users:etf2l:get-divisions');

const oldDivsToNewDivs = {
  1: 'High',
  2: 'High',
  3: 'Mid',
  4: 'Mid',
  5: 'Open',
  6: 'Open',
};

const divs = [
  'N/A',
  'Open',
  'Mid',
  'High',
  'Prem',
];

const transformGamemode = gamemode => pluck(gamemode, gamemode)({
  '6on6': '6v6',
  Highlander: '9v9',
});

export { divs };

/**
 * Get the divisions for a user.
 *
 * @param {String} id - The players steam id.
 * @param {String} etf2lId - The players etf2l id.
 * @returns {Promise} - Returns a promise which will resolve with an object.
 */
export default async function getDivisions(id, etf2lId) {
  try {
    const response = await axios.get(`http://api.etf2l.org/player/${etf2lId}/results.json`, {
      params: {
        since: 0,
        per_page: 100, // eslint-disable-line camelcase
      },
    });
    const matches = response.data.results;

    return pipe(
      map((match) => {
        return {
          ...match,
          gamemode: transformGamemode(match.competition.type),
        };
      }),
      filter((match) => {
        const isNotMerc = match.merced === 0;
        const isAllowedGamemode = gamemodes[match.gamemode].displayDiv;

        return isNotMerc
               && gamemodes[match.gamemode].displayDiv
               && isAllowedGamemode
               && match.division.name !== null;
      }),
      map((match) => {
        return {
          ...match,
          divName: match.division.name.startsWith('Division')
            ? oldDivsToNewDivs[match.division.name.split(' ')[1].charAt(0)]
            : match.division.name,
        };
      }),
      reduce((currentDivs, match) => {
        const key = `div${match.gamemode}`;
        const level = findIndex(div => match.divName === div)(divs);
        const currentLevel = findIndex(div => currentDivs[key] === div)(divs);

        return {
          ...currentDivs,
          [key]: currentLevel < level ? match.divName : currentDivs[key],
        };
      }, {}),
    )(matches);
  } catch (error) {
    log('Error while updating ETF2L Divisions', id, error);

    return {};
  }
}
