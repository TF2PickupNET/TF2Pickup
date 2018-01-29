import SteamCommunity from 'steamcommunity';
import promisify from 'es6-promisify';
import debug from 'debug';

const community = new SteamCommunity();
const log = debug('TF2Pickup:authentication:steam-group');

/**
 * Get all group members of a steam group.
 *
 * @param {String} groupName - The name of the steam group.
 * @returns {String[]} - Returns the members of the steam group.
 */
export default async function getGroupMembers(groupName) {
  try {
    const steamGroup = await promisify(community.getSteamGroup, community)(groupName);
    const members = await promisify(steamGroup.getMembers, steamGroup)();

    return members.map(member => member.getSteamID64());
  } catch (error) {
    log('Error while getting group members', error);

    return [];
  }
}
