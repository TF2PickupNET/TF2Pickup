// @flow

import OAuth2Strategy, { type Verify } from 'passport-oauth2';
import { promisify } from 'util';

export default class TwitchStrategy extends OAuth2Strategy {
  name = 'twitch';

  constructor(options: $Exact<{}>, verify: Verify) {
    super({
      authorizationURL: 'https://id.twitch.tv/oauth2/authorize',
      tokenURL: 'https://id.twitch.tv/oauth2/token',
      ...options,
    }, verify);

    this._oauth2.setAuthMethod('Bearer');
    this._oauth2.useAuthorizationHeaderforGET(true);
  }

  // eslint-disable-next-line class-methods-use-this
  authorizationParams() {
    // eslint-disable-next-line camelcase
    return { force_verify: true };
  }

  async userProfile(accessToken: string, done: (err: Error | null, user?: {}) => void) {
    try {
      const getUser = promisify(this._oauth2.get.bind(this._oauth2));
      const req = await getUser('https://api.twitch.tv/helix/users', accessToken);
      const user = JSON.parse(req).data[0];

      return done(null, {
        id: user.id,
        name: user.login,
        displayName: user.display_name,
      });
    } catch (error) {
      return done(error);
    }
  }
}
