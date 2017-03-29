import { randomString } from '/src/utils/string';
import {
  ADD_NOTIFICATION,
  REMOVE_NOTIFICATION,
} from './constants';

export function addNotification(text, timeout = null) {
  return {
    type: ADD_NOTIFICATION,
    payload: {
      notification: {
        id: randomString(),
        text,
        timeout,
      },
    },
  };
}

export function removeNotification(id) {
  return {
    type: REMOVE_NOTIFICATION,
    payload: { id },
  };
}
