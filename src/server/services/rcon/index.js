import net from 'net';

const PacketType = {
  AUTH: 0x03,
  COMMAND: 0x02,
  RESPONSE_AUTH: 0x02,
  RESPONSE_VALUE: 0x00,
};

Object.freeze(PacketType);

export default class Rcon {
  socket = null;

  timeout = 1000;

  hasAuthenticated = false;

  authPacketId = null;

  callbacks = new Map();

  constructor(host, port, password) {
    this.host = host;
    this.port = port;
    this.password = password;
  }

  connect() {
    return new Promise((resolve, reject) => {
      if (this.hasAuthenticated) {
        reject(new Error('Instance is already authed'));
      }

      this.socket = net.createConnection(this.port, this.host);

      this.socket.on('connect', async () => {
        try {
          await this.send(this.password, PacketType.AUTH);

          this.hasAuthenticated = true;
          resolve();
        } catch (error) {
          reject(error);
        }
      });

      this.socket.on('data', this.handleResponse);

      this.socket.on('error', reject);

      this.socket.on('end', () => {
        this.hasAuthenticated = false;
        this.socket = null;
        this.callbacks.clear();
      });
    });
  }

  disconnect() {
    return new Promise((resolve, reject) => {
      if (!this.hasAuthenticated) {
        reject(new Error('Instance is not authed'));
      }

      const timeout = setTimeout(resolve, this.timeout);

      this.socket.once('error', reject);
      this.socket.once('end', () => {
        clearTimeout(timeout);

        resolve();
      });
      this.socket.end();
    });
  }

  handleResponse = (data) => {
    const len = data.readInt32LE(0);

    if (!len) {
      return;
    }

    const id = data.readInt32LE(4);
    const type = data.readInt32LE(8);

    if (type === PacketType.RESPONSE_AUTH && id === -1) {
      this.callbacks.get(this.authPacketId)(null, new Error('Authentication failed'));
    } else if (this.callbacks.has(id)) {
      let str = data.toString('utf8', 12, len + 2);

      if (str.charAt(str.length - 1) === '\n') {
        str = str.substring(0, str.length - 1);
      }

      this.callbacks.get(id)(str);
    }
  };

  send(data, cmd = PacketType.COMMAND) {
    return new Promise((resolve, reject) => {
      if (!this.hasAuthenticated && cmd !== PacketType.AUTH) {
        reject(new Error('Instance is not authed'));
      }

      const length = Buffer.byteLength(data);
      const id = Math.trunc(Math.random() * (0x98967F - 0xF4240) + 0xF4240);

      if (cmd === PacketType.AUTH) {
        this.authPacketId = id;
      }

      const buf = Buffer.allocUnsafe(length + 14);

      buf.writeInt32LE(length + 10, 0);
      buf.writeInt32LE(id, 4);
      buf.writeInt32LE(cmd, 8);
      buf.write(data, 12);
      buf.fill(0x00, length + 12);

      this.socket.write(buf.toString('binary'), 'binary');

      const timeout = setTimeout(() => {
        this.callbacks.delete(id);

        resolve();
      }, this.timeout);

      this.callbacks.set(id, (response, error) => {
        clearTimeout(timeout);

        this.callbacks.delete(id);

        if (cmd === PacketType.AUTH) {
          this.authPacketId = null;
        }

        return error ? reject(error) : resolve(response);
      });
    });
  }
}
