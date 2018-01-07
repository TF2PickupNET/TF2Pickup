export default {
  line: /World triggered "Round_Start"/,
  async handler(app, pickup) {
    if (pickup.status !== 'game-is-live') {
      await app.service('pickup').patch(pickup.id, { $set: { status: 'game-is-live' } });
    }
  },
};
