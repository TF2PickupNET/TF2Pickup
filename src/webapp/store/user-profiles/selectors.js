// @flow

import { createSelector } from 'reselect';

import { type State } from '..';

const getProfiles = (state: State) => state.userProfiles;

export function makeGetProfileById() {
  return createSelector(
    getProfiles,
    (profiles, userId) => profiles[userId],
  );
}
