import {
  Forbidden,
  BadRequest,
} from '@feathersjs/errors';
import {
  ServerApp,
  SocketEventHandler,
} from '@feathersjs/feathers';
import { SocketConnection } from '@feathersjs/socketio';
import debug from 'debug';
import { hasPermission } from '@utils/has-permission';

const log = debug('TF2Pickup:users:events:on-remove-role');

export default function onRemoveRole(
  app: ServerApp,
  connection: SocketConnection,
): SocketEventHandler<'users:remove-role'> {
  const users = app.service('users');

  return async (data, cb) => {
    const currentUser = connection.feathers.user;

    try {
      const targetUser = await users.get(data.userId);

      if (!hasPermission('user.change-role', currentUser, targetUser)) {
        return cb(new Forbidden('You don\'t have the permission to remove the role'));
      }

      if (!targetUser.roles.includes(data.role)) {
        return cb(new BadRequest('The user doesn\'t have this role'));
      }

      const filteredRoles = targetUser.roles.filter(role => role !== data.role);

      await users.patch(data.userId, { roles: filteredRoles });

      log('Successfully removed a role from a user', {
        userId: currentUser.id,
        data,
      });

      return cb(null);
    } catch (error) {
      log('Error while removing a role from a user', {
        userId: currentUser.id,
        error,
        data,
      });

      return cb(error);
    }
  };
}
