declare module 'passport-steam' {
  import { Strategy } from '@feathersjs/authentication';
  import { Request } from '@feathersjs/express';

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

  export default class SteamStrategy implements Strategy<Options> {
    public constructor(options: Options, callback: Callback);

    public authenticate(req: Request, options: object): void;
  }
}
