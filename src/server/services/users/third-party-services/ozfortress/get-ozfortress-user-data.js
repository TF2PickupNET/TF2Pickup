import axios from 'axios';

export const divs = [
  null,
  'Open',
  'Intermediate',
  'Premier',
];

/**
 * Find the highest division the user has played in.
 * Though this only means that the user was on them team while the team played in the division.
 *
 * @param {Object[]} rosters - The roasters the user played in.
 * @returns {String} - Returns the highest played division.
 */
function findHighestDiv(rosters) {
  return rosters
    .map(roster => roster.division)
    .reduce((highestDiv, currentDiv) => {
      const highestDivIndex = divs.findIndex(div => div === highestDiv);
      const currentDivIndex = divs.findIndex(div => div === currentDiv);

      return highestDivIndex < currentDivIndex ? currentDiv : highestDiv;
    }, null);
}

/**
 * Get the data for the user from ozfortress.
 *
 * @param {String} id - The steam id of the user.
 * @param {Object} app - The feathers app object.
 * @returns {Object} - Returns the new data.
 */
export default async function getOzfortressUserData(id, app) {
  try {
    const result = await axios.get(
      `https://warzone.ozfortress.com/api/v1/users/steam_id/${id}`,
      { headers: { 'X-API-Key': process.env.OZFORTRESS_API_KEY } },
    );
    const player = result.data.user;

    return {
      services: {
        ozfortress: {
          id: player.id,
          name: player.name,
          div6v6: findHighestDiv(player.rosters),
        },
      },
    };
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return {};
    }

    app.service('logs').create({
      message: 'Error while updating ozfortress player data',
      environment: 'server',
      info: error,
      steamId: id,
    });

    return {};
  }
}
