import mongoose from 'mongoose';
import service from 'feathers-mongoose';
import debug from 'debug';

import schema from './schema';
import hooks from './hooks';
import filters from './filters';
import socketMethods from './socket-methods';

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
  }));

  that.service('users').hooks(hooks);
  that.service('users').filter(filters);

  that.on('listening', () => {
    that.io.on('connection', socket => socketMethods(that, socket));
  });
}
