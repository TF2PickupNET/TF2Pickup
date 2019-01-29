import gamemodes from '../../../../../config/gamemodes';
import { ETF2LDivisions } from '../../../../../types/UserProfile';
import { isNumber } from '../../../../../utils/number';

interface Match {
  merced: number,
  division: { name: string },
  competition: { type: keyof typeof gamemodes | '6on6' | 'Highlander' },
  gamemode: keyof typeof gamemodes | null,
  divName: string | null,
}

const divs: ETF2LDivisions[] = [
  'N/A',
  'Open',
  'Mid',
  'High',
  'Prem',
];

function normalizeDivisionName({ division }: Match): ETF2LDivisions | null {
  if (division.name === null) {
    return null;
  }

  if (divs.includes(division.name as ETF2LDivisions)) {
    return division.name as ETF2LDivisions;
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

export {
  Match,
  normalizeDivisionName,
  normalizeGamemodeName,
  divs,
};
