import { UPDATE_PICKUP } from './constants';

/**
 * Create the action object for updating a pickup.
 *
 * @param {String} gamemode - The gamemode to update.
 * @param {Object} pickup - The new pickup.
 * @returns {Object} - Returns the action object.
 */
export function updatePickup(gamemode, pickup) { // eslint-disable-line import/prefer-default-export
  return {
    type: UPDATE_PICKUP,
    payload: {
      gamemode,
      pickup,
    },
  };
}
