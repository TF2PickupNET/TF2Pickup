import Rcon from 'modern-rcon';
import debug from 'debug';
import fs from 'fs';
import sleep from 'sleep-promise';
import config from 'config';
import { colors } from 'materialize-react';

import { regions } from '@tf2-pickup/configs';

const log = debug('TF2Pickup:pickup:configure-server');

const COMMAND_WAIT = 250;

/**
 * Change server map.
 *
 * @param {Object} connection - RCON connection object to server.
 * @param {Object} map - Map name.
 */
async function changeMap(connection, map) {
  const maplist = await connection.send('maps *');

  if (maplist.indexOf(map) === -1) {
    throw new Error(`Server does not have map ${map}`);
  } else {
    log(`Changing server map to ${map}`);
    await sleep(3 * 1000);
    await connection.send(`changelevel ${map}`);
  }
}

/**
 * Change server config.
 *
 * @param {Object} connection - RCON connection object to server.
 * @param {String} cfg - CFG file to execute.
 */
async function executeConfig(connection, cfg) {
  const rootPath = process.cwd();
  const configPath = `${rootPath}/node_modules/@tf2-pickup/tf2-configs/dist/${cfg}.cfg`;
  const configFile = fs.readFileSync(configPath, 'utf8');
  const configLines = configFile.split('\n');

  // eslint-disable-next-line no-restricted-syntax
  for (let index = 0; index < configLines.length; index += 1) {
    // TODO: Remove log line before merge
    log(configLines[index]);
    await sleep(COMMAND_WAIT); // eslint-disable-line no-await-in-loop
    await connection.send(configLines[index]); // eslint-disable-line no-await-in-loop
  }
}

/**
 * Execute commands in the server.
 *
 * @param {Object} connection - RCON connection object to server.
 * @param {Object} server - The server object.
 * @param {Object} pickup - The pickup object.
 */
async function executeCommands(connection, server, pickup) {
  const listenerAddr = `${config.get('server.ip')}:${config.get('server.log_listener_port')}`;
  const regionFullname = regions[pickup.region].fullName;

  await connection.send(`sv_password ${server.password}`);
  await sleep(COMMAND_WAIT);
  await connection.send('kickall');
  await sleep(COMMAND_WAIT);
  await connection.send(`logaddress_add ${listenerAddr}`);
  await sleep(COMMAND_WAIT);
  await connection.send(`tftrue_logs_apikey ${config.get('service.logstf.apikey')}`);
  await sleep(COMMAND_WAIT);
  await connection.send(`tftrue_logs_prefix TF2Pickup ${regionFullname} #${pickup.id}`);
  await sleep(COMMAND_WAIT);
  await connection.send(`sv_logsecret ${pickup.logSecret}`);
}

/**
 * Generates CFG name.
 *
 * @param {String} region - Region of the game.
 * @param {String} format - Region of the game.
 * @param {String} map - Map of the game.
 * @returns {String} - Returns the CFG name.
 */
function getCfgName(region, format, map) {
  const service = 'tf2pickup';

  if (format === 'ultiduo' || format === 'bball') {
    return `${service}_${region}_${format}`;
  }

  if (map.indexOf('cp_') === 0) {
    return `${service}_${region}_${format}_5cp`;
  } else if (map.indexOf('koth_') === 0) {
    return `${service}_${region}_${format}_koth`;
  } else if (map.indexOf('pl_') === 0) {
    return `${service}_${region}_${format}_stopwatch`;
  }

  throw new Error('Unknown map type!');
}

/**
 * Setup the server.
 *
 * @param {Object} connection - RCON connection object to server.
 * @param {Object} server - The server info object.
 * @param {Object} pickup - The pickup info object.
 */
async function setup(connection, server, pickup) {
  const cfg = getCfgName(pickup.region, pickup.format, pickup.map);

  await executeCommands(connection, server, pickup);
  await sleep(COMMAND_WAIT);
  await changeMap(connection, pickup.map);
  await sleep(30 * 1000);
  await executeConfig(connection, cfg);
}

/**
 * Start the server.
 *
 * @param {Object} props - Props from app.
 * @param {Boolean} [isSecondTry] - Whether or not this is the second try executing the config.
 */
export default async function configureServer(props, isSecondTry = false) {
  const pickup = props.result;
  const server = await props.app.service('servers').get(pickup.serverId);
  const pickupService = props.app.service('pickup');

  try {
    // Wait 90 seconds for serveme servers to start
    await sleep(90 * 1000);

    const connection = await new Rcon(server.ip, server.port, server.rconPassword);

    await connection.connect();
    await setup(connection, server, pickup);

    log('Server setup for pickup is done', pickup.pickupId);

    await pickupService.patch(pickup.id, { $set: { status: 'waiting-for-game-to-start' } });
  } catch (error) {
    if (isSecondTry) {
      // TODO: Retry the setup and else wise close the pickup
      await props.app.service('slack').create({
        attachments: [{
          fallback: 'Error while configuring server!',
          pretext: 'Error while configuring server!',
          color: colors.red500,
          fields: [{
            title: 'Error:',
            value: error.message,
            short: false,
          }],
        }],
      });

      await pickupService.patch(pickup.id, { $set: { status: 'server-configuration-error' } });

      log('Error while configuring server for pickup', pickup.id, error);
    } else {
      configureServer(props, true);
    }
  }
}
