export default {
  line: /World triggered "Round_Start"/,
  async handler(app, line) {
    const pickup = await app.service('pickup').find({ query: { logsecret: line.secret } });
    const id = parseInt(pickup[0].id, 10);

    await app.service('pickup').patch(id, { $set: { status: 'game-is-live' } });
  },
};
