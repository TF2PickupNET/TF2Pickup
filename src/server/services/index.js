import users from './users';
import errors from './errors';
import authentication from './authentication';
import pickup from './pickup';
import pickupQueue from './pickup-queue';
import servers from './servers';
import mumbleChannels from './mumble-channels';
import discord from './discord';
import discordMessage from './discord-message';
import discordChannels from './discord-channels';
import voiceChannel from './voice-channel';
import chat from './chat';
import notifications from './notifications';

/**
 * Setup all of the services.
 */
export default function services() {
  this
    .configure(users)
    .configure(errors)
    .configure(authentication)
    .configure(pickup)
    .configure(servers)
    .configure(pickupQueue)
    .configure(mumbleChannels)
    .configure(discord)
    .configure(discordMessage)
    .configure(discordChannels)
    .configure(voiceChannel)
    .configure(chat)
    .configure(notifications);
}
