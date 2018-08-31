// @flow

import { createSelector } from 'reselect';

import { type State } from '..';

export const getUsers = (state: State) => state.users;

export function makeGetUserById() {
  return createSelector(
    getUsers,
    (users, id) => id,
    (users, id) => (id === null ? null : users[id] || null),
  );
}

export function makeGetRegion() {
  return createSelector(
    makeGetUserById(),
    user => (user === null ? null : user.region),
  );
}

export function makeGetLastPickup() {
  return createSelector(
    makeGetUserById(),
    user => (user === null ? null : user.lastPickup),
  );
}

export function makeGetUserName() {
  return createSelector(
    makeGetUserById(),
    user => (user === null ? null : user.name),
  );
}
