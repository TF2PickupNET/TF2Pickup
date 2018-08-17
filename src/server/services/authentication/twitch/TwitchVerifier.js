// @flow

import { type ExpressRequest } from '@feathersjs/express';
import { Verifier } from '@feathersjs/authentication-oauth2';
import { NotAuthenticated } from '@feathersjs/errors';

export default class TwitchVerifier extends Verifier {
  // eslint-disable-next-line max-params
  async verify(
    req: ExpressRequest,
    accessToken: string,
    refreshToken: string,
    profile: {},
    done: (error: FeathersError | null, user?: {}) => void,
  ) {
    if (req.user && req.user.id) {
      await this.app.service('user-profile').patch(req.user.id, { $set: { twitch: profile } });

      return done(null, req.user);
    }

    return done(
      new NotAuthenticated()
    );
  }
}
