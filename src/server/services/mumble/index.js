import mongoose from 'mongoose';
import service from 'feathers-mongoose';
import debug from 'debug';

import schema from './schema';
import hooks from './hooks';
import createLobby from './create-lobby';

const log = debug('TF2Pickup:mumble');

/**
 * Set up the mumble service.
 */
export default function mumble() {
  const that = this;

  log('Setting up mumble service');

  that.service('mumble', service({
    Model: mongoose.model('Mumble', schema),
    id: 'id',
  }));

  that.service('mumble').hooks(hooks);

  createLobby({ result: { region: 'eu' } });
}
