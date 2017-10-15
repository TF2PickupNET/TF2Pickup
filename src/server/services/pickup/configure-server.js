import Rcon from 'modern-rcon';
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
  const connection = await new Rcon(server.ip, server.port, server.password);

  try {
    await connection.connect();

    const status = await connection.send('status');

    log(`Server: ${server.ip}:${server.port} Status: ${status}`);
    await connection.disconnect();
  } catch (error) {
    log(error);
  }
}
