// @flow strict-local

declare module 'steamid' {
  declare export type Universe = {
    INVALID: 0,
    PUBLIC: 1,
    BETA: 2,
    INTERNAL: 3,
    DEV: 4,
  };

  declare export type Type = {
    INVALID: 0,
    INDIVIDUAL: 1,
    MULTISEAT: 2,
    GAMESERVER: 3,
    ANON_GAMESERVER: 4,
    PENDING: 5,
    CONTENT_SERVER: 6,
    CLAN: 7,
    CHAT: 8,
    P2P_SUPER_SEEDER: 9,
    ANON_USER: 10,
  };

  declare export type Instance = {
    ALL: 0,
    DESKTOP: 1,
    CONSOLE: 2,
    WEB: 4,
  };

  declare export class ID {
    universe: $Values<Universe>,
    type: $Values<Type>,
    instance: $Values<Instance>,
    accountid: number,
    isValid(): boolean,
    isGroupChat(): boolean,
    isLobby(): boolean,
    getSteam2RenderedID(newerFormat: boolean): string,
    getSteam3RenderedID(): string,
    getSteamID64(): string,
  }

  declare export default function SteamId(id: string): ID;
}
