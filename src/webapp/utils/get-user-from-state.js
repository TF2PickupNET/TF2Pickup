// @flow

import { type Store } from '../store';

export default function getUserFromState(state: Store, userId: string) {
  if (state.user && state.user.id === userId) {
    return state.user;
  } else if (state.users[userId]) {
    return state.users[userId];
  }

  return null;
}
