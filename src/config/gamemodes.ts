import { Keys } from '@utils/types';
import { isNumber } from '@utils/number';

import classes from './classes';
import configTypes from './config-types';

const SECOND = 1000;

interface Gamemode {
  name: string,
  display: string,
  badgeText: string,
  readyUpTime: number,
  slots: Partial<Record<keyof typeof classes, number>>,
  aliases: string[],
  rating: boolean,
  displayDiv: boolean,
  mapTypes: Array<keyof typeof configTypes | null>,
}

const sixvsix: Gamemode = {
  name: '6v6',
  display: '6v6',
  badgeText: '6v6',
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
  badgeText: '9v9',
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
  badgeText: 'BB',
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
  badgeText: 'UD',
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

function getMinPlayersForGamemode(gamemode: keyof typeof gamemodes) {
  const { slots } = gamemodes[gamemode];
  const classNames = Object.keys(slots) as Keys<typeof slots>;

  return classNames.reduce((accu, className) => {
    const num = slots[className];

    return isNumber(num) ? accu + num : accu;
  }, 0);
}

export {
  Gamemode, getMinPlayersForGamemode,
};

export default gamemodes;
