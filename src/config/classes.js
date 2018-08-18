// @flow

type ClassInfo = {|
  name: string,
  aliases: $ReadOnlyArray<string>,
|};

type Classes = 'scout'
  | 'soldier'
  | 'pyro'
  | 'pocket'
  | 'roamer'
  | 'demoman'
  | 'heavy'
  | 'engineer'
  | 'medic'
  | 'sniper'
  | 'spy';

const classes: { [key: Classes]: ClassInfo } = {
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

export type {
  ClassInfo,
  Classes,
};

export default classes;
