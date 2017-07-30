import SteamCommunity from 'steamcommunity';

import promisify from 'es6-promisify';

const community = new SteamCommunity();

export default async function getGroupMembers(groupName, app) {
  let members = [];

  try {
    const steamGroup = await promisify(community.getSteamGroup)(groupName);

    members = await promisify(steamGroup.getMembers)();
  } catch (error) {
    return app.service('logs').create({
      message: `Error while getting group members for ${groupName}`,
      environment: 'server',
      info: error,
    });
  }

  return members.map(member => member.getSteamID64());
}
