import mongoose from 'mongoose';
import service from 'feathers-mongoose';
import debug from 'debug';

import schema from './schema';

const log = debug('TF2Pickup:servers');

/**
 * Setup the servers service.
 */
export default function servers() {
  const that = this;

  log('Setting up servers service');

  that.service('servers', service({
    Model: mongoose.model('Servers', schema),
    id: 'id',
  }));

  that.service('servers').create({
    id: 3,
    type: 'serveme',
    ip: '127.0.0.1',
    port: 27015,
    password: 'pw',
    rconPassword: 'rconPw',
    stvPort: 27020,
    stvPassword: 'stvPw',
  });
}
