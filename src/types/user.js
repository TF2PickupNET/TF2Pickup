// @flow

import {
  regions,
  roles,
} from '../config';

type UserId = string;

interface User {
  id: UserId,
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

export type {
  UserId,
  User,
};
