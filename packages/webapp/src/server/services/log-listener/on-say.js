export default {
  line: /"(.*?)<(.*?)><(.*?)><(.*?)>" (say|say_team) "(.*?)"/,

  // Data[1] - Player's name.
  // Data[2] - Player's user number in server.
  // Data[3] - Player's steam3ID.
  // Data[4] - Player's team in server.
  // Data[5] - say or say_team.
  // Data[6] - Player's chat.
  handler: () => {},
};
