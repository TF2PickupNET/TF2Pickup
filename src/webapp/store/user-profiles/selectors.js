// @flow

import { createSelector } from 'reselect';

import { getCurrentUser } from '../user-id/selectors';

import { type State } from '..';

const getProfiles = (state: State) => state.userProfiles;

export function makeGetProfileById() {
  return createSelector(
    getProfiles,
    (state, userId) => userId,
    (profiles, userId) => (userId === null ? null : profiles[userId] || null),
  );
}

export function makeGetSteamFriends() {
  return createSelector(
    makeGetProfileById(),
    profile => (profile === null ? [] : profile.steam.friends),
  );
}

export function makeIsFriend() {
  return createSelector(
    makeGetSteamFriends(),
    getCurrentUser,
    (friends, userId) => friends.includes(userId),
  );
}
