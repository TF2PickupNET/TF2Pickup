// @flow

import { createSelector } from 'reselect';

import { type State } from '..';

import { type Warning } from '../../../types/Warning';

type GetWarningIdsForUser = (state: State, userId: string | null) => $ReadOnlyArray<string>;

const getWarnings = (state: State) => state.warnings;

function makeGetWarningById(): (state: State, id: string) => Warning | null {
  return createSelector(
    getWarnings,
    (state, id) => id,
    (warnings, id) => warnings[id] || null,
  );
}

function makeGetWarningIdsForUser(): GetWarningIdsForUser {
  return createSelector(
    getWarnings,
    (state, id) => id,
    (warnings, userId) => Object
      .keys(warnings)
      .filter(id => warnings[id].for === userId)
  );
}

function makeGetUnreadWarningIdsForUser(): GetWarningIdsForUser {
  return createSelector(
    getWarnings,
    (state, id) => id,
    (warnings, userId) => Object
      .keys(warnings)
      .filter(id => warnings[id].for === userId)
  );
}

export {
  makeGetWarningById,
  makeGetWarningIdsForUser,
  makeGetUnreadWarningIdsForUser,
};
