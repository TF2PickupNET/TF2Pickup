import udp from 'datagram-stream';
import config from 'config';
import debug from 'debug';

import { find } from '../../../utils/functions';

import events from './events';

const log = debug('TF2Pickup:log-listener');

/**
 * The log listener service.
 *
 * @class
 */
class LogListenerService {
  /**
   * Process a line from the server.
   *
   * @param {String} rawLine - The raw line as a string.
   * @returns {Object} - Returns the data for the line.
   */
  static processLine(rawLine) {
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
   * The setup method for the service.
   * This will start the UDP listener.
   *
   * @param {Object} app - The feathers app object.
   */
  setup(app) {
    this.app = app;

    const connection = udp({
      address: config.get('server.ip'),
      bindingPort: config.get('server.log_listener_port'),
      reuseAddr: true,
    });

    connection.on('data', this.onData);
  }

  /**
   * When the UDP connection receives data, check if we want to handle that lines.
   *
   * @param {Object} data - The data from the server.
   */
  onData = async (data) => {
    const line = LogListenerService.processLine(data.toString('utf8'));
    const handler = find(event => event.line.test(line.data))(events);

    if (handler) {
      const [pickup] = await this.app.service('pickup').find({ query: { logsecret: line.secret } });

      if (pickup) {
        await handler.handler(this.app, pickup, {
          ...line,
          data: handler.line.exec(line.data),
        });
      }
    }
  };
}

/**
 * Setup the log listener service.
 */
export default function logListener() {
  const that = this;

  log('Setting up log listener service');

  that.service('log-listener', new LogListenerService());
}
