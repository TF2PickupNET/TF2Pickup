import debug, { Data } from 'debug';
import { ServerApp } from '@feathersjs/feathers';
import stripAnsi from 'strip-ansi';
import PrettyError from 'pretty-error';
import mongoose from 'mongoose';

import Log from '@typings/Log';

const logs: Log[] = [];
const pe = new PrettyError();

pe.skipNodeFiles();
pe.skipPackage('bson');

// eslint-disable-next-line unicorn/no-unsafe-regex
const LINE_REGEX = /^(TF2Pickup(?::[\w-]+)+) (.+) (\+\d+ms)$/;

function parseLine(message: string, data: Data<{}>): Log | null {
  const path = stripAnsi(message)
    .trim()
    .match(LINE_REGEX);

  if (!path) {
    return null;
  }

  return {
    id: mongoose.Types.ObjectId().toHexString(),
    path: path[1],
    message: path[2].trim(),
    data,
    createdOn: Date.now(),
  };
}

function logDebug(message: string, data: Data<{}> = {}) {
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

function createLogger(callback: (log: Log) => void) {
  return (...args: any[]) => {
    let message = args[0];
    let data = args[1];

    if (typeof args[1] === 'string') {
      message = `${args[0]} ${args[1]}`;
      data = args[2];
    }

    logDebug(message, data);

    const log = parseLine(stripAnsi(message), data);

    if (log !== null) {
      return callback(log);
    }

    return null;
  };
}

// We need this to catch the logs which were emitted before the server was ready
debug.log = createLogger((log) => {
  logs.push(log);
});

export default function configureDebug() {
  return (app: ServerApp) => {
    app.on('listening', async () => {
      debug.log = createLogger((log) => {
        app.service('logs').create(log);
      });

      const service = app.service('logs');

      await Promise.all(logs.map(log => service.create(log)));
    });
  };
}
