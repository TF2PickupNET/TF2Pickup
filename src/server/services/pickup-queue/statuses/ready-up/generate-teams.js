import debug from 'debug';

const log = debug('TF2Pickup:pickup-queue:statuses:generating-teams');

/**
 * Generate the teams.
 *
 * @returns {Object} - Returns the teams.
 */
export default function generateTeams(players) {

  log("generateTeams function");

  //get elo for each player/class and sort them accordingly

  Object.entries(players).forEach(([tfclass, users]) => {

    users.forEach(([key, value]) => {
      log(`${tfclass}: ${value.id}`);
    });

  });

  return {};
}
