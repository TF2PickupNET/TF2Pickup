import flatten from 'lodash.flatten';
import get from 'lodash.get';

import {
  gamemodes,
  regions,
} from '@tf2-pickup/configs';

import mapInfo from '../../../config/maps';

const ultiduoMaps = [];
const bballMaps = [];

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

  au: {
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

export function validateMapPool() {
  const gamemodeKeys = Object.keys(gamemodes);
  const keys = flatten(
    Object
      .keys(regions)
      .map(region => gamemodeKeys.map(gamemode => `${region}.${gamemode}`)),
  );

  keys.forEach((key) => {
    const mapPoolForGamemode = get(mapPool, key, null);

    if (!mapPoolForGamemode) {
      throw new Error(`Missing map fool for ${key}`);
    }

    if (mapPoolForGamemode.length < 5) {
      throw new Error('There should be atleast 5 maps in the map pool');
    }

    mapPoolForGamemode.forEach((map) => {
      if (!mapInfo[map]) {
        throw new Error(`Missing map info for ${map}`);
      }
    });
  });
}

export default mapPool;
