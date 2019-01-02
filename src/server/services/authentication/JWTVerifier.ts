import {
  Verifier,
  Payload,
  DoneFunction,
} from '@feathersjs/authentication-jwt';
import { ExpressRequest } from "@feathersjs/express";

export default class JWTVerifier extends Verifier {
  async verify(_: ExpressRequest, payload: Payload, done: DoneFunction) {
    try {
      const user = await this.app.service('users').get(payload.id);

      return done(null, user, { id: user.id });
    } catch (error) {
      return done(error, null);
    }
  }
}
