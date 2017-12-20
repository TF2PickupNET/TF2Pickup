import axios from 'axios';
import debug from 'debug';

const log = debug('TF2Pickup:pickup:log-listener:logstf');

export default {
  line: /The log is available here: (http|https):\/\/(.*?)\/(.*?) \./,

  // Data[1] - Protocol.
  // Data[2] - Website.
  // Data[3] - Logs.tf ID.
  async handler(app, line) {
    const pickup = await app.service('pickup').find({ query: { logsecret: line.secret } });

    await app.service('pickup').patch(pickup[0].id, { $set: { logsTFID: line.data[3] } });

    if (app.get('env') === 'prod') {
      try {
        await axios.post('localhost:9000/calculate-elo', { pickupId: pickup[0].id });
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
