// @flow

import { announcers } from '../config';

export interface UserSettings {
  id: string,
  announcer: $Keys<typeof announcers>,
  theme: 'dark' | 'light',
}
