export default function socketMethods(app, socket) {
  socket.on('chat.new-message', (data) => {
    if (socket.feathers.user) {
      app.service('chat').create({
        userId: socket.feathers.user.id,
        message: data.message,
        chat: data.chat,
      });
    }
  });
}
