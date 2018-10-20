// @flow

import {
  regions,
  roles,
} from '../config';

export interface User {
  id: string,
  name: string | null,
  online: boolean,
  region: $Keys<typeof regions> | null,
  lastOnline: Date,
  hasAcceptedTheRules: boolean,
  createdOn: Date,
  lastPickup: number | null,
  roles: $ReadOnlyArray<$Keys<typeof roles>>,
  hasCompletedSignUp: boolean,
}
