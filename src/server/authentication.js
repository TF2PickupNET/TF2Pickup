import auth from 'feathers-authentication';
import SteamStrategy from 'passport-steam';
import jwt, { Verifier } from 'feathers-authentication-jwt';
import ms from 'ms';

import getNewUserData from './services/users/get-new-user-data';

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

      if (users.length === 1) {
        return done(null, users[0]);
      }

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
      const token = await req.app.passport.createJWT({ id: req.user.id }, that.get('auth'));

      res.cookie(options.cookie.name, token, { maxAge: ms(options.jwt.expiresIn) });

      next();
    },
    (req, res) => res.redirect('/'),
  );

  that.on('login', async (payload, { connection }) => {
    const users = that.service('users');
    const logs = that.service('logs');

    try {
      const updatedData = await getNewUserData(connection.user, that.app);

      updatedData.online = true;

      await users.patch(connection.user.id, updatedData);

      users.emit('login', {
        id: connection.user.id,
        region: connection.user.settings.region,
        username: connection.user.settings.username,
        avatar: connection.user.services.steam.avatar,
      });

      await logs.create({
        message: 'User logged in',
        environment: 'server',
        steamId: connection.user.id,
      });
    } catch (error) {
      await logs.create({
        message: 'Error on login callback',
        environment: 'server',
        info: error,
        steamId: connection.user.id,
      });
    }
  });

  that.on('logout', async (payload, { connection }) => {
    const logs = that.service('logs');
    const users = that.service('users');
    const update = {
      online: false,
      lastOnline: Date.now(),
    };

    try {
      await users.patch(connection.user.id, update);

      users.emit('logout', {
        id: connection.user.id,
        region: connection.user.settings.region,
      });

      await logs.create({
        message: 'User logged out',
        environment: 'server',
        steamId: connection.user.id,
      });
    } catch (error) {
      await logs.create({
        message: 'Error on logout callback',
        environment: 'server',
        info: error,
        steamId: connection.user.id,
      });
    }
  });
}
