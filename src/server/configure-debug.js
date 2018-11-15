// @flow

import debug, { type Data } from 'debug';
import { type App } from '@feathersjs/express';
import stripAnsi from 'strip-ansi';
import PrettyError from 'pretty-error';

const logs = [];
const pe = new PrettyError();

pe.skipNodeFiles();

// eslint-disable-next-line unicorn/no-unsafe-regex
const LINE_REGEX = /^(TF2Pickup(?::[\w-]+)+) (.+)$/;

function parseLine(message: string, data: Data<{}>) {
  const path = message.trim().match(LINE_REGEX);

  if (!path) {
    return null;
  }

  return {
    path: path[1],
    message: path[2].trim(),
    data,
  };
}

function getNormalizedArgs(...args) {
  if (typeof args[1] === 'string') {
    return [
      `${args[0]} ${args[1]}`,
      args[2],
    ];
  }

  return args;
}

function logDebug(message, data = {}) {
  const {
    error,
    ...other
  } = data;

  // eslint-disable-next-line no-console
  console.log(message, other);

  if (error) {
    // eslint-disable-next-line no-console
    console.log(pe.render(error));
  }
}

// We need this to catch the logs which were emitted before the server was ready
debug.log = (...args) => {
  const [
    message,
    data,
  ] = getNormalizedArgs(...args);

  logDebug(message, data);

  // eslint-disable-next-line fp/no-mutating-methods
  logs.push({
    ...parseLine(stripAnsi(message), data),
    createdOn: new Date(),
  });
};

export default function configureDebug(app: App) {
  app.on('listening', async () => {
    debug.log = (...args) => {
      const [
        message,
        data,
      ] = getNormalizedArgs(...args);

      logDebug(message, data);

      app.service('logs').create({
        ...parseLine(stripAnsi(message), data),
        createdOn: new Date(),
      });
    };

    await Promise.all(logs.map(log => app.service('logs').create(log)));
  });
}
