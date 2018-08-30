// @flow

import { createSelector } from 'reselect';

import { type State } from '..';

export function getUsers() {
  return (state: State) => state.users;
}

export function makeGetUserById() {
  return () => createSelector(
    getUsers,
    (state, userId) => userId,
    (users, userId) => users[userId] || null,
  );
}
