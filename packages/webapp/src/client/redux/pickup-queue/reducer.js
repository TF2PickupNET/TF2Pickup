import {
  UPDATE_PICKUP,
  UPDATE_PICKUPS,
} from './constants';
import setupListeners from './setup-listeners';

/**
 * The reducer for the currently logged in user.
 *
 * @param {Object} [state] - The current state.
 * @param {Object} action - The action object.
 * @returns {Object} - Returns the new state.
 */
function reducer(state = null, action) {
  switch (action.type) {
    case UPDATE_PICKUP:
      return Object.assign({}, state, { [action.payload.gamemode]: action.payload.pickup });
    case UPDATE_PICKUPS:
      return action.payload.pickups;
    default:
      return state;
  }
}

reducer.setupListeners = setupListeners;

export default reducer;
