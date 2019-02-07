import classes from './classes';
import configTypes from './config-types';

const SECOND = 1000;

interface Gamemode {
  name: string,
  display: string,
  readyUpTime: number,
  slots: { [key in keyof typeof classes]?: number },
  aliases: string[],
  rating: boolean,
  displayDiv: boolean,
  mapTypes: Array<keyof typeof configTypes | null>,
}

const sixvsix: Gamemode = {
  name: '6v6',
  display: '6v6',
  readyUpTime: 45 * SECOND,
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
  mapTypes: ['koth', '5cp'],
};

const hl: Gamemode = {
  name: '9v9',
  display: '9v9',
  readyUpTime: 45 * SECOND,
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
  mapTypes: ['koth', 'stopwatch'],
};

const bball: Gamemode = {
  name: 'bball',
  display: 'BBall',
  readyUpTime: 30 * SECOND,
  slots: { soldier: 4 },
  aliases: ['bb'],
  rating: false,
  displayDiv: false,
  mapTypes: [null],
};

const ultiduo: Gamemode = {
  name: 'ultiduo',
  display: 'Ultiduo',
  readyUpTime: 30 * SECOND,
  slots: {
    soldier: 2,
    medic: 2,
  },
  aliases: ['ud'],
  rating: false,
  displayDiv: false,
  mapTypes: [null],
};

const gamemodes = {
  '6v6': sixvsix,
  '9v9': hl,
  bball,
  ultiduo,
};

export { Gamemode };

export default gamemodes;
