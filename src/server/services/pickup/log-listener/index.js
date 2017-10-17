import udp from 'datagram-stream';
import config from 'config';
import debug from 'debug';

import events from './events';

const log = debug('TF2Pickup:pickup:log-listener');

/**
 * Process log line for info.
 *
 * @param {String} rawLine - Raw log line.
 * @returns {String} - Processed log line.
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
    throw new Error('Unknown line');
  }

  return line;
}

/**
 * Start log listener socket.
 *
 * @param {Object} app - The app object.
 */
export default function logListener(app) {
  log('Setting up log listener');

  const connection = udp({
    address: config.get('server.ip'),
    bindingPort: config.get('server.log_listener_port'),
    reuseAddr: true,
  });

  connection.on('data', (data) => {
    const line = processLine(data.toString('utf8'));

    Object
      .values(events)
      .forEach((event) => {
        const match = event.line.exec(line.data);

        line.data = match;

        if (match) {
          event.handler(app, line);
        }
      });
  });
}
