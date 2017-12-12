import mongoose from 'mongoose';
import service from 'feathers-mongoose';
import debug from 'debug';

import schema from './schema';
import hooks from './hooks';

const log = debug('TF2Pickup:logs');

/**
 * Set up the logs service.
 */
export default function errors() {
  const that = this;

  log('Setting up errors service');

  that.service('errors', service({
    Model: mongoose.model('Errors', schema),
    id: 'id',
  }));

  that.service('errors').hooks(hooks);
}
