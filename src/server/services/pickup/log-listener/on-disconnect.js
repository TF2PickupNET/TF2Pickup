export default {
  line: /"(.*?)<(.*?)><(.*?)><(.*?)>" disconnected \(reason "(.*?)"\)/,

  // Data[1] - Player's name.
  // Data[2] - Player's user number in server.
  // Data[3] - Player's steam3ID.
  // Data[4] - Player's team in server.
  // Data[5] - Reason for disconnect.
  async handler(app, line) {

  },
};
