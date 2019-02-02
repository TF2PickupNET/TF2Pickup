import app from '../app';
import { Events } from '../../../typings/feathers/socket-events';

function emitSocketEvent<Name extends keyof Events>(name: Name, data: Events[Name]): Promise<void> {
  // eslint-disable-next-line promise/avoid-new
  return new Promise((resolve, reject) => {
    app.io.emit(name, data, (err) => err ? reject(err) : resolve());
  });
}

export default emitSocketEvent;
