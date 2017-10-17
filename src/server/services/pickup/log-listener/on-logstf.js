export default {
  line: /The log is available here: (http|https):\/\/(.*?)\/(.*?) \./,

  // Data[1] - Protocol.
  // Data[2] - Website.
  // Data[3] - Logs.tf ID.
  async handler(app, line) {
    const pickup = await app.service('pickup').find({ query: { logsecret: line.secret } });
    const id = parseInt(pickup[0].id, 10);

    await app.service('pickup').patch(id, { $set: { logsTFID: line.data[3] } });
  },
};
