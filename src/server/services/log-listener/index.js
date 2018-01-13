import udp from 'datagram-stream';
import config from 'config';
import debug from 'debug';

import { find } from '../../../utils/functions';

import events from './events';

const log = debug('TF2Pickup:log-listener');

function processLine(rawLine) {
  const regex = /S(.*?)L (.*?) - (.*?): (.*)/g;
  const matches = regex.exec(rawLine);

  const line = {
    secret: matches[1],
    date: matches[2],
    time: matches[3],
    data: matches[4],
    raw: rawLine,
  };

  if (!line.secret || !line.date || !line.time || !line.data) {
    throw new Error('Unknown line');
  }

  return line;
}

async function onDataHandler(app, data) {
  const line = processLine(data.toString('utf8'));
  const handler = find(event => event.line.test(line.data))(events);

  if (handler) {
    const [pickup] = await app.service('pickup').find({ query: { logSecret: line.secret } });

    if (pickup) {
      await handler.handler(app, pickup, {
        ...line,
        data: handler.line.exec(line.data),
      });
    }
  }
}

const LogListenerService = {
  setup(app) {
    const connection = udp({
      address: config.get('server.ip'),
      bindingPort: config.get('server.log_listener_port'),
      reuseAddr: true,
    });

    connection.on('data', (data) => {
      onDataHandler(app, data);
    });
  },
};

/**
 * Setup the log listener service.
 */
export default function logListener() {
  const that = this;

  log('Setting up log listener service');

  that.service('log-listener', LogListenerService);
}
