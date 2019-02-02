enum ETF2LDivisions {
  'N/A',
  'Low',
  'Open',
  'Mid',
  'High',
  'Prem',
}

enum OZFortressDivisions {
  'N/A',
  'Open',
  'Intermediate',
  'Premier',
}

interface Profile {
  id: string,
  name: string,
}

interface WithDivisions<Divs> {
  div6v6: keyof Divs,
  div9v9: keyof Divs,
}

interface WithBans {
  isBanned: boolean,
  bannedUntil: number | null,
}

interface SteamProfile extends Profile, WithBans {
  customUrl: string | null,
  friends: string[],
  avatar: {
    small: string,
    medium: string,
    large: string,
  },
}

interface TwitchProfile extends Profile {
  streaming: boolean,
  viewers: number | null,
}

interface ETF2LProfile extends Profile, WithBans, WithDivisions<typeof ETF2LDivisions> {}

interface OZFortressProfile extends Profile, WithDivisions<typeof OZFortressDivisions> {}

interface UserProfile {
  id: string,
  lastUpdate: number,
  steam: SteamProfile,
  etf2l?: ETF2LProfile,
  twitch?: TwitchProfile,
  ozfortress?: OZFortressProfile,
}

export {
  ETF2LDivisions,
  OZFortressDivisions,
  Profile,
  WithDivisions,
  WithBans,
  SteamProfile,
  TwitchProfile,
  ETF2LProfile,
  OZFortressProfile,
};

export default UserProfile;
