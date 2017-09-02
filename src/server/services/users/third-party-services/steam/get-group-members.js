import SteamCommunity from 'steamcommunity';
import moment from 'moment';
import promisify from 'es6-promisify';

const community = new SteamCommunity();
let cachedMembers = [];
let lastCache = null;

/**
 * Get all group members of a steam group.
 *
 * @param {String} groupName - The name of the steam group.
 * @param {Object} app - The feathers app.
 * @returns {String[]} - Returns the members of the steam group.
 */
export default async function getGroupMembers(groupName, app) {
  if (lastCache === null || moment(lastCache).isBefore(moment().subtract(30, 'minutes'))) {
    lastCache = new Date();

    try {
      const steamGroup = await promisify(community.getSteamGroup, community)(groupName);
      const members = await promisify(steamGroup.getMembers, steamGroup)();

      cachedMembers = members.map(member => member.getSteamID64());
    } catch (error) {
      console.log(error);

      app.service('logs').create({
        message: `Error while getting group members for ${groupName}`,
        environment: 'server',
        info: error,
      });
    }
  }

  console.log(cachedMembers);

  return cachedMembers;
}
