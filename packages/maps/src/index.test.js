// @flow

import test from 'ava';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

import maps from '.';

const exists = promisify(fs.access);

Object
  .keys(maps)
  .forEach((map) => {
    test(
      `Test ${map}`,
      () => exists(path.resolve(__dirname, `../images/${map}.jpg`)),
    );
  });
