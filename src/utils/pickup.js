import {
  flatten,
  pipe,
  find,
  mapObject,
  filter,
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
