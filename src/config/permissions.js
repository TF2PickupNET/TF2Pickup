// @flow

import { type User } from '../types/User';

import roles from './roles';

type PermissionUser = User & { level: number };
type PermissionFunc = (currentUser: PermissionUser, targetUser: PermissionUser | null) => boolean;
type Permission = $ReadOnlyArray<PermissionFunc>;

function minLevel(level): PermissionFunc {
  return currentUser => currentUser.level >= level;
}

function hasHigherOrEqualLevel(): PermissionFunc {
  return (currentUser, targetUser) => targetUser !== null && currentUser.level >= targetUser.level;
}

const changeUsersRole: Permission = [
  minLevel(roles.headAdmin.level),
  hasHigherOrEqualLevel(),
];
const alertUser: Permission = [minLevel(roles.admin.level)];
const deleteChatMessage: Permission = [minLevel(roles.admin.level)];
const useGlobalMention: Permission = [minLevel(roles.admin.level)];
const kickPlayerFromQueue: Permission = [minLevel(roles.admin.level)];
const endPickup: Permission = [minLevel(roles.admin.level)];
const reserveServer: Permission = [minLevel(roles.admin.level)];
const configureServer: Permission = [minLevel(roles.admin.level)];
const seeRCON: Permission = [minLevel(roles.admin.level)];
const useAllAnnouncers: Permission = [minLevel(roles.honoraryUser.level)];
const warningsCreate: Permission = [
  minLevel(roles.admin.level),
  (currentUser, targetUser) => targetUser !== null && targetUser.level < roles.admin.level,
];

const permissions = {
  'user.change-role': changeUsersRole,
  'user.user': alertUser,
  'chat.delete-message': deleteChatMessage,
  'chat.use-global-mention': useGlobalMention,
  'queue.kick-player': kickPlayerFromQueue,
  'pickup.end': endPickup,
  'server.reserve': reserveServer,
  'server.configure': configureServer,
  'server.see-rcon': seeRCON,
  'announcers.use-all': useAllAnnouncers,
  'warnings.create': warningsCreate,
};

export default permissions;
