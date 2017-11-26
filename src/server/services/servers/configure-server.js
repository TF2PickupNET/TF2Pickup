import fs from 'fs';
import config from 'config';
import { regions } from '@tf2-pickup/configs';

import maps from '../../../config/maps/index';
import Rcon from '../rcon';

/**
 * Change server config.
 *
 * @param {Object} connection - RCON connection object to server.
 * @param {String} cfg - CFG file to execute.
 */
async function executeConfig(connection, cfg) {
  const configPath = `${process.cwd()}/node_modules/@tf2-pickup/tf2-configs/dist/${cfg}.cfg`;
  const configFile = fs.readFileSync(configPath, 'utf8');
  const configLines = configFile
    .split('\n')
    .filter(line => line !== '');

  for (const index in configLines) {
    await connection.send(configLines[index]);
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

  await connection.send(`changelevel ${pickup.map}`);

  await connection.send(`sv_password ${server.password}`);
  await connection.send('kickall');
  await connection.send(`logaddress_add ${listenerAddr}`);
  await connection.send(`tftrue_logs_prefix TF2Pickup ${regionFullname} #${pickup.id}`);
  await connection.send(`sv_logsecret ${pickup.logSecret}`);

  if (config.has('service.logstf.apikey')) {
    await connection.send(`tftrue_logs_apikey ${config.get('service.logstf.apikey')}`);
  }
}

/**
 * Generates CFG name.
 *
 * @param {String} region - Region of the game.
 * @param {String} format - Format of the game.
 * @param {String} map - Map of the game.
 * @returns {String} - Returns the CFG name.
 */
function getCfgName(region, format, map) {
  const prefix = 'tf2pickup';
  const mapInfo = maps[map];

  if (mapInfo.configType === null) {
    return `${prefix}_${region}_${format}`;
  }

  return `${prefix}_${region}_${format}_${mapInfo.configType}`;
}

/**
 * Setup the server.
 *
 * @param {Object} connection - RCON connection object to server.
 * @param {Object} server - The server info object.
 * @param {Object} pickup - The pickup info object.
 */
async function setup(connection, server, pickup) {
  const cfg = getCfgName(pickup.region, pickup.gamemode, pickup.map);

  await executeCommands(connection, server, pickup);
  await executeConfig(connection, cfg);
}

/**
 * Start the server.
 *
 * @param {Object} props - Props from app.
 * @param {Boolean} [isSecondTry] - Whether or not this is the second try executing the config.
 */
export default async function configureServer(app, serverId) {
  const server = await app.service('servers').get(serverId);
  const pickupService = app.service('pickup');
  const pickup = await pickupService.find({
    query: {
      $limit: 1,
      serverId: server.id,
    },
  });
  const connection = new Rcon(server.ip, server.port, server.rconPassword);

  await connection.connect();
  await setup(connection, server, pickup[0]);
  await connection.disconnect();
}
