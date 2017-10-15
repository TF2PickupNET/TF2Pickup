import rcon from 'srcds-rcon';
import debug from 'debug';

const log = debug('TF2Pickup:server');

/**
 * Start the server.
 *
 * @param {Object} props - Props from app.
 */
export default async function configureServer(props) {
  const pickup = props.result;
  const server = await props.app.service('servers').get(pickup.serverId);
  const connection = rcon({
    address: `${server.ip}:${server.port}`,
    password: `${server.password}`,
  });

  await connection.connect();

  const status = await connection.command('status');

  log(`Server: ${server.ip}:${server.port} Status: ${status}`);
}
