// @flow

import { createSelector } from 'reselect';

import { getUsers } from '../users/selectors';

import { type State } from '..';

export const getCurrentUserId = (state: State) => state.userId;

export const getCurrentUser = createSelector(
  getUsers,
  getCurrentUserId,
  (users, userId) => users[userId],
);

export function makeIsCurrentUser() {
  return createSelector(
    getCurrentUserId,
    (state, userId) => userId,
    (currentUserId, userId) => currentUserId === userId,
  );
}
