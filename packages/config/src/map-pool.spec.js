import test from 'ava';
import {
  flatten,
  map,
  pipe,
  pluck,
} from '@tf2-pickup/utils';
import maps from '@tf2-pickup/maps';

import gamemodes from './gamemodes';
import regions from './regions';
import mapPool from './map-pool';

const keys = pipe(
  Object.keys,
  map(region => pipe(
    Object.keys,
    map((gamemode) => {
      return {
        region,
        gamemode,
      };
    }),
  )(gamemodes)),
  flatten,
)(regions);

/**
 * Test a map pool.
 *
 * @param {Object} t - The t object from the ava test.
 * @param {String} region - The region from which the map pool is.
 * @param {String} gamemode - The gamemode which the map pool belongs to.
 * @param {String[]} pool - The map pool for the gamemode and region.
 */
function testMapPool(t, region, gamemode, pool) {
  if (!pool) {
    t.fail('Missing map pool'); // eslint-disable-line ava/assertion-arguments
  }

  if (pool.length < 5) {
    // eslint-disable-next-line ava/assertion-arguments
    t.fail('There should be atleast 5 maps in the map pool');
  }

  pool.forEach((mapName) => {
    if (!maps[mapName]) {
      t.fail(`Missing map data for ${mapName}`); // eslint-disable-line ava/assertion-arguments
    }
  });
}

keys.forEach((info) => {
  test(`Testing map pool for ${info.region} ${info.gamemode}`, (t) => {
    testMapPool(t, info.region, info.gamemode, pluck(`${info.region}.${info.gamemode}`)(mapPool));

    t.pass();
  });
});

