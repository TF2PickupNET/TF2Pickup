import mongoose from 'mongoose';
import service from 'feathers-mongoose';
import debug from 'debug';

import schema from './schema';
import hooks from './hooks';
import socketMethods from './socket-methods';

const log = debug('TF2Pickup:servers');

/**
 * Setup the servers service.
 */
export default function servers() {
  const that = this;

  log('Setting up servers service');

  that.service('servers', service({
    Model: mongoose.model('Servers', schema),
    id: 'id',
  }));

  that.service('servers').hooks(hooks);

  that.on('listening', () => {
    that.io.on('connection', socket => socketMethods(that, socket));
  });
}
