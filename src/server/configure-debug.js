// @flow

import debug from 'debug';
import { type App } from '@feathersjs/express';
import stripAnsi from 'strip-ansi';

import { isString } from '../utils';

const logs = [];

// eslint-disable-next-line unicorn/no-unsafe-regex
const LINE_REGEX = /^(TF2Pickup(?::[\w-]+)+) (.+)$/;

function parseLine(line, data) {
  const path = line.trim().match(LINE_REGEX);

  if (!path) {
    return null;
  }

  return {
    path: path[1],
    message: path[2].trim(),
    data,
  };
}

function normalize(...args) {
  return args.map((arg) => {
    if (isString(arg)) {
      return stripAnsi(arg);
    }

    return arg;
  });
}

// We need this to catch the logs which were emitted before the server was ready
debug.log = (...args) => {
  // eslint-disable-next-line no-console
  console.info(...args);

  // eslint-disable-next-line fp/no-mutating-methods
  logs.push({
    ...parseLine(...normalize(...args)),
    createdOn: new Date(),
  });
};

export default function configureDebug(app: App) {
  app.on('listening', async () => {
    debug.log = (...args) => {
      // eslint-disable-next-line no-console
      console.info(...args);

      app.service('logs').create({
        ...parseLine(...normalize(...args)),
        createdOn: new Date(),
      });
    };

    await Promise.all(logs.map(log => app.service('logs').create(log)));
  });
}
