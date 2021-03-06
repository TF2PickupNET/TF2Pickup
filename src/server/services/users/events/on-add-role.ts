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

const log = debug('TF2Pickup:users:events:on-add-role');

export default function onAddRole(
  app: ServerApp,
  connection: SocketConnection,
): SocketEventHandler<'users:add-role'> {
  const users = app.service('users');

  return async (data, cb) => {
    const currentUser = connection.feathers.user;

    try {
      const targetUser = await users.get(data.userId);

      if (!hasPermission('user.change-role', currentUser, targetUser)) {
        return cb(new Forbidden('You don\'t have the permission to add the role'));
      }

      if (targetUser.roles.includes(data.role)) {
        return cb(new BadRequest('The user already has the role'));
      }

      const roles = [
        ...targetUser.roles,
        data.role,
      ];

      await users.patch(data.userId, { roles });

      log('Successfully added a role to a user', {
        userId: currentUser.id,
        data,
      });

      return cb(null);
    } catch (error) {
      log('Error while adding a role to a user', {
        userId: currentUser.id,
        error,
        data,
      });

      return cb(error);
    }
  };
}
