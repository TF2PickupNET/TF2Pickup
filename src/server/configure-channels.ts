import { ServerApp } from '@feathersjs/feathers';

function configureChannels(app: ServerApp) {
  app.on('connection', (connection) => {
    app.channel('anonymous').join(connection);

    app.channel('all').join(connection);

    app.channel('region:eu').join(connection);

  });

  app.on('login', (_, { connection }) => {
    if (connection) {
      app.channel('anonymous').leave(connection);

      app.channel('authenticated').join(connection);

      app.channel(`region:${connection.user.region}`).join(connection);
    }
  });

  app.on('logout', (_, { connection }) => {
    app.channel('authenticated').leave(connection);

    app.channel('anonymous').join(connection);
  });
}

export default configureChannels;
