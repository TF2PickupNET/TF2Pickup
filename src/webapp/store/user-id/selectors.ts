import { createSelector } from 'reselect';

import { getUsers } from '../users/selectors';

import { State } from '..';

const getCurrentUserId = (state: State) => state.userId;

const getCurrentUser = createSelector(
  getUsers,
  getCurrentUserId,
  (users, userId) => {
    if (userId === null || !users[userId]) {
      return null;
    }

    return users[userId].item;
  },
);

function makeIsCurrentUser() {
  return createSelector(
    getCurrentUserId,
    (_: State, userId: string) => userId,
    (currentUserId, userId) => currentUserId === userId,
  );
}

export {
  getCurrentUserId,
  getCurrentUser,
  makeIsCurrentUser,
};
