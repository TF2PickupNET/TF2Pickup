import { getPlayers } from '../../../../../utils/pickup';
import {
  arrayToObject,
  flatten,
} from '../../../../../utils/functions';

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

/**
   * Function to sort players by their elo.
   *
   * @param  {Array} classes - Array with all players of a team.
   * @returns {Number} - Average elo of the team.
   */
function getAverageEloForTeam(classes) {
  const allPlayers = getPlayers(classes);

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
 * @param  {Object} teams - An object with the teams.
 * @param  {String} mode - Gamemode string.
 * @returns {Object} - Object with balanced teams.
 */
function balanceTeams(teams, mode) {
  priorities[mode].forEach((className) => {
    const players = teams.red[className];
    const teamElo = getAvgTeamElo(teams);

    /**
     * Swap players of this class
     * for 6s we dont swap scouts again
     * since we started with them and they should be balanced already
     */
    if (players.length === 1) {
      let p1 = teams.red[className].shift();
      let p2 = teams.blu[className].shift();

      teams.red[className].push(p2);
      teams.blu[className].push(p1);

      // Check elo and if less than before keep changes
      const newTeamElo = getAvgTeamElo(teams);

      if (newTeamElo.diff > teamElo.diff) {
        p1 = teams.red[className].shift();
        p2 = teams.blu[className].shift();

        teams.red[className].push(p2);
        teams.blu[className].push(p1);
      }
    }
  });

  return teams;
}

/**
 * Get the users data for the players.
 *
 * @param {Object} app - The feathers app object.
 * @param {Object[]} players - The players for the pickup.
 * @returns {Object} - Returns an object containing the user id's mapped to the users data.
 */
async function getUsers(app, players) {
  const service = app.service('users');
  const users = await Promise.all(players.map(player => service.get(player.id)));

  return arrayToObject('id')(users);
}

const repeats = new Array(5).fill(1);

/**
 * Function to sort players by their elo.
 *
 * @param  {Object} props - The props from the hook.
 * @param  {Object} players - Object with the classes and players.
 * @param  {String} mode - Gamemode string.
 * @returns {Object} - Object with balanced teams.
 */
export default async function generateTeams(props, players, mode) {
  const teams = {
    red: {},
    blu: {},
  };
  const allPlayers = flatten(Object.values(players));
  const users = await getUsers(props.app, allPlayers);

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
