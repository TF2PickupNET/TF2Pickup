import mongoose from 'mongoose';
import service from 'feathers-mongoose';
import debug from 'debug';
import {
  subDays,
  isBefore,
} from 'date-fns';

import { pluck } from '../../../utils/functions';

import schema from './schema';
import hooks from './hooks';
import filters from './filters';
import socketMethods from './socket-methods';
import getNewUserData from './third-party-services';
import { getDataForUserItem } from '../../../utils/users';

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

    // This is needed because on the first login the user doesn't have a name yet
    if (connection.user.name) {
      that.service('users').emit('login', getDataForUserItem(connection.user));
    }
  });

  that.on('logout', async (payload, { connection }) => {
    const isStillConnected = Object
      .values(that.io.sockets.sockets)
      .some(socket => pluck('feathers.user.id')(socket) === connection.user.id);

    if (isStillConnected) {
      return;
    }

    try {
      log('User logged out', connection.user.id);

      await that.service('users').patch(connection.user.id, {
        $set: {
          online: false,
          lastOnline: Date.now(),
        },
      });
    } catch (error) {
      log('Error in logout callback', connection.user.id, error);
    }

    that.service('users').emit('logout', { id: connection.user.id });
  });
}
