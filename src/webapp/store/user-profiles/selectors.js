// @flow

import { createSelector } from 'reselect';

import { getCurrentUserId } from '../user-id/selectors';
import { type UserProfile } from '../../../types/UserProfile';

import { type State } from '..';

type Link = {
  url: string,
  display: string,
  name: string,
};
type AvatarSize = 'small' | 'medium' | 'large';
type GetAvatar = (state: State, id: string | null, size: AvatarSize) => string | null;

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

function getLinkForService(name: $Keys<UserProfile>, profile: UserProfile): Link | null {
  switch (name) {
    case 'steam': return {
      url: `https://steamcommunity.com/profiles/${profile.steam.id}`,
      name: 'steam',
      display: 'Steam',
    };
    case 'etf2l': return {
      url: `https://etf2l.org/forum/user/${profile.etf2l.id}`,
      name: 'etf2l',
      display: 'ETF2L',
    };
    case 'ozfortress': return {
      url: `https://warzone.ozfortress.com/users/${profile.ozfortress.id}`,
      name: 'ozfortress',
      display: 'ozfortress',
    };
    case 'twitch': return {
      url: `https://www.twitch.tv/${profile.twitch.name}`,
      name: 'twitch',
      display: 'Twitch',
    };
    default: return null;
  }
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

export {
  makeGetAvatar,
  makeIsFriend,
  makeGetSteamFriends,
  makeGetProfileById,
  makeGetServiceLinks,
};
