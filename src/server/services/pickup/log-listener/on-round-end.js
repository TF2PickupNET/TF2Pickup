export default {
  line: /World triggered "Game_Over" reason "(.*?)"/,

  // Data[1] - Reason for round end.
  async handler(app, pickup) {
    await app.service('pickup').patch(pickup.id, { $set: { status: 'game-finished' } });
  },
};
