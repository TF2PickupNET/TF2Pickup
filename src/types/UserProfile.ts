type ETF2LDivisions = 'Open' | 'Low' | 'Mid' | 'High' | 'Prem' | 'N/A';
type OZFortressDivisions = 'Open' | 'Intermediate' | 'Premier' | 'N/A';

interface UserProfile {
  id: string,
  lastUpdate: number,
  steam: {
    id: string,
    isBanned: boolean,
    bannedUntil: number | null,
    customUrl: string | null,
    friends: string[],
    avatar: {
      small: string,
      medium: string,
      large: string,
    },
  },
  etf2l?: {
    id: number,
    name: string,
    div6v6: ETF2LDivisions,
    div9v9: ETF2LDivisions,
    isBanned: boolean,
    bannedUntil: number | null,
  },
  twitch?: {
    id: number,
    name: string,
  },
  ozfortress?: {
    id: number,
    name: string,
    div6v6: OZFortressDivisions,
    div9v9: OZFortressDivisions,
    isBanned: boolean,
    bannedUntil: number | null,
  },
}

export {
  ETF2LDivisions,
  OZFortressDivisions,
};

export default UserProfile;
