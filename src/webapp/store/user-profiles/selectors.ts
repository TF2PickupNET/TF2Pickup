import { createSelector } from 'reselect';
import { getCurrentUserId } from '@webapp/store/user-id/selectors';
import UserProfile from '@typings/UserProfile';
import {
  AsyncStatus,
  State,
} from '@webapp/store';
import { Keys } from '@utils/types';
import regions from '@config/regions';

import getLinkForService, { Link } from './utils/get-link-for-service';

type AvatarSize = keyof UserProfile['steam']['avatar'];

const getProfiles = (state: State) => state.userProfiles;

const makeGetProfileById = () => createSelector(
  getProfiles,
  (_: State, userId: string | null) => userId,
  (profiles, userId) => (
    userId !== null && userId in profiles ? profiles[userId].item : null
  ),
);

const makeGetProfileStatusById = () => createSelector(
  getProfiles,
  (_: State, userId: string | null) => userId,
  (profiles, userId) => (
    userId !== null && userId in profiles ? profiles[userId].status : AsyncStatus.NOT_STARTED
  ),
);

const makeGetProfileErrorById = () => createSelector(
  getProfiles,
  (_: State, userId: string | null) => userId,
  (profiles, userId) => (
    userId !== null && userId in profiles ? profiles[userId].error : null
  ),
);

const makeGetSteamFriends = () => createSelector(
  makeGetProfileById(),
  profile => (profile === null ? [] : profile.steam.friends),
);

const makeIsFriend = () => createSelector(
  makeGetSteamFriends(),
  getCurrentUserId,
  (friends, userId) => userId !== null && friends.includes(userId),
);

const makeGetAvatar = (size: AvatarSize) => createSelector(
  makeGetProfileById(),
  profile => (profile === null ? null : profile.steam.avatar[size]),
);

const makeGetServiceLinks = () => createSelector(
  makeGetProfileById(),
  (profile) => {
    if (profile === null) {
      return [];
    }

    const keys = Object.keys(profile) as Keys<UserProfile>;

    return keys
      .map(service => getLinkForService(service, profile))
      .filter((link): link is Link => link !== null);
  },
);

interface NameOption {
  service: keyof UserProfile,
  region: keyof typeof regions,
  display: string,
  name: string,
}

const regionKeys = Object.keys(regions) as Keys<typeof regions>;

const makeGetNames = () => createSelector(
  makeGetProfileById(),
  (profile) => {
    if (profile === null) {
      return [];
    }

    return regionKeys
      .map((region): NameOption | null => {
        const service = regions[region].service;
        const data = profile[service];

        if (data) {
          return {
            service,
            region,
            display: regions[region].fullName,
            name: data.name,
          };
        }

        return null;
      })
      .filter((name: NameOption | null): name is NameOption => name !== null);
  },
);

export {
  makeGetAvatar,
  makeIsFriend,
  makeGetSteamFriends,
  makeGetProfileById,
  makeGetServiceLinks,
  makeGetNames,
  makeGetProfileErrorById,
  makeGetProfileStatusById,
};
