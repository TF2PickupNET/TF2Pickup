import fs from 'fs';
import config from 'config';
import maps from '@tf2-pickup/maps';
import { regions } from '@tf2-pickup/config';

import Rcon from '../rcon';

/**
 * Change server config.
 *
 * @param {Object} connection - RCON connection object to server.
 * @param {String} cfg - CFG file to execute.
 */
async function executeConfig(connection, cfg) {
  const configPath = `${process.cwd()}/node_modules/@tf2-pickup/tf2configs/dist/${cfg}.cfg`;
  const configFile = fs.readFileSync(configPath, 'utf8');
  const configLines = configFile
    .split('\n')
    .filter(line => line !== '');

  for (const index in configLines) { // eslint-disable-line guard-for-in, no-restricted-syntax
    await connection.send(configLines[index]); // eslint-disable-line no-await-in-loop
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
  const mapInfo = maps[map];

  if (mapInfo.configType === null) {
    return `tf2pickup_${region}_${format}`;
  }

  return `tf2pickup_${region}_${format}_${mapInfo.configType}`;
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
  const listenerAddr = `${config.get('server.ip')}:${config.get('server.log_listener_port')}`;
  const regionFullname = regions[pickup.region].fullName;

  await connection.send(`changelevel ${pickup.map}`);
  await connection.send(`sv_password ${server.password}`);
  await connection.send('kickall');
  await connection.send(`changelevel ${pickup.map}`);

  await executeConfig(connection, cfg);

  await connection.send(`logaddress_add ${listenerAddr}`);
  await connection.send(`tftrue_logs_prefix TF2Pickup ${regionFullname} #${pickup.id}`);
  await connection.send(`sv_logsecret ${pickup.logSecret}`);
  await connection.send(`tftrue_logs_apikey ${config.get('service.logstf.apikey')}`);
}

/**
 * Configure the server.
 *
 * @param {Object} app - The feathers app object.
 * @param {Object} server - The servers object.
 * @param {Object} pickup - The pickups object.
 */
export default async function configureServer(app, server, pickup) {
  const connection = new Rcon(server.ip, server.port, server.rconPassword);

  await connection.connect();
  await setup(connection, server, pickup);
  await connection.disconnect();
}
