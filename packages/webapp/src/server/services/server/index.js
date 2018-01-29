import mongoose from 'mongoose';
import service from 'feathers-mongoose';
import debug from 'debug';

import schema from './schema';
import hooks from './hooks';
import socketMethods from './socket-methods';
import cleanupServer from './cleanup-server';

const log = debug('TF2Pickup:server');

/**
 * Setup the server service.
 */
export default function server() {
  const that = this;

  log('Setting up server service');

  that.service('server', service({
    Model: mongoose.model('Server', schema),
    id: 'id',
  }));

  that.service('server').hooks(hooks);

  that.on('listening', () => {
    that.io.on('connection', socket => socketMethods(that, socket));
  });

  setTimeout(cleanupServer(that), 60 * 1000);

  setInterval(cleanupServer(that), 5 * 60 * 1000);
}
