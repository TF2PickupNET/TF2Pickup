import UserProfile from '@typings/UserProfile';

interface Link {
  url: string,
  display: string,
  name: keyof UserProfile,
}

function getLinkForService(name: keyof UserProfile, profile: UserProfile): Link | null {
  switch (name) {
    case 'steam': {
      return {
        url: `https://steamcommunity.com/profiles/${profile.steam.id}`,
        name,
        display: 'Steam',
      };
    }
    case 'etf2l': {
      if (!profile.etf2l) {
        return null;
      }

      return {
        url: `https://etf2l.org/forum/user/${profile.etf2l.id}`,
        name,
        display: 'ETF2L',
      };
    }
    case 'ozfortress': {
      if (!profile.ozfortress) {
        return null;
      }

      return {
        url: `https://warzone.ozfortress.com/users/${profile.ozfortress.id}`,
        name,
        display: 'ozfortress',
      };
    }
    case 'twitch': {
      if (!profile.twitch) {
        return null;
      }

      return {
        url: `https://www.twitch.tv/${profile.twitch.name}`,
        name,
        display: 'Twitch',
      };
    }
    default: return null;
  }
}

export { Link };

export default getLinkForService;
