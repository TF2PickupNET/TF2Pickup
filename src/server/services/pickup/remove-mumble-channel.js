import mumble from 'mumble';
import config from 'config';

/**
 * Remaov a channel in mumble.
 *
 * @param {Object} props - Props from app.
 */
export default function removeMumbleChannel(props) {
  const pickup = props.result;
  const channelName = pickup.mumbleChannel;

  mumble.connect(config.get(`server.mumble.${pickup.region}`), { }, (error, conn) => {
    if (error) {
      throw new Error(error);
    }

    conn.authenticate(config.get('server.mumble.username'), config.get('server.mumble.password'));
    conn.on('initialized', () => {
      const channel = conn.channelByName(channelName);

      if (!channel) {
        throw new Error('Unable to find mumble channel for pickup', pickup.id);
      }

      channel.remove(channelName);
    });
  });
}
