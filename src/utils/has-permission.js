import roles from '../config/roles';
import permissions from '../config/permissions';

export const computeLevel = userRoles => Math.max(0, ...userRoles.map(name => roles[name].level));

/**
 * Check if the user has the permission for an action.
 *
 * @param {String} permission - The permission action.
 * @param {Object} loggedInUser - The logged in user.
 * @param {Object} [targetUser] - An optional logged in user.
 * @returns {Boolean} - Returns if the user has permission to perform the action.
 */
export default function hasPermission(permission, loggedInUser, targetUser = null) {
  const permissionInfo = permissions[permission];

  if (permissionInfo.selfEditing && targetUser.id === loggedInUser.id) {
    return true;
  }

  const loggedInUserLevel = computeLevel(loggedInUser.roles);

  if (targetUser) {
    const targetUserLevel = computeLevel(targetUser.roles);

    return loggedInUserLevel >= permissionInfo.level && loggedInUserLevel > targetUserLevel;
  }

  return loggedInUserLevel >= permissionInfo.level;
}
