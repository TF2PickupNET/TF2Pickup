// @flow

import {
  announcers,
  emojiSets,
} from '../config';

export interface UserSettings {
  id: string,
  announcer: $Keys<typeof announcers>,
  volume: number,
  emojiSet: $Keys<typeof emojiSets>,
}
