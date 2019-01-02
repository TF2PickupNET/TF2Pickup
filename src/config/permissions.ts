import User from '../types/User';

import roles from './roles';

type PermissionUser = User & { level: number };
type PermissionFunc = (currentUser: PermissionUser, targetUser: PermissionUser | null) => boolean;
type Permission = PermissionFunc[];

function minLevel(level: number): PermissionFunc {
  return currentUser => currentUser.level >= level;
}

function hasHigherOrEqualLevel(): PermissionFunc {
  return (currentUser, targetUser) => targetUser !== null && currentUser.level >= targetUser.level;
}

const changeUsersRole: Permission = [
  minLevel(roles.headAdmin.level),
  hasHigherOrEqualLevel(),
];
const warningsCreate: Permission = [
  minLevel(roles.admin.level),
  (_, targetUser) => targetUser !== null && targetUser.level < roles.admin.level,
];
const warningsSee: Permission = [
  (currentUser, targetUser) => {
    if (targetUser === null) {
      return false;
    }

    return minLevel(roles.admin.level)(currentUser, targetUser) || targetUser.id === currentUser.id;
  },
];

const permissions = {
  'user.change-role': changeUsersRole,

  'warnings.create': warningsCreate,
  'warnings.see': warningsSee,
};

export default permissions;
