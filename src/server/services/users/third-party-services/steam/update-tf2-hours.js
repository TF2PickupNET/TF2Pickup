// eslint-disable-next-line filenames/match-exported
import steamApi from './steam-api';

const tf2AppId = 440;

export default async function updateTF2Hours(id, app) {
  let games = [];

  try {
    const result = await steamApi.get('IPlayerService/GetOwnedGames/v0001/', {
      params: {
        steamid: id,
        include_played_free_games: 1, // eslint-disable-line camelcase
      },
    });

    games = result.data.response.games;
  } catch (error) {
    return app.service('logs').create({
      message: 'Error while getting tf2 hours',
      environment: 'server',
      info: error,
      steamId: id,
    });
  }

  const tf2 = games.find(({ appid }) => appid === tf2AppId);
  const tf2Hours = Math.floor(tf2.playtime_forever / 60);

  return { services: { steam: { tf2Hours } } };
}
