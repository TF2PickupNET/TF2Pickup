// @flow

import { type ExpressRequest } from '@feathersjs/express';
import {
  Verifier,
  type Payload,
  type DoneFunction,
} from '@feathersjs/authentication-jwt';

export default class JWTVerifier extends Verifier {
  async verify(req: ExpressRequest, payload: Payload, done: DoneFunction) {
    try {
      const user = await this.app.service('users').get(payload.id);

      return done(null, user, { id: user.id });
    } catch (error) {
      return done(error, null);
    }
  }
}
