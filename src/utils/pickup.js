import gamemodes from '@tf2-pickup/configs/gamemodes';

import {
  flatten,
  pipe,
  find,
  mapObject,
  filter,
  reduce,
} from './functions';

export const getPlayers = pipe(
  Object.values,
  flatten,
);

export const getPlayer = playerId => pipe(
  getPlayers,
  find(player => player.id === playerId),
);

export const removePlayersFromClasses = players => mapObject(
  filter(player => !players.includes(player.id)),
);

export const getGamemodeFromUrl = url => {
  const match = url.match(/(6v6|9v9|bball|ultiduo)/);

  return match ? match[1] : null;
};

export const countPlayers = gamemode => pipe(
  mapObject((players, className) => Math.min(players.length, gamemodes[gamemode].slots[className])),
  Object.values,
  reduce((total, count) => total + count, 0),
);
