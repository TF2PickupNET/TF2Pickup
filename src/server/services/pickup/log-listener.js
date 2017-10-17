import udp from 'datagram-stream';
import config from 'config';
import debug from 'debug';

// TODO: Move events.json to proper folder before merge
import events from './events.json';

const log = debug('TF2Pickup:pickup:loglistener');

const eventHandler = {
  onMapChange: (data) => {
    log(`Server map changed to ${data.map}`);
  },

  onRoundStart: () => {
    log('Round started!');
  },

  onRoundDraw: () => {
    log('Round draw!');
  },

  onRoundEnd: (data) => {
    log(`Round ended, Reason ${data.reason}!`);
  },
};

/**
 * Check log for events.
 *
 * @param {String} line - Log line.
 */
function checkEvents(line) {
  events.forEach((event) => {
    const regex = new RegExp(event.line, 'i');
    const match = line.data.match(regex);
    const data = {};

    if (match !== null) {
      if (event.arguments) {
        for (let index = 0; index < event.arguments.length; index += 1) {
          data[event.arguments[index]] = match[index + 1];
        }
      }

      log(`Log Event fired: ${event.name}`);
      eventHandler[event.handler](data);
    }
  }, this);
}

/**
 * Process log line for info.
 *
 * @param {String} raw - Raw log line.
 */
function processLine(raw) {
  const line = {};

  line.date = raw.match(/[0-3][0-9].[0-1][0-9].[2][0][0-9][0-9]/)[0];
  line.time = raw.match(/[0-2][0-9]:[0-9][0-9]:[0-9][0-9]/)[0];
  line.data = raw.split(':')[3];
  line.raw = raw;

  if (!line.date || !line.time || !line.raw) {
    throw new Error('Unknown line');
  }

  checkEvents(line);
}

/**
 * Start log listener socket.
 */
export default function logListener() {
  log('Setting up log listener');

  const connection = udp({
    address: config.get('server.ip'),
    bindingPort: config.get('server.log_listener_port'),
    reuseAddr: true,
  });

  connection.on('data', (data) => {
    processLine(data.toString('utf8'));
  });
}
