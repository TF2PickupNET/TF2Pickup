import Rcon from 'modern-rcon';
import debug from 'debug';
import fs from 'fs';
import sleep from 'sleep-promise';
import config from 'config';

import { regions } from '@tf2-pickup/configs';

const log = debug('TF2Pickup:pickup:configure-server');

const commandWait = config.get('pickup.server.setup.commandWait');

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
    // TODO: Remve log line before merge
    log(configLines[index]);
    await sleep(commandWait); // eslint-disable-line no-await-in-loop
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
  const listenerAddr = config.get('pickup.server.setup.logListenerAddr');
  const regionFullname = regions[pickup.region].fullName;

  await connection.send(`sv_password ${server.password}`);
  await sleep(commandWait);
  await connection.send('kickall');
  await sleep(commandWait);
  await connection.send(`logaddress_add ${listenerAddr}`);
  await sleep(commandWait);
  await connection.send(`tftrue_logs_apikey ${config.get('service.logstf.apikey')}`);
  await sleep(commandWait);
  await connection.send(`tftrue_logs_prefix TF2Pickup ${regionFullname} #${pickup.id}`);
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
  await sleep(commandWait);
  await changeMap(connection, pickup.map);
  await sleep(config.get('pickup.server.setup.mapChangeWait'));
  await executeConfig(connection, cfg);
}

/**
 * Start the server.
 *
 * @param {Object} props - Props from app.
 */
export default async function configureServer(props) {
  const pickup = props.result;
  const server = await props.app.service('servers').get(pickup.serverId);

  try {
    const connection = await new Rcon(server.ip, server.port, server.rconPassword);

    await connection.connect();
    await setup(connection, server, pickup);

    log(`Setup for ${server.ip}:${server.port} is done`);
  } catch (error) {
    log(error);
  }
}
