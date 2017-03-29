// eslint-disable-next-line filenames/match-exported
import axios from 'axios';
import moment from 'moment';

import {
  divs,
  transformGamemode,
  oldDivsToNewDivs,
} from '/src/utils/etf2l';
import { displayGamemodeDivs } from '/src/utils/common';

async function getPlayerData(steamId) {
  const result = await axios.get(`http://api.etf2l.org/player/${steamId}.json`);

  return result.data.player;
}

async function getMatches(etf2lId) {
  const result = await axios.get(`http://api.etf2l.org/player/${etf2lId}/results.json`, {
    params: {
      since: 0,
      per_page: 100, // eslint-disable-line camelcase
    },
  });

  return result.data.results;
}

export default async function updateETF2LData(id, app, updateDivs) {
  let player = null;
  let matches = [];

  try {
    player = await getPlayerData(id);
  } catch (error) {
    return app.service('logs').create({
      message: 'Error while updating etf2l info',
      environment: 'server',
      info: error,
      steamId: id,
    });
  }

  const result = {
    services: {
      etf2l: {
        id: player.id,
        username: player.name,
      },
    },
  };

  if (updateDivs) {
    try {
      matches = await getMatches(player.id);
    } catch (error) {
      app.service('logs').create({
        message: 'Error while updating etf2l divisions',
        environment: 'server',
        info: error,
        steamId: id,
      });
    }

    matches
      .map((match) => {
        return {
          ...match,
          gamemode: transformGamemode(match.competition.type),
        };
      })
      .filter((match) => {
        const isNotMerc = match.merced === 0;
        const isAllowedGamemode = displayGamemodeDivs.includes(match.gamemode);

        return isNotMerc && isAllowedGamemode;
      })
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
  }

  if (player.bans !== null) {
    player.bans.forEach((ban) => {
      const now = moment();
      const start = moment(ban.start, 'X');
      const end = moment(ban.end, 'X');

      if (start.isBefore(now) && end.isAfter(now)) {
        result.services.etf2l.banned = true;
        result.services.etf2l.banExpiry = true;
      }
    });
  }

  return result;
}
