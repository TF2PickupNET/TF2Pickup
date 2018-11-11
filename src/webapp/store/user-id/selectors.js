// @flow

import { createSelector } from 'reselect';

import { getUsers } from '../users/selectors';

import { type State } from '..';

import { type User } from '../../../types/User';

const getCurrentUserId = (state: State) => state.userId;

const getCurrentUser: (state: State) => User | null = createSelector(
  getUsers,
  getCurrentUserId,
  (users, userId) => (userId === null ? null : users[userId]),
);

function makeIsCurrentUser(): (state: State, id: string) => boolean {
  return createSelector(
    getCurrentUserId,
    (state, userId) => userId,
    (currentUserId, userId) => currentUserId === userId,
  );
}

export {
  getCurrentUserId,
  getCurrentUser,
  makeIsCurrentUser,
};
