import regions from '@config/regions';
import roles from '@config/roles';
import emojiSets from '@config/emoji-sets';
import announcers from '@config/announcers';
import classes from '@config/classes';
import gamemodes from '@config/gamemodes';
import maps from '@config/maps';

interface Events {
  'users:complete-sign-up': null,
  'users:change-region': { region: keyof typeof regions },
  'users:accept-rules': null,
  'users:set-name': { name: string },
  'users:add-role': {
    role: keyof typeof roles,
    userId: string,
  },
  'users:remove-role': {
    role: keyof typeof roles,
    userId: string,
  },

  'user-settings:change-volume': { volume: number },
  'user-settings:change-emoji-set': { emojiSet: keyof typeof emojiSets },
  'user-settings:change-announcer': { announcer: keyof typeof announcers },

  'pickup-queues:join': {
    gamemode: keyof typeof gamemodes,
    class: keyof typeof classes,
  },
  'pickup-queues:leave': { gamemode: keyof typeof gamemodes },
  'pickup-queues:ready-up': { gamemode: keyof typeof gamemodes },
  'pickup-queues:select-map': {
    gamemode: keyof typeof gamemodes,
    map: keyof typeof maps,
  },
}

export { Events };
