import {
  Verifier,
  Payload,
  DoneFunction,
} from '@feathersjs/authentication-jwt';
import { Request } from '@feathersjs/express';

export default class JWTVerifier extends Verifier {
  public async verify(_: Request, payload: Payload, done: DoneFunction) {
    try {
      const user = await this.app.service('users').get(payload.id);

      return done(null, user, { id: user.id });
    } catch (error) {
      return done(error, null);
    }
  }
}
