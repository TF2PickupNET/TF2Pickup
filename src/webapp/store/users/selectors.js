// @flow

import { createSelector } from 'reselect';

import { roles } from '../../../config';
import { type User } from '../../../types/User';

import { type State } from '..';

import { getHighestRole } from '../../../utils/has-permission';

type GetRoles = (state: State, id: string | null) => $PropertyType<User, 'roles'>;
type GetRegion = (state: State, id: string | null) => $PropertyType<User, 'region'>;
type GetHighestRole = (state: State, id: string | null) => $Keys<typeof roles> | null;

const getUsers = (state: State) => state.users;

function makeGetUserById(): (state: State, id: string | null) => User | null {
  return createSelector(
    getUsers,
    (users, id) => id,
    (users, id) => (id === null ? null : users[id] || null),
  );
}

function makeGetRegion(): GetRegion {
  return createSelector(
    makeGetUserById(),
    user => (user === null ? null : user.region),
  );
}

function makeGetRoles(): GetRoles {
  return createSelector(
    makeGetUserById(),
    user => (user === null ? [] : user.roles),
  );
}

function makeGetSortedRoles(): GetRoles {
  return createSelector(
    makeGetRoles(),
    // eslint-disable-next-line fp/no-mutating-methods
    userRoles => [...userRoles].sort((role1, role2) => roles[role1].level - roles[role2].level),
  );
}

function makeGetHighestRole(): GetHighestRole {
  return createSelector(
    makeGetUserById(),
    user => (user === null ? null : getHighestRole(user)),
  );
}

function makeGetLastPickup(): (state: State, id: string | null) => null | number {
  return createSelector(
    makeGetUserById(),
    user => (user === null ? null : user.lastPickup),
  );
}

function makeGetUserName(): (state: State, id: string | null) => null | string {
  return createSelector(
    makeGetUserById(),
    user => (user === null ? null : user.name),
  );
}

export {
  getUsers,
  makeGetUserName,
  makeGetSortedRoles,
  makeGetRoles,
  makeGetRegion,
  makeGetHighestRole,
  makeGetUserById,
  makeGetLastPickup,
};
