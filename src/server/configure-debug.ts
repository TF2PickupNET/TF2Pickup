import debug, { Data } from 'debug';
import { ServerApp } from '@feathersjs/feathers';
import stripAnsi from 'strip-ansi';
import PrettyError from 'pretty-error';
import mongoose from 'mongoose';
import Log from '@typings/Log';
import { isString } from '@utils/string';

const logs: Log[] = [];
const pe = new PrettyError();

pe.skipNodeFiles();
pe.skipPackage('bson');

interface Logger {
  <ExtraData>(message: string, timestamp: string, data: Data<ExtraData>): void,
  <ExtraData>(message: string, data: Data<ExtraData>): void,
}

// eslint-disable-next-line unicorn/no-unsafe-regex
const LINE_REGEX = /^(TF2Pickup(?::[\w-]+)+) (.+) (\+\d+ms)$/;

function parseLine(message: string, data: Data<{}> = {}): Log | null {
  const path = stripAnsi(message)
    .trim()
    .match(LINE_REGEX);

  if (!path) {
    return null;
  }

  return {
    id: new mongoose.Types.ObjectId().toHexString(),
    path: path[1],
    message: path[2].trim(),
    data,
    createdOn: Date.now(),
  };
}

function logDebug(message: string, timestamp: string, data: Data<{}> = {}) {
  const {
    error,
    ...other
  } = data;

  // eslint-disable-next-line no-console
  console.info(message, timestamp, other);

  if (error) {
    // eslint-disable-next-line no-console
    console.info(pe.render(error));
  }
}

function createLogger(callback: (log: Log) => void): Logger {
  return (message: string, timestamp: string | Data<{}>, data?: Data<{}>) => {
    logDebug(
      message,
      isString(timestamp) ? timestamp : '',
      isString(timestamp) ? data : timestamp,
    );

    const log = parseLine(
      stripAnsi(message),
      isString(timestamp) ? data : timestamp
    );

    if (log === null) {
      return;
    }

    callback(log);
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

      await Promise.all(
        logs.map(log => service.create(log)),
      );
    });
  };
}
