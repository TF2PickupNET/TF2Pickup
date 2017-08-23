import auth from 'feathers-authentication';
import SteamStrategy from 'passport-steam';
import jwt, { Verifier } from 'feathers-authentication-jwt';
import ms from 'ms';

import createLoginListener from './create-login-listener';
import createLogoutListener from './create-logout-listener';
import { authUrl } from '../../../config/index';
import getGroupMembers from '../users/third-party-services/steam/get-group-members';
import { validateUsersAgainstSteamGroup } from '../../../config/steam';

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
      return done(error, null);
    }
  }
}

/**
 * Initialize the authentication service.
 */
export default function authentication() {
  const that = this;
  const options = {
    secret: that.get('config').SECRET,
    cookie: {
      enabled: true,
      name: 'feathers-jwt',
    },
    jwt: { expiresIn: '7d' },
  };

  that.configure(auth(options));
  that.configure(jwt({ Verifier: JWTVerifier }));

  that.service('authentication').hooks({ before: { create: auth.hooks.authenticate(['jwt']) } });

  that.passport.use(
    new SteamStrategy({
      returnURL: `${that.get('config').url}${authUrl}/return`,
      realm: that.get('config').url,
      profile: false,
    }, async (identifier, profile, done) => {
      const [, id] = identifier.match(/https?:\/\/steamcommunity\.com\/openid\/id\/(\d+)/);
      const usersService = that.service('users');
      const query = { id };
      const users = await usersService.find(query);

      // Return the user if exactly one was found and if more than were found return an error
      if (users.length === 1) {
        return done(null, users[0]);
      } else if (users.length > 1) {
        return done(
          new Error(`Multiple users found with the steamId ${id}! Please contact a system admin.`),
          null,
        );
      }

      // Create a new user when no user was found
      try {
        if (process.env.BETA_MODE && that.get('config').env === 'prod') {
          const groupMembers = await getGroupMembers(validateUsersAgainstSteamGroup, that);

          if (!groupMembers.includes(id)) {
            return done(
              new Error(
                'The site is currently in beta mode and you are not in the required Steam Group',
              ),
              null,
            );
          }
        }

        const newUser = await usersService.create(query);

        return done(null, newUser);
      } catch (error) {
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
