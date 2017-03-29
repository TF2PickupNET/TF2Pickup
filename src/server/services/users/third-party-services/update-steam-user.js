import steamApi from './steam-api';

export default async function updateSteamUser(id, app) {
  let player = {};

  try {
    const params = { steamids: id };
    const result = await steamApi().get('ISteamUser/GetPlayerSummaries/v0002/', { params });

    player = result.data.response.players[0];
  } catch (error) {
    return app.service('logs').create({
      message: 'Error while updating steam info',
      environment: 'server',
      info: error,
      steamId: id,
    });
  }

  const profileUrl = player.profileurl.match(/http:\/\/steamcommunity.com\/id\/(\w+\d+)/);

  return {
    isInGame: player.gameid === '440',
    services: {
      steam: {
        customUrl: profileUrl[1],
        avatar: {
          small: player.avatar,
          medium: player.avatarmedium,
          large: player.avatarfull,
        },
      },
    },
  };
}
