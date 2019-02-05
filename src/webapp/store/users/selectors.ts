import { createSelector } from 'reselect';

import roles from '@config/roles';
import { getHighestRole } from '@utils/has-permission';
import {
  AsyncStatus,
  State,
} from '@webapp/store';

type Role = keyof typeof roles;

const getUsers = (state: State) => state.users;

const makeGetUserStatusById = () => createSelector(
  getUsers,
  (_: State, id: string | null) => id,
  (users, id) => (id !== null && id in users ? users[id].status : AsyncStatus.NOT_STARTED),
);

const makeGetUserById = () => createSelector(
  getUsers,
  (_: State, id: string | null) => id,
  (users, id) => (id !== null && id in users ? users[id].item : null),
);

const makeGetUserErrorById = () => createSelector(
  getUsers,
  (_: State, id: string | null) => id,
  (users, id) => (id !== null && id in users ? users[id].error : null),
);

const makeGetUserRegion = () => createSelector(
  makeGetUserById(),
  user => (user === null ? null : user.region),
);

const makeGetUserRoles = () => createSelector(
  makeGetUserById(),
  user => (user === null ? [] : user.roles),
);

const makeGetSortedRoles = () => createSelector(
  makeGetUserRoles(),
  userRoles => [...userRoles].sort(
    (role1: Role, role2: Role) => roles[role1].level - roles[role2].level,
  ),
);

const makeGetHighestRole = () => createSelector(
  makeGetUserById(),
  user => (user === null ? null : getHighestRole(user)),
);

const makeGetLastPickup = () => createSelector(
  makeGetUserById(),
  user => (user === null ? null : user.lastPickup),
);

const makeGetUserName = () => createSelector(
  makeGetUserById(),
  user => (user === null ? null : user.name),
);

const makeGetUserIsOnline = () => createSelector(
  makeGetUserById(),
  user => (user === null ? false : user.online),
);

const makeGetUserLastOnline = () => createSelector(
  makeGetUserById(),
  user => (user === null ? false : user.lastOnline),
);

export {
  getUsers,
  makeGetUserName,
  makeGetSortedRoles,
  makeGetUserRegion,
  makeGetUserRoles,
  makeGetHighestRole,
  makeGetUserById,
  makeGetLastPickup,
  makeGetUserErrorById,
  makeGetUserStatusById,
  makeGetUserIsOnline,
  makeGetUserLastOnline,
};
