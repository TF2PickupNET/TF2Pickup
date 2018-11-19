// @flow

import { type UserProfile } from '../../../../types/UserProfile';

interface Link {
  url: string,
  display: string,
  name: $Keys<UserProfile>,
}

function getLinkForService(name: $Keys<UserProfile>, profile: UserProfile): Link | null {
  switch (name) {
    case 'steam': return {
      url: `https://steamcommunity.com/profiles/${profile.steam.id}`,
      name,
      display: 'Steam',
    };
    case 'etf2l': return {
      url: `https://etf2l.org/forum/user/${profile.etf2l.id}`,
      name,
      display: 'ETF2L',
    };
    case 'ozfortress': return {
      url: `https://warzone.ozfortress.com/users/${profile.ozfortress.id}`,
      name,
      display: 'ozfortress',
    };
    case 'twitch': return {
      url: `https://www.twitch.tv/${profile.twitch.name}`,
      name,
      display: 'Twitch',
    };
    default: return null;
  }
}

export type { Link };

export default getLinkForService;
