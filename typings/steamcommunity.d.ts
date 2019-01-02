declare module 'steamcommunity' {
  import SteamID from 'steamid';

  export interface SteamGroup {
    getMembers(): SteamID[],
  }

  export default class Community {
    public inviteUserToGroup(
      userId: string,
      groupId: string,
      cb: (err: Error | null, result: void) => void,
    ): void;

    public login(details: {}, cb: (err: Error | null, result: void) => void): void;

    public getSteamGroup(id: string): SteamGroup;
  }
}
