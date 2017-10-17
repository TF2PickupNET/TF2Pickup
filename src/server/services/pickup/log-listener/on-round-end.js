export default {
  line: /World triggered "Game_Over" reason "(.*?)"/,
  // Data[1] - Reason for round end.
  async handler(app, line) {
    let pickup = await app.service('pickup').find({ query: { logsecret: line.secret } });

    app.service('pickup').patch(pickup[0].id, { $set: { status: 'game-finished' } });
  },
};
