// @flow

type ClassInfo = {|
  name: string,
  aliases: $ReadOnlyArray<string>,
|};

const classes = {
  scout: {
    name: 'scout',
    aliases: [],
  },

  soldier: {
    name: 'soldier',
    aliases: ['solly'],
  },

  pocket: {
    name: 'pocket',
    aliases: [],
  },

  roamer: {
    name: 'roamer',
    aliases: [],
  },

  pyro: {
    name: 'pyro',
    aliases: [],
  },

  demoman: {
    name: 'demoman',
    aliases: ['demo'],
  },

  heavy: {
    name: 'heavy',
    aliases: [],
  },

  engineer: {
    name: 'engineer',
    aliases: ['engi'],
  },

  medic: {
    name: 'medic',
    aliases: ['med'],
  },

  sniper: {
    name: 'sniper',
    aliases: [],
  },

  spy: {
    name: 'spy',
    aliases: [],
  },
};

export type { ClassInfo };

export default classes;
