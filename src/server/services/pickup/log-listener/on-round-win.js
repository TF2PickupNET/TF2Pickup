export default {
  line: /World triggered "Round_Win" (winner "(.*?)")/,

  // Data[1] - Winning team.
  async handler(app, line) {
    const service = app.service('pickup');
    const pickup = await service.find({ query: { logsecret: line.secret } });
    const team = line.data[0] === 'Blue' ? 'blu' : 'red';

    await service.patch(pickup[0].id, { $set: { [`scores.${team}`]: pickup[0].scores[team] + 1 } });
  },
};
