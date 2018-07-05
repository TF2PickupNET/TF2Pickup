// @flow

import { regions } from '@tf2pickup/config';

export interface User {
  id: string,
  name: string | null,
  online: boolean,
  region: $Keys<typeof regions> | null,
  lastOnline: Date,
  hasAcceptedTheRules: boolean,
  createdOn: Date,
  lastPickup: number | null,
}
