// @flow

import { createSelector } from 'reselect';

import roles from '../../../config/roles';

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

export function makeGetRoles() {
  return createSelector(
    makeGetUserById(),
    user => (user === null ? [] : user.roles),
  );
}

export function makeGetHighestRole() {
  return createSelector(
    makeGetRoles(),
    userRoles => userRoles.reduce((highestRole, role: string) => {
      if (highestRole === null || roles[highestRole].level < roles[role].level) {
        return role;
      }

      return highestRole;
    }, null),
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
