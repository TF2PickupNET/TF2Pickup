import {
  UPDATE_ALL_USERS,
  USER_CAME_ONLINE,
  USER_WENT_OFFLINE,
} from './constants';
import setupListeners from './setup-listeners';
import { omit } from '../../../utils/functions';

function reducer(state = {}, action) {
  switch (action.type) {
    case USER_CAME_ONLINE: {
      console.log(action.payload);
      return {
        ...state,
        [action.payload.user.id]: action.payload.user,
      };
    }
    case USER_WENT_OFFLINE: {
      return omit(action.payload.id)(state);
    }
    case UPDATE_ALL_USERS: {
      return action.payload.users;
    }
    default: return state;
  }
}

reducer.setupListeners = setupListeners;

export default reducer;
