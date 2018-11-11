// @flow

type ETF2LDivisions = 'Open' | 'Low' | 'Mid' | 'High' | 'Prem' | 'N/A';
type OZFortressDivisions = 'Open' | 'Intermediate' | 'Premier' | 'N/A';

type UserProfile = {|
  id: string,
  lastUpdate: Date,
  steam: {
    id: string,
    isBanned: boolean,
    bannedUntil: Date | null,
    customUrl: string,
    friends: $ReadOnlyArray<string>,
    avatar: {
      small: string,
      medium: string,
      large: string,
    },
  },
  etf2l: {
    id: number,
    name: string,
    div6v6: ETF2LDivisions,
    div9v9: ETF2LDivisions,
    isBanned: boolean,
    bannedUntil: Date | null,
  },
  twitch: {
    id: number,
    name: string,
  },
  ozfortress: {
    id: number,
    name: string,
    div6v6: OZFortressDivisions,
    div9v9: OZFortressDivisions,
    isBanned: boolean,
    bannedUntil: Date | null,
  },
|};

export type {
  UserProfile,
  ETF2LDivisions,
  OZFortressDivisions,
};
