// eslint-disable-next-line filenames/match-exported
import axios from 'axios';
import debug from 'debug';

import gamemodes from '../../../../../config/gamemodes';
import { ETF2LDivisions } from '../../../../../types/UserProfile';

import {
  divs,
  normalizeDivisionName,
  normalizeGamemodeName,
  Match,
} from './utils';

const log = debug('TF2Pickup:users:etf2l:get-divisions');

function normalizeMatch(match: Match): Match {
  return {
    ...match,
    gamemode: normalizeGamemodeName(match),
    divName: normalizeDivisionName(match),
  };
}

const isMatchValid = (match: Match) => match.merced === 0 && match.divName !== null;

function findHighestDiv(gamemode: keyof typeof gamemodes) {
  return (highestDiv: ETF2LDivisions, match: Match) => {
    if (match.gamemode !== gamemode) {
      return highestDiv;
    }

    const level = divs.findIndex(div => match.divName === div);
    const currentLevel = divs.findIndex(div => highestDiv === div);

    return currentLevel < level ? match.divName : highestDiv;
  };
}

export default async function getETF2LDivisions(id: string, etf2lId: string) {
  try {
    const response = await axios.get(`http://api.etf2l.org/player/${etf2lId}/results.json`, {
      params: {
        since: 0,
        per_page: 100, // eslint-disable-line camelcase, typescript/camelcase
      },
    });
    const matches = response.data.results;
    const filteredMatches = matches
      .filter(isMatchValid)
      .map(normalizeMatch);

    return {
      div6v6: filteredMatches.reduce(findHighestDiv('6v6'), 'N/A'),
      div9v9: filteredMatches.reduce(findHighestDiv('9v9'), 'N/A'),
    };
  } catch (error) {
    log('Error while updating ETF2L Divisions', {
      userId: id,
      error,
      data: { etf2lId },
    });

    return {};
  }
}
