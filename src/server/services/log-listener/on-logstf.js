import axios from 'axios';
import debug from 'debug';

const log = debug('TF2Pickup:log-listener:on-logs.tf');

export default {
  line: /\[TFTrue] The log is available here: (?:https|http):\/\/logs\.tf\/(\d+)/,

  // Data[1] - Logs.tf ID.
  async handler(app, pickup, [, id]) {
    await app.service('pickup').patch(pickup.id, { $set: { logsTFID: parseInt(id, 10) } });

    log('Got Logs.tf id for pickup', pickup.id, id);

    if (app.get('env') === 'prod') {
      try {
        await axios.post('localhost:9000/calculate-elo', { pickupId: pickup.id });
      } catch (error) {
        log('Error while calculating the elo for pickup', pickup.id, error);

        await app.service('discord-message').create({
          channel: 'errors',
          message: `The request for calculating the elo after the pickup ${pickup[0].id}
           returned with an error`,
        });
      }
    }
  },
};
