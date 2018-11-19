// @flow

import {
  permissions,
  roles,
} from '../config';
import { type User } from '../types/User';

type Permission = $Keys<typeof permissions>;

function getHighestRole(user: User): $Keys<typeof roles> | null {
  return user.roles.reduce((highestRole, role) => {
    if (highestRole === null || roles[highestRole].level < roles[role].level) {
      return role;
    }

    return highestRole;
  }, null);
}

function computeLevel(user: User) {
  const highestRole = getHighestRole(user);

  return highestRole === null ? 0 : roles[highestRole].level;
}

function hasPermission(
  permission: Permission,
  currentUser: User | null,
  targetUser: User | null = null,
) {
  if (currentUser === null) {
    return false;
  }

  if (targetUser !== null && targetUser.id === currentUser.id) {
    return process.env.NODE_ENV === 'development';
  }

  const validators = permissions[permission];
  const currentUserWithLevel = {
    ...currentUser,
    level: computeLevel(currentUser),
  };
  const targetUserWithLevel = targetUser === null ? null : {
    ...targetUser,
    level: computeLevel(targetUser),
  };

  return validators.every(validator => validator(currentUserWithLevel, targetUserWithLevel));
}

function hasSomePermission(
  perms: $ReadOnlyArray<Permission>,
  currentUser: User | null,
  targetUser: User | null = null,
) {
  return perms.some(
    permission => hasPermission(permission, currentUser, targetUser)
  );
}

export {
  hasPermission,
  getHighestRole,
  computeLevel,
  hasSomePermission,
};
