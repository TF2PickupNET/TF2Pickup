import service from 'feathers-mongoose';
import mongoose from 'mongoose';

import schema from './schema';
import filters from './filters';
import hooks from './hooks';

/**
 * Setup the chat service.
 */
export default function chat() {
  const that = this;

  that.service('chat', service({ Model: mongoose.model('Chat', schema) }));

  that.service('chat').filter(filters);
  that.service('chat').hooks(hooks);
}
