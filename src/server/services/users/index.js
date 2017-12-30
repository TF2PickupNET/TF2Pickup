import mongoose from 'mongoose';
import service from 'feathers-mongoose';
import debug from 'debug';
import {
  subDays,
  isBefore,
} from 'date-fns';

import schema from './schema';
import hooks from './hooks';
import filters from './filters';
import socketMethods from './socket-methods';
import getNewUserData from './third-party-services';

const log = debug('TF2Pickup:users');

/**
 * Setup the users service.
 */
export default function users() {
  const that = this;

  log('Setting up users service');

  that.service('users', service({
    Model: mongoose.model('Users', schema),
    id: 'id',
    events: [
      'login',
      'logout',
    ],
  }));

  that.service('users').hooks(hooks);
  that.service('users').filter(filters);

  that.on('listening', () => {
    that.io.on('connection', socket => socketMethods(that, socket));
  });

  that.on('login', async (payload, { connection }) => {
    log('User logged in', connection.user.id);

    try {
      const yesterday = subDays(new Date(), 1);
      const oneDaySinceLastUpdate = isBefore(connection.user.lastUpdate, yesterday);
      const updatedData = await getNewUserData(connection.user.id, oneDaySinceLastUpdate, that);

      await that.service('users').patch(connection.user.id, {
        ...updatedData,
        online: true,
      });
    } catch (error) {
      log('Error in login callback', connection.user.id, error);
    }

    that.service('users').emit('login', {
      id: connection.user.id,
      name: connection.user.name,
      avatar: connection.user.services.steam.avatar.medium,
      roles: connection.user.roles,
    });
  });

  that.on('logout', async (payload, { connection }) => {
    log('User logged out', connection.user.id);

    try {
      await users.patch(connection.user.id, {
        $set: {
          online: false,
          lastOnline: Date.now(),
        },
      });
    } catch (error) {
      log('Error in logout callback', connection.user.id, error);
    }

    that.service('users').emit('logout', connection.user.id);
  });
}
