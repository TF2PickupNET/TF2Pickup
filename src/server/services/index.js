import users from './users';
import logs from './logs';
import authentication from './authentication';
import pickup from './pickup';
import pickupQueue from './pickup-queue';
import servers from './servers';
import slack from './slack';
import mumbleChannels from './mumble-channels';
import voiceChannel from './voice-channel';

/**
 * Setup all of the services.
 */
export default function services() {
  this
    .configure(users)
    .configure(logs)
    .configure(authentication)
    .configure(pickup)
    .configure(servers)
    .configure(pickupQueue)
    .configure(slack)
    .configure(mumbleChannels)
    .configure(voiceChannel);
}
