import auth from 'feathers-authentication';
import SteamStrategy from 'passport-steam';
import jwt, { Verifier } from 'feathers-authentication-jwt';
import errors from 'feathers-errors';
import ms from 'ms';
import debug from 'debug';
import config from 'config';

import { authUrl } from '../../../config/index';

import createLoginListener from './create-login-listener';
import createLogoutListener from './create-logout-listener';
import getGroupMembers from './get-group-members';
import getTF2Hours from './get-tf2-hours';

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
    log('Verifying JWT', payload.id);

    try {
      const user = await this.app.service('users').get(payload.id);

      log('Verified JWT', user.id);

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
    secret: config.get('server.auth.secret'),
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

      log('New steam login', id);

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

      const tf2Hours = await getTF2Hours(id, that);

      if (tf2Hours === null) {
        log('Unable to fetch tf2 hours', id);

        return done(
          new errors.Timeout([
            'Something went wrong while trying to get your played hours in TF2!',
            'Please try again. If the problem persists concat a developer over discord.',
          ].join(' ')),
          null,
        );
      }

      if (tf2Hours < config.get('server.auth.required_hours')) {
        log('TF2 hours do not satisfy the required minimum', id);

        return done(
          new errors.Forbidden([
            'You don\'t have the required minimum hours in TF2 to play TF2Pickup',
            `You will atleast need ${config.get('server.auth.required_hours')} in TF2.`,
          ].join(' ')),
          null,
        );
      }

      if (config.has('beta') && config.get('beta.steam-group')) {
        log('Validating user against steam group', config.get('beta.steam-group'));

        const groupMembers = await getGroupMembers(
          config.get('beta.steam-group'),
          that,
        );

        if (!groupMembers.includes(id)) {
          log('User is not in the steam group', id);

          return done(
            new errors.Forbidden(
              'The site is currently in beta mode and you are not in the required Steam Group',
            ),
            null,
          );
        }
      }

      // Create a new user when no user was found
      try {
        log('Creating new user', id);

        const newUser = await usersService.create({ id });

        return done(null, newUser);
      } catch (error) {
        log('Error while creating new user', id, error);

        that.service('logs').create({
          message: 'Error while creating new user',
          environment: 'server',
          info: error,
          steamId: id,
        });

        return done(error, null);
      }
    }),
  );

  that.get(authUrl, auth.express.authenticate('steam'));

  that.get(
    `${authUrl}/return`,
    auth.express.authenticate('steam'),
    async (req, res, next) => {
      log('Creating new JWT', req.user.id);

      // Create a new jwt token
      const token = await req.app.passport.createJWT({ id: req.user.id }, that.get('auth'));

      // Set the new jwt token as a cookie
      res.cookie(options.cookie.name, token, { maxAge: ms(options.jwt.expiresIn) });

      next();
    },
    (req, res) => res.redirect('/'),
  );

  that.on('login', createLoginListener(that));
  that.on('logout', createLogoutListener(that));
}
