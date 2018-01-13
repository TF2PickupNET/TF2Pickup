import udp from 'datagram-stream';
import config from 'config';
import debug from 'debug';

import { find } from '../../../utils/functions';

import events from './events';

const log = debug('TF2Pickup:log-listener');

/**
 * Process the raw line and extract things like date, secret etc.
 *
 * @param {String} rawLine - The raw line as a string.
 * @returns {Object} - Returns the data.
 */
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
    return null;
  }

  return line;
}

/**
 * Find the first appropiate handler for the line.
 *
 * @param {Object} app - The feathers app object.
 * @param {Object} data - The line data.
 */
async function onDataHandler(app, data) {
  const line = processLine(data.toString('utf8'));

  if (!line) {
    return;
  }

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

/**
 * Setup the log listener service.
 */
export default function logListener() {
  const that = this;

  log('Setting up log listener service');

  that.service('log-listener', {
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
  });
}
