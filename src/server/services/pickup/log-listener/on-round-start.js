import debug from 'debug';

const log = debug('TF2Pickup:pickup:log-listener');

export default {
  line: /World triggered "Round_Start"/,
  async handler(app, pickup) {
    if (pickup.status !== 'game-is-live') {
      log('Setting pickup into game-is-live status', pickup.id);

      await app.service('pickup').patch(pickup.id, { $set: { status: 'game-is-live' } });
    }
  },
};
