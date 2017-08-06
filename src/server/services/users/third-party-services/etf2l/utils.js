const gamemodeNames = {
  '6on6': '6v6',
  Highlander: '9v9',
};

/**
 * ETF2L has different gamemode names which means that we have to transform them.
 *
 * @param {String} gamemode - The name of the gamemode of etf2l.
 * @returns {String} - Either returns the initial passed gamemode name or the transformed name.
 */
export function transformGamemode(gamemode) {
  return gamemodeNames[gamemode] || gamemode;
}

export const oldDivsToNewDivs = {
  1: 'High',
  2: 'High',
  3: 'Mid',
  4: 'Mid',
  5: 'Open',
  6: 'Open',
};

