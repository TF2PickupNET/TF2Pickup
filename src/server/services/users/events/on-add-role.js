// @flow

import {
  Forbidden,
  BadRequest,
} from '@feathersjs/errors';
import { type App } from '@feathersjs/express';
import { type SocketConnection } from '@feathersjs/socketio';
import debug from 'debug';

import { roles } from '../../../../config';
import hasPermission from '../../../../utils/has-permission';

type Data = {
  role: $Keys<typeof roles>,
  userId: string,
};

const log = debug('TF2Pickup:users:events:on-add-role');

export default function onAddRole(app: App, connection: SocketConnection) {
  const users = app.service('users');

  return async (data: Data, cb: (Error | null) => void) => {
    const currentUser = connection.feathers.user;

    try {
      const targetUser = await users.get(data.userId);

      if (!hasPermission('user.change-role', currentUser, targetUser)) {
        return cb(new Forbidden('You don\'t have the permission to add the role'));
      }

      if (targetUser.roles.includes(data.role)) {
        return cb(new BadRequest('The user already has the role'));
      }

      await users.patch(data.userId, { $push: { roles: data.role } });

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
