// @flow

import { type App } from '@feathersjs/feathers';

declare module '@feathersjs/authentication-client' {
  declare export default function client(options: { storage: Storage }): (app: App) => void;
}
