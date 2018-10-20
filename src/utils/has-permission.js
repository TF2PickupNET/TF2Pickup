// @flow

import {
  permissions,
  roles,
} from '../config';
import { type User } from '../types/User';

const DEFAULT_ROLE = { level: 0 };

function computeLevel(user: User) {
  const highestRole = user.roles.reduce(
    (accu, role) => (accu.level <= roles[role].level ? roles[role] : accu),
    DEFAULT_ROLE,
  );

  return highestRole.level;
}

export default function hasPermission(
  permission: $Keys<typeof permissions>,
  currentUser: User | null,
  targetUser: User | null = null,
) {
  if (currentUser === null) {
    return false;
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
