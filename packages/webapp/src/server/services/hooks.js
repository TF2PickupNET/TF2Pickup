import {
  flatten,
  map,
  mapObject,
  pipe,
} from '@tf2-pickup/utils';

import { getDataForUserItem } from '../../utils/users';

/**
 * Populate the result in an after hook.
 *
 * @param {Function} func - The transform function.
 * @returns {Function} - Returns the hook function.
 */
export function populateResult(func) {
  return async (hook) => {
    const populatedResults = hook.method === 'find'
      ? await Promise.all(hook.result.map(item => func(item, hook)))
      : await func(hook.result, hook);

    return {
      ...hook,
      result: populatedResults,
    };
  };
}

/**
 * Auto increment the id of the previus document.
 *
 * @param {Object} hook - The hook object.
 * @returns {Object} - Returns the new hook.
 */
export async function incrementIdHook(hook) {
  const lastDocument = await hook.service.find({
    query: {
      $limit: 1,
      $sort: { id: -1 },
    },
  });

  return {
    ...hook,
    data: {
      ...hook.data,
      id: lastDocument[0] ? lastDocument[0].id + 1 : 1,
    },
  };
}

/**
 * Populate the pickup with the correct user data.
 *
 * @param {Object} players - The players to populate.
 * @param {Object} hook - The hook object.
 * @returns {Object} - Returns the populated players.
 */
export async function populateUserData(players, hook) {
  const usersService = hook.app.service('users');
  const users = new Map();

  await Promise.all(
    pipe(
      Object.values,
      flatten,
      map(async (player) => {
        const user = await usersService.get(player.id);

        users.set(player.id, getDataForUserItem(user));
      }),
    )(players),
  );

  return mapObject(
    map(player => Object.assign({}, player, users.get(player.id))),
  )(players);
}
