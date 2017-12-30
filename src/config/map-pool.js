import pickRandom from 'pick-random';
import {
  gamemodes,
  regions,
} from '@tf2-pickup/configs';

import {
  pipe,
  map,
  flatten,
  pluck,
  filter,
} from '../utils/functions';

import mapInfo from './maps';

const ultiduoMaps = [
  'koth_ultiduo_r_b7',
  'ultiduo_badlands_b1',
  'ultiduo_baloo',
  'ultiduo_gullywash_b2',
  'ultiduo_nicecicles',
  'ultiduo_seclusion_b3',
];
const bballMaps = [
  'ctf_ballin_sky',
  'ctf_bball_alpine_b4',
  'ctf_bball_comptf',
  'ctf_bball_snow_b1',
  'ctf_pro_bball',
];

const mapPool = {
  eu: {
    '6v6': [
      'koth_product_rc8',
      'cp_process_final',
      'cp_prolands_b2c',
      'cp_gullywash_final1',
      'cp_snakewater_final1',
      'cp_sunshine',
      'cp_reckoner_rc2',
    ],

    '9v9': [
      'pl_upward',
      'pl_borneo',
      'cp_steel',
      'cp_gullywash_final1',
      'koth_product_rc8',
      'pl_badwater',
    ],

    bball: bballMaps,
    ultiduo: ultiduoMaps,
  },

  na: {
    '6v6': [
      'koth_product_rc8',
      'cp_process_final',
      'cp_prolands_b2c',
      'cp_gullywash_final1',
      'cp_snakewater_final1',
      'cp_sunshine',
      'cp_reckoner_rc2',
    ],

    '9v9': [
      'pl_upward',
      'pl_borneo',
      'cp_steel',
      'cp_gullywash_final1',
      'koth_product_rc8',
      'pl_badwater',
    ],

    bball: bballMaps,
    ultiduo: ultiduoMaps,
  },

  oc: {
    '6v6': [
      'koth_product_rc8',
      'cp_process_final',
      'cp_prolands_b2c',
      'cp_gullywash_final1',
      'cp_snakewater_final1',
      'cp_sunshine',
      'cp_reckoner_rc2',
    ],

    '9v9': [
      'pl_upward',
      'pl_borneo',
      'cp_steel',
      'cp_gullywash_final1',
      'koth_product_rc8',
      'pl_badwater',
    ],

    bball: bballMaps,
    ultiduo: ultiduoMaps,
  },
};

/**
 * Validate that each map has a config object and that enough maps are in the map pool.
 */
export function validateMapPool() {
  const keys = pipe(
    Object.keys,
    map(region => pipe(
      Object.keys,
      map(gamemode => `${region}.${gamemode}`),
    )(gamemodes)),
    flatten,
  )(regions);

  keys.forEach((key) => {
    const mapPoolForGamemode = pluck(key)(mapPool);

    if (!mapPoolForGamemode) {
      throw new Error(`Missing map fool for ${key}`);
    }

    if (mapPoolForGamemode.length < 5) {
      throw new Error(`There should be atleast 5 maps in the map pool ${key}`);
    }

    mapPoolForGamemode.forEach((mapName) => {
      if (!mapInfo[mapName]) {
        throw new Error(`Missing map info for ${mapName}`);
      }
    });
  });
}

/**
 * Pick three new random maps from the map pool.
 *
 * @param {String} region - The region of the pickup queue.
 * @param {String} gamemode - The gamemode of the pickup queue.
 * @param {String[]} [excludedMaps] - A set of maps to exclude from the pool.
 * This is needed for not having the same map in the map selection after it got selected.
 * @returns {String[]} - Returns the three random picked maps.
 */
export function generateRandomMaps(region, gamemode, excludedMaps = []) {
  const maps = mapPool[region][gamemode];
  const filterMaps = filter(mapName => !excludedMaps.includes(mapName));

  return pickRandom(filterMaps(maps), { count: 3 });
}
