import mumble from 'mumble';
import config from 'config';
import debug from 'debug';

const log = debug('TF2Pickup:pickup:configure-server');

/**
 * Create a lobby in mumble.
 *
 * @param {Object} props - Props from app.
 */
export default function createLobby(props) {
  log('Creating mumble lobby');

  const pickup = props.result;
  // const pickupService = props.service('pickup');

  mumble.connect(config.get(`server.mumble.${pickup.region}`), { }, (error, conn) => {
    if (error) {
      throw new Error(error);
    }

    log('Connected');

    conn.authenticate(config.get('server.mumble.username'));
    conn.on('initialized', () => {
      log('Mumble connected');
    });
  });
}
