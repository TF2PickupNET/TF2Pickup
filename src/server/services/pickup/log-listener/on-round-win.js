export default {
  line: /World triggered "Round_Win" (winner "(.*?)")/,

  // Data[1] - Winning team.
  async handler(app, line) {
    const service = app.service('pickup');
    const pickup = await service.find({ query: { logsecret: line.secret } });
    const team = line.data[0] === 'Blue' ? 'blu' : 'red';

    await service.patch(pickup.id, { $set: { [`score.${team}`]: pickup.score[team] + 1 } });
  },
};
