import auth from 'feathers-authentication';
import SteamStrategy from 'passport-steam';
import jwt, { Verifier } from 'feathers-authentication-jwt';
import ms from 'ms';
import debug from 'debug';
import config from 'config';
import queryString from 'query-string';
import { authUrl } from '@tf2-pickup/config';

const log = debug('TF2Pickup:authentication');

/**
 * A utility class which makes sure the id from the jwt get's mapped to the correct user.
 *
 * @class
 * @extends Verifier
 */
class JWTVerifier extends Verifier {
  /**
   * Verify that the jwt corresponds to a user.
   *
   * @param {Object} req - The express request object.
   * @param {Object} payload - The parsed JWT token.
   * @param {Function} done - The function to call with the user.
   * @returns {Promise} - Returns the called done function.
   */
  async verify(req, payload, done) {
    try {
      const user = await this.app.service('users').get(payload.id);

      return done(null, user, { id: user.id });
    } catch (error) {
      log('Error while verifying JWT', payload.id, error);

      return done(error, null);
    }
  }
}

/**
 * Initialize the authentication service.
 */
export default function authentication() {
  log('Setting up authentication service');

  const that = this;
  const options = {
    secret: config.get('auth.secret'),
    cookie: {
      enabled: true,
      name: 'feathers-jwt',
    },
    jwt: {
      expiresIn: '7d',
      issuer: 'tf2pickup',
      audience: config.get('server.ip'),
    },
  };

  that.configure(auth(options));
  that.configure(jwt({ Verifier: JWTVerifier }));

  that.service('authentication').hooks({ before: { create: auth.hooks.authenticate(['jwt']) } });

  that.passport.use(
    new SteamStrategy({
      returnURL: `${that.get('url')}${authUrl}/return`,
      realm: that.get('url'),
      profile: false,
    }, async (identifier, profile, done) => {
      const [, id] = identifier.match(/https?:\/\/steamcommunity\.com\/openid\/id\/(\d+)/);
      const usersService = that.service('users');

      try {
        const user = await usersService.get(id);

        log('Logging in user', id);

        return done(null, user);
      } catch (error) {
        if (error.code !== 404) {
          log('Unknown error while getting user', id, error);

          return done(error, null);
        }
      }

      // Create a new user when no user was found
      try {
        log('Creating new user', id);

        const newUser = await usersService.create({ id });

        return done(null, newUser);
      } catch (error) {
        log('Error while creating new user', id, error);

        return done(error, null);
      }
    }),
  );

  that.get(
    authUrl,
    (req, res, next) => {
      res.cookie('url', req.query.url.slice(1));

      next();
    },
    auth.express.authenticate('steam'),
  );

  that.get(
    `${authUrl}/return`,
    auth.express.authenticate('steam'),
    async (req, res, next) => {
      // Create a new jwt token
      const token = await req.app.passport.createJWT({ id: req.user.id }, that.get('auth'));

      // Set the new jwt token as a cookie
      res.cookie(options.cookie.name, token, { maxAge: ms(options.jwt.expiresIn) });

      next();
    },
    (req, res) => {
      const query = queryString.parse(req.headers.cookie);

      res.clearCookie('url');

      res.redirect(`/${query.url ? query.url : ''}`);
    },
  );
}
