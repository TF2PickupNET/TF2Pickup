import app from '@webapp/app';
import { Events } from '@typings/SocketEvents';

function emitSocketEvent<Name extends keyof Events>(name: Name, data: Events[Name]): Promise<void> {
  // eslint-disable-next-line promise/avoid-new
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line promise/prefer-await-to-callbacks
    app.io.emit(name, data, err => (err ? reject(err) : resolve()));
  });
}

export default emitSocketEvent;
