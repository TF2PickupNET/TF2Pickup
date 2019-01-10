import test from 'ava';

import maps from './maps';
import gamemodes from './gamemodes';
import regions from './regions';
import mapPool from './map-pool';

function runMapPoolTest(region: string, gamemode: string) {
  test(`Testing map pool for ${region} ${gamemode}`, (t) => {
    const pool = mapPool[`${region}-${gamemode}`];

    t.true(Array.isArray(pool));

    t.true(pool.length >= 5);

    pool.forEach((mapName) => {
      t.true(mapName in maps);
    });
  });
}

Object
  .keys(regions)
  .forEach((region) => {
    Object
      .keys(gamemodes)
      .forEach((gamemode) => {
        runMapPoolTest(region, gamemode);
      });
  });
