
export default {
  line: /World triggered "Round_Start"/,
  async handler(app, line) {
    const pickup = await app.service('pickup').find({ query: { logsecret: line.secret } });

    app.service('pickup').patch(pickup[0].id, { $set: { status: 'game-is-live' } });
  },
};
