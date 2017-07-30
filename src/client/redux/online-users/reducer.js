import {
  USER_LOGGED_IN,
  USER_LOGGED_OUT,
} from './constants';
import setupListeners from './setup-listeners';

/**
 * The reducer for the online users store.
 *
 * @param {Object[]} [state] - The current state.
 * @param {Object} action - The action object.
 * @returns {Object[]} - Returns the new state.
 */
export default function reducer(state = [], action) {
  switch (action.type) {
    case USER_LOGGED_IN:
      return state.concat([action.payload.user]);
    case USER_LOGGED_OUT:
      return state.filter(user => user.id === action.payload.id);
    default:
      return state;
  }
}

reducer.setupListeners = setupListeners;
