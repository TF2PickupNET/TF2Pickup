export default {
  line: /Started map "(.*?)" \\(CRC "(.*?)"\\)/,
  // Match[1] - The map name.
  // Match[2] - The CRC value.
  handler(app, line, match) {
    // Do stuff
  },
};
