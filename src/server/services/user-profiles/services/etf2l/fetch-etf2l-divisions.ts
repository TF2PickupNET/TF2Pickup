// eslint-disable-next-line filenames/match-exported
import axios from 'axios';
import debug from 'debug';
import gamemodes from '@config/gamemodes';
import {
  ETF2LDivisions, WithDivisions,
} from '@typings/UserProfile';
import { isNumber } from '@utils/number';

interface Match {
  merced: number,
  division: { name: string | null },
  competition: { type: keyof typeof gamemodes | '6on6' | 'Highlander' },
}

const log = debug('TF2Pickup:user-profiles:etf2l:fetch-divisions');

function normalizeDivisionName({ division }: Match): keyof typeof ETF2LDivisions | null {
  if (division.name === null) {
    return null;
  }

  if (division.name in ETF2LDivisions) {
    return division.name as keyof typeof ETF2LDivisions;
  }

  const match = division.name.match(/^Division \d/);
  const level = match && isNumber(match[1]) ? match[1] : -1;

  switch (level) {
    case 1:
    case 2:
      return 'High';
    case 3:
    case 4:
      return 'Mid';
    case 5:
      return 'Open';
    case 6:
      return 'Low';
    default:
      return null;
  }
}

function normalizeGamemodeName(match: Match): keyof typeof gamemodes | null {
  if (match.competition.type in gamemodes) {
    return match.competition.type as keyof typeof gamemodes;
  }

  switch (match.competition.type) {
    case '6on6':
      return '6v6';
    case 'Highlander':
      return '9v9';
    default:
      return null;
  }
}

function findHighestDiv(gamemode: keyof typeof gamemodes) {
  return (highestDiv: keyof typeof ETF2LDivisions, match: Match) => {
    const divName = normalizeDivisionName(match);
    const matchGamemode = normalizeGamemodeName(match);

    if (matchGamemode !== gamemode || divName === null || match.merced === 0) {
      return highestDiv;
    }

    const level = ETF2LDivisions[divName];
    const currentLevel = ETF2LDivisions[highestDiv];

    return currentLevel < level ? divName : highestDiv;
  };
}

const params = {
  // To get all of the matches
  since: 0,
  // eslint-disable-next-line camelcase, @typescript-eslint/camelcase
  per_page: 100,
};

const defaultDivisions: WithDivisions<typeof ETF2LDivisions> = {
  div6v6: 'N/A',
  div9v9: 'N/A',
};

async function fetchETF2LDivisions(
  id: string,
  etf2lId: string,
  oneDaySinceLastUpdate: boolean,
): Promise<WithDivisions<typeof ETF2LDivisions>> {
  if (!oneDaySinceLastUpdate) {
    return defaultDivisions;
  }

  try {
    const { data } = await axios.get(
      `http://api.etf2l.org/player/${etf2lId}/results.json`,
      { params },
    );

    return {
      div6v6: data.results.reduce(findHighestDiv('6v6'), 'N/A'),
      div9v9: data.results.reduce(findHighestDiv('9v9'), 'N/A'),
    };
  } catch (error) {
    log('Error while updating ETF2L Divisions', {
      userId: id,
      error,
      data: { etf2lId },
    });

    return defaultDivisions;
  }
}

export default fetchETF2LDivisions;
