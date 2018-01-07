import gamemodes from '@tf2-pickup/configs/gamemodes';

import {
  filter,
  find,
  flatten,
  map,
  mapObject,
  pipe,
  pluck,
  reduce,
} from './functions';
import { getPlayer as getPlayerFromPickup } from './pickup';

export const getPlayers = pipe(
  pluck('classes'),
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

/**
 * Get the gamemode from the url.
 *
 * @param {String} url - The url to match.
 * @returns {(String|null)} - Returns the gamemode or null.
 */
export const getGamemodeFromUrl = (url) => {
  const match = url.match(/^\/(6v6|9v9|bball|ultiduo)$/);

  return match ? match[1] : null;
};

export const countPlayers = gamemode => pipe(
  pluck('classes'),
  mapObject((players, className) => Math.min(players.length, gamemodes[gamemode].slots[className])),
  Object.values,
  reduce((total, count) => total + count, 0),
);

export const addPlayerToClass = (className, player) => classes => Object.assign({}, classes, {
  [className]: [
    ...classes[className],
    player,
  ],
});

export const updateUserItem = (userId, obj) => mapObject(
  map((user) => {
    if (user.id === userId) {
      return Object.assign({}, user, obj);
    }

    return user;
  }),
);

export const sortClasses = mapObject(
  players => players.sort((player1, player2) => player1.joinedOn - player2.joinedOn),
);

/**
 * Checks if players is in a currently in an active pickup.
 *
 * @param {Object} app - The feathers app object.
 * @param {String} userId - Player's ID.
 * @returns {(Object|null)} - Returns the pickup or the null.
 */
export async function isPlayerInPickup(app, userId) {
  const serverStatus = [
    'setting-up-server',
    'waiting-for-game-to-start',
    'server-configuration-error',
    'game-is-live',
  ];
  const query = { status: { $in: serverStatus } };
  const pickups = await app.service('pickup').find({ query });

  return find(getPlayerFromPickup(userId))(pickups);
}
