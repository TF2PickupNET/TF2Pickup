// @flow

type Match = {
  division: { name: string },
  competition: { type: string },
};

export const divs = [
  'N/A',
  'Open',
  'Mid',
  'High',
  'Prem',
];

export function normalizeDivisionName(match: Match) {
  if (/^Division \d/.test(match.division.name)) {
    const level = parseInt(match.division.name.charAt(9), 10);

    switch (level) {
      case 1: return 'High';
      case 2: return 'High';
      case 3: return 'Mid';
      case 4: return 'Mid';
      case 5: return 'Open';
      case 6: return 'Low';
      default: return match.division.name;
    }
  }

  return match.division.name;
}

export function normalizeGamemodeName(match: Match) {
  switch (match.competition.type) {
    case '6on6': return '6v6';
    case 'Highlander': return '9v9';
    default: return match.competition.type;
  }
}
