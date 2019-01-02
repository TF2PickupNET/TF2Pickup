import { ServerApp } from '@feathersjs/feathers';

function configureChannels() {
  return (app: ServerApp) => {
    app.on('connection', (connection) => {
      app.channel('anonymous').join(connection);
    });

    app.on('login', (_, { connection }) => {
      if (connection) {
        app.channel('anonymous').leave(connection);

        app.channel('authenticated').join(connection);

        app.channel(`region:${connection.user.region}`);
      }
    });

    app.on('logout', (_, { connection }) => {
      app.channel('authenticated').leave(connection);
    });
  };
}

export default configureChannels;
