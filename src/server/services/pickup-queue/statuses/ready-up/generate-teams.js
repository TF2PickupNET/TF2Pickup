import debug from 'debug';

const log = debug('TF2Pickup:pickup-queue:statuses:generating-teams');

const prio = {
  '6v6': [
    'scout',
    'demoman',
    'pocket',
    'roamer',
    'medic',
  ],
  '9v9': [
    'demoman',
    'sniper',
    'spy',
    'medic',
    'pyro',
    'scout',
    'soldier',
    'heavy',
    'engineer',
  ],
  bball: [
    'soldier',
  ],
  ultiduo: [
    'soldier',
    'medic',
  ],
};

/**
 * Function to sort players by their elo.
 *
 * @method sortClass
 * @param  {Array} arr - Array with players.
 * @returns {Array}   -   Array with players sorted DESC by their elo.
 */
function sortClass(arr) {
  arr.sort((p1, p2) => {
    if (p1.elo < p2.elo) {
      return 1;
    }

    if (p1.elo > p2.elo) {
      return -1;
    }

    return 0;
  });

  return arr;
}

/**
 * Function get EloSum for each class.
 *
 * @method getAvgTeamElo
 * @param  {Array} tfplayers - Array with players.
 * @returns {Number}   -   Sum of player elo.
 */
function getEloSum(tfplayers) {
  return tfplayers.map(item => item.elo).reduce((prev, next) => prev + next);
}

/**
 * Function to sort players by their elo.
 *
 * @method getAvgTeamElo
 * @param  {Array} arr - Array with teams.
 * @returns {Array}   -   Array with players sorted DESC by their elo.
 */
function getAvgTeamElo(arr) {
  const tmpElos = {
    red: 0,
    blu: 0,
    diff: 0,
  };

  Object.entries(arr).forEach(([team, tfclasses]) => {
    let pCount = 0;

    Object.entries(tfclasses).forEach((tfplayers) => {
      tmpElos[team] += getEloSum(tfplayers);
      pCount += tfplayers.length;
    });

    tmpElos[team] = Math.round(tmpElos[team] / pCount);
  });

  let diff = tmpElos.red - tmpElos.blu;

  if (diff < 0) {
    diff *= -1;
  }

  tmpElos.diff = diff;

  return tmpElos;
}

/**
 * Function to sort players by their elo.
 *
 * @param  {Array} arr - Array with teams.
 * @param  {String} mode - Gamemode string.
 * @returns {Array}   -   Array with balanced teams.
 */
function balanceTeams(arr, mode) {
  prio[mode].forEach((tfclass) => {
    const tfplayers = arr.red[tfclass];
    const avg = getAvgTeamElo(arr);
    let diff = avg.red - avg.blu;

    if (diff < 0) {
      diff *= -1;
    }

    /**
     * Swap players of this class
     * for 6s we dont swap scouts again
     * since we started with them and they should be balanced already
     */
    if (tfplayers.length === 1) {
      let p1 = arr.red[tfclass].shift();
      let p2 = arr.blu[tfclass].shift();

      arr.red[tfclass].push(p2);
      arr.blu[tfclass].push(p1);

      // Check elo and if less than before keep changes
      const newAvg = getAvgTeamElo(arr);
      let newDiff = newAvg.red - newAvg.blu;

      if (newDiff < 0) {
        newDiff *= -1;
      }

      if (newDiff > diff) {
        p1 = arr.red[tfclass].shift();
        p2 = arr.blu[tfclass].shift();

        arr.red[tfclass].push(p2);
        arr.blu[tfclass].push(p1);
      }
    }
  });

  return arr;
}

/**
 * Function to sort players by their elo.
 *
 * @param  {Object} props - The props from the hook.
 * @param  {Object} players - Object with the classes and players.
 * @param  {String} mode - Gamemode string.
 * @returns {Array}   -   Array with balanced teams.
 */
export default function generateTeams(props, players, mode) {
  const userService = props.app.service('users');

  let teams = {
    red: {},
    blu: {},
  };

  // Get user elos per class and sort

  prio[mode].forEach((tfclass) => {
    if (!Object.prototype.hasOwnProperty.call(teams.red, tfclass)) {
      teams.red[tfclass] = [];
    }

    if (!Object.prototype.hasOwnProperty.call(teams.blu, tfclass)) {
      teams.blu[tfclass] = [];
    }

    let users = players[tfclass];

    users.forEach((user) => {
      const userElos = userService.find({
        query: { id: user.id },
        limit: 1,
        sort: { elo: -1 },
      });

      /* eslint no-param-reassign: ["error", { "props": false }] */
      user.elo = userElos[tfclass];
    });

    users = sortClass(users);

    const max = users.length;

    while ((teams.red[tfclass].length + teams.blu[tfclass].length) < max) {
      const avg = getAvgTeamElo(teams);

      const top = users.shift();
      const bot = users.pop();

      if (avg.blu > avg.red) {
        teams.blu[tfclass].push(bot);
        teams.red[tfclass].push(top);
      } else {
        teams.blu[tfclass].push(top);
        teams.red[tfclass].push(bot);
      }
    }
  });

  // Running through teams
  for (let num = 0; num < 5; num += 1) {
    teams = balanceTeams(teams, mode);
  }
  log(teams);

  return teams;
}
