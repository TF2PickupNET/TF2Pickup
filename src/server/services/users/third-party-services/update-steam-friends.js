import steamApi from './steam-api';

export default async function updateSteamFriends(id, app) {
  const friends = [];

  try {
    const result = await steamApi().get('ISteamUser/GetFriendList/v0001/', {
      params: {
        steamid: id,
        relationship: 'friend',
      },
    });

    friends.push(...result.data.friendslist.friends);
  } catch (error) {
    return app.service('logs').create({
      message: 'Error while updating steam friends',
      environment: 'server',
      info: error,
      steamId: id,
    });
  }

  return { friends: friends.map(friend => friend.steamid) };
}
