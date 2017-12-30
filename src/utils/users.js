/* eslint-disable import/prefer-default-export */

/**
 * Only return the actual needed properties for rendering a user item.
 *
 * @param {Object} user - The complete user object.
 * @returns {Object} - Returns the data for the UserItem component.
 */
export function getDataForUserItem(user) {
  return {
    name: user.name,
    roles: user.roles,
    id: user.id,
    avatar: user.services.steam.avatar.medium,
  };
}
