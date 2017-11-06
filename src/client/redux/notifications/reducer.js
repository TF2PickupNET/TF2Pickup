import {
  ADD_NOTIFICATION,
  REMOVE_NOTIFICATION,
} from './constants';

/**
 * The reducer for the notification store.
 *
 * @param {Object[]} [state] - The current state.
 * @param {Object} action - The action object.
 * @returns {Object[]} - Returns the new state.
 */
function reducer(state = [], action) {
  switch (action.type) {
    case ADD_NOTIFICATION:
      return state.concat([action.payload.notification]);
    case REMOVE_NOTIFICATION:
      return state.slice(1);
    default:
      return state;
  }
}

export default reducer;
