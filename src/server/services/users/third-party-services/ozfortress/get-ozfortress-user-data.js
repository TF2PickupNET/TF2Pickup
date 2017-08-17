import axios from 'axios';

/**
 * Get the data for the user from ozfortress.
 *
 * @param {String} id - The steam id of the user.
 * @param {Object} app - The feathers app object.
 * @returns {Object} - Returns the new data.
 */
export default async function getOzfortressUserData(id, app) {
  try {
    await axios.get(
      `https://warzone.ozfortress.com//users/steam_id/${id}`,
      { headers: { 'X-API-Key': '' } },
    );

    return {};
  } catch (error) {
    app.service('logs').create({
      message: 'Error while updating ETF2L player data',
      environment: 'server',
      info: error,
      steamId: id,
    });

    return {};
  }
}
