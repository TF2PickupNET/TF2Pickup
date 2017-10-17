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
  const line = {
    date: rawLine.match(/[0-3][0-9].[0-1][0-9].[2][0][0-9][0-9]/)[0],
    time: rawLine.match(/[0-2][0-9]:[0-9][0-9]:[0-9][0-9]/)[0],
    data: rawLine.split(':')[3],
    raw: rawLine,
  };

  if (!line.date || !line.time || !line.raw) {
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
        const match = line.data.match(event.line);

        if (match) {
          event.handler(app, line, match);
        }
      });
  });
}
