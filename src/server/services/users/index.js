import mongoose from 'mongoose';
import service from 'feathers-mongoose';

import schema from './schema';
import hooks from './hooks';
import filters from './filters';

/**
 * Setup the users service.
 */
export default function users() {
  const that = this;

  that.service('users', service({
    Model: mongoose.model('Users', schema),
    id: 'id',
  }));

  that.service('users').hooks(hooks);
  that.service('users').filter(filters);
}
