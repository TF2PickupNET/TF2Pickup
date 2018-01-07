import {
  flatten,
  pipe,
  find,
  map,
  pluck,
} from './functions';

export const getPlayers = pipe(
  pluck('teams'),
  Object.values,
  map(Object.values),
  flatten,
);

export const getPlayer = playerId => pipe(
  getPlayers,
  find(player => player.id === playerId),
);
