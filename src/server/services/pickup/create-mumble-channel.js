import mumble from 'mumble';
import config from 'config';

/**
 * Create a channel in mumble.
 *
 * @param {Object} props - Props from app.
 */
export default function createMumbleChannel(props) {
  const pickup = props.result;
  const pickupService = props.app.service('pickup');
  const channelName = `${pickup.id}`;

  mumble.connect(config.get(`server.mumble.${pickup.region}`), { }, (error, conn) => {
    if (error) {
      throw new Error(error);
    }

    conn.authenticate(config.get('server.mumble.username'), config.get('server.mumble.password'));
    conn.on('initialized', () => {
      const channel = conn.channelByName('Pickups');

      if (!channel) {
        throw new Error('Default channel "Lobbies" does not exist');
      }

      channel.addSubChannel(channelName);

      pickupService.get(pickup.id).patch({ mumbleChannel: channelName });
    });
  });
}
