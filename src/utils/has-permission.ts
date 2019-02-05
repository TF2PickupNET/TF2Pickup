import permissions from '../config/permissions';
import roles from '../config/roles';
import User from '../typings/User';

type Permission = keyof typeof permissions;
type Role = keyof typeof roles;

function getHighestRole(user: User): Role | null {
  return user.roles.reduce((highestRole: Role | null, role) => {
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

const env = process.env.NODE_ENV;

function hasPermission(
  permission: Permission,
  currentUser: User | null,
  targetUser: User | null = null,
) {
  if (currentUser === null) {
    return false;
  }

  if (targetUser !== null && targetUser.id === currentUser.id) {
    return env === 'development';
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
  perms: Permission[],
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
