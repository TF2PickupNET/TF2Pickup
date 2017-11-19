import mongoose from 'mongoose';
import service from 'feathers-mongoose';
import debug from 'debug';

import schema from './schema';
import hooks from './hooks';
import logListener from './log-listener';

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

  that.service('pickup').hooks(hooks);

  logListener(that);

  const player = { id: '76561198085010248' };
  const team = {
    scout: [player, player],
    roamer: [player],
    pocket: [player],
    demoman: [player],
    medic: [player],
  };

  that.service('pickup').patch(1, {
    $set: {
      serverId: 3,
      teams: {
        red: team,
        blu: team,
      },
      score: {
        blu: 1,
        red: 1,
      },
    },
  });
}
