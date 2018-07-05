// @flow

import test from 'ava';
import maps from '@tf2pickup/maps';

import gamemodes from './gamemodes';
import regions from './regions';
import mapPool from './map-pool';

function testMapPool(t, region: $Keys<typeof regions>, gamemode: $Keys<typeof gamemodes>) {
  const pool = mapPool[`${region}-${gamemode}`];

  if (!pool) {
    t.fail('Missing map pool');
  }

  if (pool.length < 5) {
    t.fail('There should be atleast 5 maps in the map pool');
  }

  pool.forEach((mapName) => {
    if (!maps[mapName]) {
      t.fail(`Missing map data for ${mapName}`);
    }
  });
}

Object
  .keys(regions)
  .forEach((region) => {
    Object
      .keys(gamemodes)
      .forEach((gamemode) => {
        test(`Testing map pool for ${region} ${gamemode}`, testMapPool, region, gamemode);
      });
  });
