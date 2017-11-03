import { UPDATE_PICKUP } from './constants';
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
    default:
      return state;
  }
}

reducer.setupListeners = setupListeners;

export default reducer;
