export default {
  line: /World triggered "Game_Over" reason "(.*?)"/,
  // Data[1] - Reason for round end.
  async handler(app, line) {
    const pickup = await app.service('pickup').find({ query: { logsecret: line.secret } });
    const id = parseInt(pickup[0].id, 10);

    await app.service('pickup').patch(id, { $set: { status: 'game-finished' } });
  },
};
