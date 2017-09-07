import mongoose from 'mongoose';
import service from 'feathers-mongoose';
import debug from 'debug';

import schema from './schema';
import hooks from './hooks';

const log = debug('TF2Pickup:logs');

/**
 * Set up the logs service.
 */
export default function logs() {
  const that = this;

  log('Setting up logs service');

  that.service('logs', service({
    Model: mongoose.model('Logs', schema),
    id: 'id',
  }));

  that.service('logs').hooks(hooks);
}
