import {
  flatten,
  pipe,
  find,
  map,
  pluck,
} from '@tf2-pickup/utils';

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
