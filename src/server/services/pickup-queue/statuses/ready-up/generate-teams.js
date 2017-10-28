import flatten from 'lodash.flatten';
import debug from 'debug';

const log = debug('TF2Pickup:pickup-queue:statuses:generating-teams');

const priorities = {
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

const sortClass = classes => classes.sort((player1, player2) => player2.elo - player1.elo);

const getEloSum = players => players
  .map(player => player.elo)
  .reduce((total, elo) => total + elo);

function getAverageEloForTeam(classes) {
  const allPlayers = flatten(Object.values(classes));

  return Math.round(getEloSum(allPlayers) / allPlayers.length);
}

/**
 * Function to sort players by their elo.
 *
 * @param  {Array} teams - Array with teams.
 * @returns {Object} - Array with players sorted DESC by their elo.
 */
function getAvgTeamElo(teams) {
  const elos = Object
    .entries(teams)
    .reduce((obj, [team, classes]) => {
      return {
        ...obj,
        [team]: getAverageEloForTeam(classes),
      };
    }, {});

  return {
    ...elos,
    diff: Math.abs(elos.red - elos.blu),
  };
}

/**
 * Function to sort players by their elo.
 *
 * @param  {Array} arr - Array with teams.
 * @param  {String} mode - Gamemode string.
 * @returns {Array} - Array with balanced teams.
 */
// TODO: Rewrite this method without mutations
function balanceTeams(arr, mode) {
  priorities[mode].forEach((className) => {
    const players = arr.red[className];
    const teamElo = getAvgTeamElo(arr);

    /**
     * Swap players of this class
     * for 6s we dont swap scouts again
     * since we started with them and they should be balanced already
     */
    if (players.length === 1) {
      let p1 = arr.red[className].shift();
      let p2 = arr.blu[className].shift();

      arr.red[className].push(p2);
      arr.blu[className].push(p1);

      // Check elo and if less than before keep changes
      const newTeamElo = getAvgTeamElo(arr);

      if (newTeamElo.diff > teamElo.diff) {
        p1 = arr.red[className].shift();
        p2 = arr.blu[className].shift();

        arr.red[className].push(p2);
        arr.blu[className].push(p1);
      }
    }
  });

  return arr;
}

const usersToObject = users => users.reduce((obj, user) => {
  return {
    ...obj,
    [user.id]: user,
  };
}, {});

const repeats = new Array(5).fill(1);

/**
 * Function to sort players by their elo.
 *
 * @param  {Object} props - The props from the hook.
 * @param  {Object} players - Object with the classes and players.
 * @param  {String} mode - Gamemode string.
 * @returns {Array} - Array with balanced teams.
 */
export default async function generateTeams(props, players, mode) {
  const userService = props.app.service('users');

  const teams = {
    red: {},
    blu: {},
  };
  const allPlayers = flatten(Object.values(players));
  const users = await Promise
    .all(allPlayers.map(player => userService.get(player.id)))
    .then(usersToObject);

  // Get user elos per class and sort
  priorities[mode].forEach((className) => {
    teams.red[className] = [];
    teams.blu[className] = [];

    const playersForClass = sortClass(
      players[className].map((player) => {
        return {
          ...player,
          elo: users[player.id].elos[className],
        };
      }),
    );

    while (playersForClass.length > 0) {
      const avg = getAvgTeamElo(teams);
      const topPlayer = playersForClass.shift();
      const bottomPlayer = playersForClass.pop();

      if (avg.blu > avg.red) {
        teams.blu[className].push(bottomPlayer);
        teams.red[className].push(topPlayer);
      } else {
        teams.blu[className].push(topPlayer);
        teams.red[className].push(bottomPlayer);
      }
    }
  });

  return repeats.reduce(currentTeams => balanceTeams(currentTeams, mode), teams);
}
