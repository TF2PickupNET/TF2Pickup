import mongoose from 'mongoose';
import service from 'feathers-mongoose';
import debug from 'debug';

import logListener from './log-listener';
import schema from './schema';

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
  }));

  logListener();
}
