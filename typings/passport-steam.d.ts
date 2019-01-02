declare module 'passport-steam' {
  import { Strategy } from '@feathersjs/authentication';

  interface Options {
    returnURL: string,
    realm: string,
    profile: boolean,
  }

  type Callback = (
    indentifier: string,
    profile: {},
    done: (err: Error | null, user: {} | null) => void,
  ) => void | Promise<void>;

  export default class SteamStrategy implements Strategy {
    public constructor(options: Options, callback: Callback);
  }
}
