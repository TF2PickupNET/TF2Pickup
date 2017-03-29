import steamApi from './steam-api';

export default async function updateVACBans(id, app) {
  let player = {};

  try {
    const params = { steamids: id };
    const result = await steamApi().get('ISteamUser/GetPlayerBans/v1/', { params });

    player = result.data.players[0];
  } catch (error) {
    return app.service('logs').create({
      message: 'Error while updating steam vac bans',
      environment: 'server',
      info: error,
      steamId: id,
    });
  }

  return { services: { steam: { vacBanned: player.VACBanned && player.DaysSinceLastBan < 365 } } };
}
