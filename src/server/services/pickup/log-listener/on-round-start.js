export default {
  line: /World triggered "Round_Start"/,
  async handler(app, line) {
    const pickup = await app.service('pickup').find({ query: { logsecret: line.secret } });

    if (pickup.status !== 'game-is-live') {
      await app.service('pickup').patch(pickup[0].id, { $set: { status: 'game-is-live' } });
    }
  },
};
