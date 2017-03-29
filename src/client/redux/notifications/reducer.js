import {
  ADD_NOTIFICATION,
  REMOVE_NOTIFICATION,
} from './constants';

const defaultState = [];

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case ADD_NOTIFICATION:
      return state.concat([action.payload.notification]);
    case REMOVE_NOTIFICATION:
      return state.filter(({ id }) => id !== action.payload.id);
    default:
      return state;
  }
}
