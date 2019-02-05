import { createSelector } from 'reselect';

import { makeGetUserById } from '@webapp/store/users/selectors';
import { State } from '@webapp/store';

const getCurrentUserId = (state: State) => state.userId;

const getUserById = makeGetUserById();

const getCurrentUser = createSelector(
  (state: State) => state,
  getCurrentUserId,
  getUserById,
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
