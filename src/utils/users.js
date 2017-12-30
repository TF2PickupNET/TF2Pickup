export function getDataForUserItem(user) {
  return {
    name: user.name,
    roles: user.roles,
    id: user.id,
    avatar: user.services.steam.avatar.medium,
  };
}
