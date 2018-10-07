// @flow strict-local

import { type ID } from 'steamid';

declare module 'steamcommunity' {
  declare class SteamGroup {
    getMembers(): $ReadOnlyArray<ID>,
  }

  declare export default class Community {
    inviteUserToGroup(userId: string, groupId: string, cb: () => void): void,
    login(details: {}, cb: () => void): void,
    getSteamGroup(id: string): SteamGroup,
  }
}
