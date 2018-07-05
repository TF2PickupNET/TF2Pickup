// @flow

import classes from './classes';

type Gamemode = {|
  name: string,
  display: string,
  maxPlayers: number,
  readyUpTime: number,
  slots: { [key: $Keys<typeof classes>]: number },
  aliases: $ReadOnlyArray<string>,
  rating: boolean,
  displayDiv: boolean,
|};

const gamemodes = {
  '6v6': {
    name: '6v6',
    display: '6v6',
    maxPlayers: 12,
    readyUpTime: 45,
    slots: {
      scout: 4,
      roamer: 2,
      pocket: 2,
      demoman: 2,
      medic: 2,
    },
    aliases: [],
    rating: true,
    displayDiv: true,
  },

  '9v9': {
    name: '9v9',
    display: '9v9',
    maxPlayers: 18,
    readyUpTime: 45,
    slots: {
      scout: 2,
      soldier: 2,
      pyro: 2,
      demoman: 2,
      heavy: 2,
      engineer: 2,
      medic: 2,
      sniper: 2,
      spy: 2,
    },
    aliases: [
      'hl',
      'highlander',
    ],
    rating: true,
    displayDiv: true,
  },

  bball: {
    name: 'bball',
    display: 'BBall',
    maxPlayers: 4,
    readyUpTime: 30,
    slots: { soldier: 4 },
    aliases: ['bb'],
    rating: false,
    displayDiv: false,
  },

  ultiduo: {
    name: 'ultiduo',
    display: 'Ultiduo',
    maxPlayers: 4,
    readyUpTime: 30,
    slots: {
      soldier: 2,
      medic: 2,
    },
    aliases: ['ud'],
    rating: false,
    displayDiv: false,
  },
};

export type { Gamemode };

export default gamemodes;
