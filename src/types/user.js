// @flow

import { regions } from '../config';
import { type Roles } from '../config/roles';

export interface User {
  id: string,
  name: string | null,
  online: boolean,
  region: $Keys<typeof regions> | null,
  lastOnline: Date,
  hasAcceptedTheRules: boolean,
  createdOn: Date,
  lastPickup: number | null,
  roles: $ReadOnlyArray<Roles>,
}
