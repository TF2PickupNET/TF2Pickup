// @flow

import {
  permissions,
  roles,
} from '../config';
import { type User } from '../types';

function computeLevel(user: User) {
  const highestRole = user.roles.reduce(
    (accu, role) => (accu.level <= roles[role].level ? roles[role] : accu),
    roles.user,
  );

  return highestRole.level;
}

export default function hasPermission(
  permission: $Keys<typeof permissions>,
  currentUser: User,
  targetUser: User | null = null,
) {
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
