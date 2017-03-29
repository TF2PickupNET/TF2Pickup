// eslint-disable-next-line filenames/match-exported
import steamApi from './steam-api';

export default async function updateTF2Hours(id, app) {
  const games = [];

  try {
    const result = await steamApi().get('IPlayerService/GetOwnedGames/v0001/', {
      params: {
        steamid: id,
        include_played_free_games: 1, // eslint-disable-line camelcase
      },
    });

    games.push(...result.data.response.games);
  } catch (error) {
    return app.service('logs').create({
      message: 'Error while getting tf2 hours',
      environment: 'server',
      info: error,
      steamId: id,
    });
  }

  const game = games.find(({ appid }) => appid === 440);
  const tf2Hours = Math.floor(game.playtime_forever / 60);

  return { services: { steam: { tf2Hours } } };
}
