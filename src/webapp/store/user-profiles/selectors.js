// @flow

import { createSelector } from 'reselect';

import { type State } from '..';

const getProfiles = (state: State) => state.userProfiles;

export function makeGetProfileById() {
  return createSelector(
    getProfiles,
    (state, userId) => userId,
    (profiles, userId) => (userId === null ? null : profiles[userId] || null),
  );
}
