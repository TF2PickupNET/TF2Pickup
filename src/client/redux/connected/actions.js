import {
  CONNECTED,
  DISCONNECTED,
} from './constants';

/**
 * Create a action object to set the connected store to true.
 *
 * @returns {Object} - Returns the action object.
 */
export function connect() {
  return { type: CONNECTED };
}

/**
 * Create a action object to set the connected store to false.
 *
 * @returns {Object} - Returns the action object.
 */
export function disconnect() {
  return { type: DISCONNECTED };
}
