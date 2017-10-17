export default {
  line: /World triggered "Game_Over" reason "(.*?)"/,
  // Match[1] - Reason for round end.
  handler(app, line, match) {
    // Do stuff
  },
};
