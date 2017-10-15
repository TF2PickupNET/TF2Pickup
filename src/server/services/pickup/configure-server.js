import Rcon from 'modern-rcon';
import debug from 'debug';
import config from 'config';
import fs from 'fs';
import sleep from 'await-sleep';

const log = debug('TF2Pickup:server');

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
function executeConfig(connection, cfg) {
  const nodePath = process.env.NODE_PATH;
  const configPath = `${nodePath}/../node_modules/@tf2-pickup/tf2-configs/dist/${cfg}.cfg`;
  const configFile = fs.readFileSync(configPath, 'utf8');
  const configLines = configFile.split('\n');

  configLines.forEach(async (line) => {
    log(line);
    await sleep(250);
    await connection.send(line);
  }, this);
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
 * @param {String} region - Region of the game.
 * @param {String} format - Region of the game.
 * @param {String} map - Map of the game.
 */
async function setup(connection, region, format, map) {
  const cfg = getCfgName(region, format, map);

  await sleep(1 * 1000);
  await executeConfig(connection, cfg);
  await sleep(3 * 1000);
  await changeMap(connection, map);
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
    const connection = await new Rcon(server.ip, server.port, server.password);

    await connection.connect();
    await setup(connection, 'eu', '6v6', 'cp_badlands');

    log(`Server setup for ${server.ip}:${server.port} is done`);
  } catch (error) {
    log(error);
  }
}
