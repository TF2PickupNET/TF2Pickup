import mongoose from 'mongoose';
import service from 'feathers-mongoose';
import debug from 'debug';

import schema from './schema';
import hooks from './hooks';
import filters from './filters';
import socketMethods from './socket-methods';
import onLogin from './on-login';
import onLogout from './on-logout';

const log = debug('TF2Pickup:users');

/**
 * Setup the users service.
 */
export default async function users() {
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

  const onlineUsers = await that.service('users').find({ query: { online: true } });

  await Promise.all(
    onlineUsers.map(user => that.service('users').patch(user.id, {
      $set: {
        online: false,
        lastOnline: new Date(),
      },
    })),
  );

  that.on('login', onLogin(that));

  that.on('logout', onLogout(that));
}
