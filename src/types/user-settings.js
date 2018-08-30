// @flow

import { announcers } from '../config';

import { type UserId } from './user';

export interface UserSettings {
  id: UserId,
  announcer: $Keys<typeof announcers>,
  volume: number,
}
