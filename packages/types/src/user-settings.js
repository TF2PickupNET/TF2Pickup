// @flow

import { announcers } from '@tf2pickup/config';

export interface UserSettings {
  id: string,
  announcer: $Keys<typeof announcers>,
  theme: 'dark' | 'light',
}
