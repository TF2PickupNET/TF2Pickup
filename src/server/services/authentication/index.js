import auth from 'feathers-authentication';
import SteamStrategy from 'passport-steam';
import jwt, { Verifier } from 'feathers-authentication-jwt';
import ms from 'ms';

import createLoginListener from './login-listener';
import createLogoutListener from './logout-listener';

/**
 * A utility class which makes sure the id from the jwt get's mapped to the correct user.
 *
 * @class
 * @extends Verifier
 */
class JWTVerifier extends Verifier {
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
  const steamAuthPath = 'auth/steam';
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

  that.passport.use(
    new SteamStrategy({
      returnURL: `${that.get('config').url}/${steamAuthPath}/return`,
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
        return done(new Error(`Multiple users found with the steamId ${id}`), null);
      }

      // Create a new user when no user was found
      try {
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

  that.get(`/${steamAuthPath}`, auth.express.authenticate('steam'));

  that.get(
    `/${steamAuthPath}/return`,
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
