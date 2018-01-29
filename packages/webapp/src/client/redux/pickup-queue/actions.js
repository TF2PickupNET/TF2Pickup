import {
  UPDATE_PICKUP,
  UPDATE_PICKUPS,
} from './constants';

/**
 * Create the action object for updating a pickup.
 *
 * @param {String} gamemode - The gamemode to update.
 * @param {Object} pickup - The new pickup.
 * @returns {Object} - Returns the action object.
 */
export function updatePickup(gamemode, pickup) {
  return {
    type: UPDATE_PICKUP,
    payload: {
      gamemode,
      pickup,
    },
  };
}

/**
 * Replace the whole state with the new pickups.
 *
 * @param {Object} pickups - The new pickups.
 * @returns {Object} - Returns the action object.
 */
export function updatePickups(pickups) {
  return {
    type: UPDATE_PICKUPS,
    payload: { pickups },
  };
}
