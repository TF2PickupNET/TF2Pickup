import mongoose from 'mongoose';
import service from 'feathers-mongoose';
import debug from 'debug';

import schema from './schema';
import hooks from './hooks';
import logListener from './log-listener';
import socketMethods from './socket-methods';
import filters from './filters';

const log = debug('TF2Pickup:pickup');

/**
 * Set up the logs service.
 */
export default function pickup() {
  const that = this;

  log('Setting up pickup service');

  that.service('pickup', service({
    Model: mongoose.model('Pickup', schema),
    id: 'id',
    events: ['redirect'],
  }));

  that.service('pickup').hooks(hooks);

  that.service('pickup').filter(filters);

  logListener(that);

  that.on('listening', () => {
    that.io.on('connection', socket => socketMethods(that, socket));
  });
}
