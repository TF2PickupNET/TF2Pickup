// @flow

import { createSelector } from 'reselect';

import { getCurrentUserId } from '../user-id/selectors';
import { type UserProfile } from '../../../types/UserProfile';

import { type State } from '..';

import regions from '../../../config/regions';

import getLinkForService, { type Link } from './utils/get-link-for-service';

type AvatarSize = 'small' | 'medium' | 'large';
type GetAvatar = (state: State, id: string | null, size: AvatarSize) => string | null;
type GetNames = (state: State, userId: string | null) => $ReadOnlyArray<{|
  service: $Keys<UserProfile>,
  region: $Keys<typeof regions>,
  display: string,
  name: string,
|}>;

const getProfiles = (state: State) => state.userProfiles;

function makeGetProfileById(): (state: State, id: string | null) => UserProfile | null {
  return createSelector(
    getProfiles,
    (state, userId) => userId,
    (profiles, userId) => (userId === null ? null : profiles[userId] || null),
  );
}

function makeGetSteamFriends(): (state: State, id: string) => $ReadOnlyArray<string> {
  return createSelector(
    makeGetProfileById(),
    profile => (profile === null ? [] : profile.steam.friends),
  );
}

function makeIsFriend(): (state: State, id: string) => boolean {
  return createSelector(
    makeGetSteamFriends(),
    getCurrentUserId,
    (friends, userId) => friends.includes(userId),
  );
}

function makeGetAvatar(): GetAvatar {
  return createSelector(
    makeGetProfileById(),
    (state, id, size: AvatarSize) => size,
    (profile, size) => (profile === null ? null : profile.steam.avatar[size]),
  );
}

function makeGetServiceLinks(): (state: State, id: string) => $ReadOnlyArray<Link> {
  return createSelector(
    makeGetProfileById(),
    (profile) => {
      if (profile === null) {
        return [];
      }

      return Object
        .keys(profile)
        .reduce((services, service) => {
          const link = getLinkForService(service, profile);

          return link === null ? services : [
            ...services,
            link,
          ];
        }, []);
    },
  );
}

function makeGetNames(): GetNames {
  return createSelector(
    makeGetProfileById(),
    (profile) => {
      if (profile === null) {
        return [];
      }

      return Object
        .keys(regions)
        .filter(name => Boolean(profile[regions[name].service]))
        .map((name) => {
          const service = regions[name].service;

          return {
            service,
            region: name,
            display: regions[name].fullName,
            name: profile[service].name,
          };
        });
    },
  );
}

export {
  makeGetAvatar,
  makeIsFriend,
  makeGetSteamFriends,
  makeGetProfileById,
  makeGetServiceLinks,
  makeGetNames,
};
