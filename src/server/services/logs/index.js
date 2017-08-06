import mongoose from 'mongoose';
import service from 'feathers-mongoose';

import schema from './schema';
import hooks from './hooks';

/**
 * Set up the logs service.
 */
export default function logs() {
  const that = this;

  that.service('logs', service({
    Model: mongoose.model('Logs', schema),
    id: 'id',
  }));

  that.service('logs').hooks(hooks);
}
