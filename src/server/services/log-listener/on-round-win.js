import debug from 'debug';

const log = debug('TF2Pickup:log-listener:on-round-win');

export default {
  line: /World triggered "Round_Win" (winner "(.*?)")/,

  // Data[1] - Winning team.
  async handler(app, pickup, line) {
    const team = line.data[0] === 'Blue' ? 'blu' : 'red';

    log('Incrementing the score', team);

    await app.service('pickup').patch(
      pickup.id,
      { $set: { [`scores.${team}`]: pickup.scores[team] + 1 } },
    );
  },
};
