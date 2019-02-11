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
  readonly id: string,
  readonly name: string,
}

interface WithDivisions<Divs> {
  readonly div6v6: keyof Divs,
  readonly div9v9: keyof Divs,
}

interface WithBans {
  readonly isBanned: boolean,
  readonly bannedUntil: number | null,
}

interface SteamProfile extends Profile, WithBans {
  readonly customUrl: string | null,
  readonly friends: string[],
  readonly avatar: {
    readonly small: string,
    readonly medium: string,
    readonly large: string,
  },
}

interface TwitchProfile extends Profile {
  readonly streaming: boolean,
  readonly viewers: number | null,
}

interface ETF2LProfile extends Profile, WithBans, WithDivisions<typeof ETF2LDivisions> {}

interface OZFortressProfile extends Profile, WithDivisions<typeof OZFortressDivisions> {}

interface UserProfile {
  readonly id: string,
  readonly lastUpdate: number,
  readonly steam: SteamProfile,
  readonly etf2l?: ETF2LProfile,
  readonly twitch?: TwitchProfile,
  readonly ozfortress?: OZFortressProfile,
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
