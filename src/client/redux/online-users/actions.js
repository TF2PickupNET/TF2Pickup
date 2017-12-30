import {
  UPDATE_ALL_USERS,
  USER_CAME_ONLINE,
  USER_WENT_OFFLINE,
} from './constants';

export function userCameOnline(user) {
  return {
    type: USER_CAME_ONLINE,
    payload: { user },
  };
}

export function userWentOffline(id) {
  return {
    type: USER_WENT_OFFLINE,
    payload: { id },
  };
}

export function updateAllUsers(users) {
  return {
    type: UPDATE_ALL_USERS,
    payload: { users },
  };
}
