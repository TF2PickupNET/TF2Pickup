// @flow

import test from 'ava';

import maps from './maps';
import gamemodes from './gamemodes';
import regions from './regions';
import mapPool from './map-pool';

Object
  .keys(regions)
  .forEach((region) => {
    Object
      .keys(gamemodes)
      .forEach((gamemode) => {
        test(`Testing map pool for ${region} ${gamemode}`, (t) => {
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

          t.pass();
        });
      });
  });
