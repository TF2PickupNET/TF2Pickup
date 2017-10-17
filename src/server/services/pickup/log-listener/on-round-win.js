export default {
  line: /World triggered "Round_Win" (winner "(.*?)")/,

  // Data[1] - Winning team.
  async handler(app, line) {
    const pickup = await app.service('pickup').find({ query: { logsecret: line.secret } });
    const team = line.data[0] === 'Blue' ? 'blu' : 'red';
    const bluScore = team === 'blu' ? pickup.score.blu + 1 : pickup.score.blu;
    const redScore = team === 'red' ? pickup.score.red + 1 : pickup.score.red;

    app.service('pickup').patch(pickup.id, {
      $set: {
        score: {
          blu: bluScore,
          red: redScore,
        },
      },
    });
  },
};
