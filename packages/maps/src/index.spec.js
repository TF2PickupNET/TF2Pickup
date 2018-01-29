import test from 'ava';
import fs from 'fs';
import path from 'path';
import { undef } from '@tf2-pickup/utils';

import maps from './';

Object
  .keys(maps)
  .forEach((map) => {
    test(`Test ${map}`, (t) => {
      fs.statSync(path.resolve(__dirname, `../images/${map}.jpg`));

      if (!maps[map].display) {
        // eslint-disable-next-line ava/assertion-arguments
        t.fail(`Missing display for ${map}`);
      }

      if (![null, 'koth', 'stopwatch', '5cp'].includes(maps[map].configType)) {
        // eslint-disable-next-line ava/assertion-arguments
        t.fail(`Missing config type for ${map}`);
      }

      if (undef(maps[map].isStockMap)) {
        // eslint-disable-next-line ava/assertion-arguments
        t.fail(`Missing isStockMap data for ${map}`);
      }

      t.pass();
    });
  });
