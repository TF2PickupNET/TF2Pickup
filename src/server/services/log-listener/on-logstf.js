import axios from 'axios';
import config from 'config';
import debug from 'debug';

const log = debug('TF2Pickup:log-listener:on-logs.tf');

export default {
  line: /\[TFTrue] The log is available here: (?:https|http):\/\/logs\.tf\/(\d+)/,

  // Data[1] - Logs.tf ID.
  async handler(app, pickup, [, logsId]) {
    log('Got Logs.tf id for pickup', pickup.id, logsId);

    await app.service('pickup').patch(pickup.id, { $set: { logsTFID: parseInt(logsId, 10) } });

    if (config.get('elo-calculation')) {
      try {
        await axios.post('localhost:9000/calculate-elo', { pickupId: pickup.id });
      } catch (error) {
        log('Error while calculating the elo for pickup', pickup.id, error);

        await app.service('discord-message').create({
          channel: 'errors',
          message: `There was an error while calculating the error for pickup ${pickup.id}`,
        });
      }
    }
  },
};
