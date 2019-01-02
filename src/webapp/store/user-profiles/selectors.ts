import { createSelector } from 'reselect';

import { getCurrentUserId } from '../user-id/selectors';
import UserProfile from '../../../types/UserProfile';

import { State } from '..';

import regions from '../../../config/regions';

import getLinkForService from './utils/get-link-for-service';
import { AsyncStatus } from '../types';

type AvatarSize = 'small' | 'medium' | 'large';

const getProfiles = (state: State) => state.userProfiles;

const makeGetProfile = () => createSelector(
  getProfiles,
  (_: State, userId: string | null) => userId,
  (profiles, userId) => (
    userId !== null && userId in profiles ? profiles[userId].item : null
  ),
);

const makeGetProfileStatus = () => createSelector(
  getProfiles,
  (_: State, userId: string | null) => userId,
  (profiles, userId) => (
    userId !== null && userId in profiles ? profiles[userId].status : AsyncStatus.NOT_STARTED
  ),
);

const makeGetProfileError = () => createSelector(
  getProfiles,
  (_: State, userId: string | null) => userId,
  (profiles, userId) => (
    userId !== null && userId in profiles ? profiles[userId].error : null
  ),
);

const makeGetSteamFriends = () => createSelector(
  makeGetProfile(),
  profile => (
    profile === null ? [] : profile.steam.friends
  ),
);

const makeIsFriend = () => createSelector(
  makeGetSteamFriends(),
  getCurrentUserId,
  (friends, userId) => userId !== null && friends.includes(userId),
);

const makeGetAvatar = (size: AvatarSize) => createSelector(
  makeGetProfile(),
  (profile) => (
    profile === null ? null : profile.steam.avatar[size]
  ),
);

const makeGetServiceLinks = () => createSelector(
  makeGetProfile(),
  (profile) => {
    if(profile === null) {
      return [];
    }

    const keys = Object.keys(profile) as Array<keyof UserProfile>;

    return keys
      .map(service => getLinkForService(service, profile))
      .filter(link => link !== null);
  },
);

const makeGetNames = () => createSelector(
  makeGetProfile(),
  (profile) => {
    if(profile === null) {
      return [];
    }

    const regionKeys = Object.keys(regions) as Array<keyof typeof regions>;

    return regionKeys
      .filter((name: keyof typeof regions) => regions[name].service in profile)
      .map((region) => {
        const service = regions[region].service;

        return {
          service,
          region,
          display: regions[region].fullName,
          name: profile[service]!.name,
        };
      });
  },
);

export {
  makeGetAvatar,
  makeIsFriend,
  makeGetSteamFriends,
  makeGetProfile,
  makeGetServiceLinks,
  makeGetNames,
  makeGetProfileError,
  makeGetProfileStatus,
};
