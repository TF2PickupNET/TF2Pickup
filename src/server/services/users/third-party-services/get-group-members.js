import SteamCommunity from 'steamcommunity';

import promisify from '/src/utils/promisify';

const community = new SteamCommunity();

export default async function getGroupMembers(groupName, app) {
  let steamGroup = null;
  let members = [];

  try {
    steamGroup = await promisify(community.getSteamGroup)(groupName);
    members = await promisify(steamGroup.getMembers)();
  } catch (error) {
    return app.service('logs').create({
      message: 'Error while getting group members',
      environment: 'server',
      info: error,
    });
  }

  return members.map(member => member.getSteamID64());
}
