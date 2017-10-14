// eslint-disable-next-line filenames/match-exported
import axios from 'axios';
import moment from 'moment';
import debug from 'debug';
import config from 'config';

import {
  transformGamemode,
  oldDivsToNewDivs,
  divs,
} from './utils';

const log = debug('TF2Pickup:users:etf2l');
const displayGamemodeDivs = config.get('service.etf2l.divs');

/**
 * Get the player data from etf2l.
 *
 * @param {String} steamId - The users steamId.
 * @returns {Object} - Returns the players data.
 */
async function getPlayerData(steamId) {
  const result = await axios.get(`http://api.etf2l.org/player/${steamId}.json`);

  return result.data.player;
}

/**
 * Get the last 100 matches of a user.
 *
 * @param {String} etf2lId - The players etf2l id.
 * @returns {Object[]} - Returns the matches.
 */
async function getMatches(etf2lId) {
  const result = await axios.get(`http://api.etf2l.org/player/${etf2lId}/results.json`, {
    params: {
      since: 0,
      per_page: 100, // eslint-disable-line camelcase
    },
  });

  return result.data.results;
}

/**
 * Add the transformed gamemode to a match.
 *
 * @param {Object} match - The match object.
 * @returns {Object} - Returns the new match object.
 */
function addGamemodeToMatch(match) {
  return {
    ...match,
    gamemode: transformGamemode(match.competition.type),
  };
}

/**
 * Check if a match is valid.
 * We ignore matches where the user has merced
 * and the matches where we dont track the divisions for the gamemode.
 *
 * @param {Object} match - The match object.
 * @returns {Boolean} - Whether or not the match is valid.
 */
function isMatchValid(match) {
  const isNotMerc = match.merced === 0;
  const isAllowedGamemode = displayGamemodeDivs.includes(match.gamemode);

  return isNotMerc && isAllowedGamemode;
}

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
  let player = null;

  log('Requesting ETF2L player data', id);

  try {
    player = await getPlayerData(id);

    log('Finished requesting data from ETF2L', id);
  } catch (error) {
    log('Error while requesting ETF2L player data', id, error);

    app.service('logs').create({
      message: 'Error while updating ETF2L player data',
      environment: 'server',
      info: error,
      steamId: id,
    });

    return {};
  }

  const result = {
    services: {
      etf2l: {
        id: player.id,
        name: player.name,
      },
    },
  };

  if (player.bans !== null) {
    player.bans.forEach((ban) => {
      const now = moment();
      const start = moment(ban.start, 'X');
      const end = moment(ban.end, 'X');

      if (start.isBefore(now) && end.isAfter(now)) {
        result.services.etf2l.banned = true;
        result.services.etf2l.banExpiry = end;
      }
    });
  }

  if (oneDaySinceLastUpdate) {
    log('Updating users ETF2L divisions', id);

    try {
      const matches = await getMatches(player.id);

      matches
        .map(addGamemodeToMatch)
        .filter(isMatchValid)
        .forEach(({
          gamemode,
          division: { name },
        }) => {
          const key = `div${gamemode}`;
          const currentLevel = divs.indexOf(result.services.etf2l[key]) || 0;
          let divName = name;

          if (name !== null && name.startsWith('Division')) {
            const divLevel = name.split(' ')[1].charAt(0);

            divName = oldDivsToNewDivs[divLevel];
          }

          const level = divs.indexOf(divName);

          if (currentLevel < level) {
            result.services.etf2l[key] = divName;
          }
        });
    } catch (error) {
      log('Error while updating ETF2L Divisions', id, error);

      app.service('logs').create({
        message: 'Error while updating ETF2L divisions',
        environment: 'server',
        info: error,
        steamId: id,
      });
    }
  }

  return result;
}
