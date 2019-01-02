declare module '@feathersjs/authentication-client' {
  import { ClientApp } from '@feathersjs/feathers';

  export default function client(options: { storage: Storage }): (app: ClientApp) => void;
}
