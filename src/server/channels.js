// @flow

import { type App } from '@feathersjs/express';

function channels(app: App) {
  app.on('connection', (connection) => {
    app.channel('anonymous').join(connection);
  });

  app.on('login', (payload, { connection }) => {
    if (connection) {
      app.channel('anonymous').leave(connection);

      app.channel('authenticated').join(connection);

      app.channel(`region:${connection.user.region}`);
    }
  });

  app.on('logout', ({ connection }) => {
    app.channel('authenticated').leave(connection);
  });
}

export default channels;
