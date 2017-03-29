export const divs = [
  'N/A',
  'Open',
  'Mid',
  'High',
  'Prem',
];

export const oldDivsToNewDivs = {
  1: 'High',
  2: 'High',
  3: 'Mid',
  4: 'Mid',
  5: 'Open',
  6: 'Open',
};

export function transformGamemode(gamemode) {
  const gamemodeNames = {
    '6on6': '6v6',
    Highlander: '9v9',
  };

  return gamemodeNames[gamemode] || gamemode;
}
