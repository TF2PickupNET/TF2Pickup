import {
  arrayToObject,
  map,
  mapObject,
  pipe,
} from '../../utils/functions';
import { getPlayers } from '../../utils/pickup';

/**
 * Populate the pickup with the correct user data.
 *
 * @param {Object} app - The feathers app object.
 * @param {Object} players - The players to populate.
 * @returns {Object} - Returns the populated players.
 */
export default async function populateUserData(app, players) {
  const usersService = app.service('users');
  const usersArray = await Promise.all(
    pipe(
      getPlayers,
      map(player => usersService.get(player.id)),
    )(players),
  );
  const users = pipe(
    map((user) => {
      return {
        id: user.id,
        name: user.name,
        avatar: user.services.steam.avatar.medium,
        roles: user.roles,
      };
    }),
    arrayToObject(user => user.id),
  )(usersArray);

  return mapObject(
    map(player => Object.assign({}, player, users[player.id])),
  )(players);
}
