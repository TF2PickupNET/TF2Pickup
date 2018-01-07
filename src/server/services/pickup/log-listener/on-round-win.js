export default {
  line: /World triggered "Round_Win" (winner "(.*?)")/,

  // Data[1] - Winning team.
  async handler(app, pickup, line) {
    const team = line.data[0] === 'Blue' ? 'blu' : 'red';

    await app.service('pickup').patch(
      pickup.id,
      { $set: { [`scores.${team}`]: pickup.scores[team] + 1 } },
    );
  },
};
