import { createSelector } from 'reselect';

import roles from '../../../config/roles';
import { getHighestRole } from '../../../utils/has-permission';
import { AsyncStatus } from '../types';

import { State } from '..';

type Role = keyof typeof roles;

const getUsers = (state: State) => state.users;

const makeGetUserStatus = () => createSelector(
  getUsers,
  (_: State, id: string | null) => id,
  (users, id) => (id !== null && id in users ? users[id].status : AsyncStatus.NOT_STARTED),
);

const makeGetUser = () => createSelector(
  getUsers,
  (_: State, id: string | null) => id,
  (users, id) => (id !== null && id in users ? users[id].item : null),
);

const makeGetUserError = () => createSelector(
  getUsers,
  (_: State, id: string | null) => id,
  (users, id) => (id !== null && id in users ? users[id].error : null),
);

function makeGetRegion() {
  return createSelector(
    makeGetUser(),
    user => (user === null ? null : user.region),
  );
}

function makeGetRoles() {
  return createSelector(
    makeGetUser(),
    user => (user === null ? [] : user.roles),
  );
}

function makeGetSortedRoles() {
  return createSelector(
    makeGetRoles(),
    userRoles => [...userRoles].sort(
      (role1: Role, role2: Role) => roles[role1].level - roles[role2].level,
    ),
  );
}

function makeGetHighestRole() {
  return createSelector(
    makeGetUser(),
    user => (user === null ? null : getHighestRole(user)),
  );
}

function makeGetLastPickup() {
  return createSelector(
    makeGetUser(),
    user => (user === null ? null : user.lastPickup),
  );
}

function makeGetUserName() {
  return createSelector(
    makeGetUser(),
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
  makeGetUser,
  makeGetLastPickup,
  makeGetUserStatus,
  makeGetUserError,
};
