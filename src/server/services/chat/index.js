import service from 'feathers-mongoose';
import mongoose from 'mongoose';

import schema from './schema';
import filters from './filters';
import socketMethods from './socket-methods';
import hooks from './hooks';

/**
 * Setup the chat service.
 */
export default function chat() {
  const that = this;

  that.service('chat', service({ Model: mongoose.model('Chat', schema) }));

  that.service('chat').filter(filters);
  that.service('chat').hooks(hooks);

  that.on('listening', () => {
    that.io.on('connection', socket => socketMethods(that, socket));
  });
}
