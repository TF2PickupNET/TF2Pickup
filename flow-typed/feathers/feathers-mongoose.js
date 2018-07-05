// @flow strict-local

import { type Model } from 'feathers-mongoose';
import { type Service } from '@feathersjs/feathers';

declare module 'feathers-mongoose' {
  declare type Options = {
    Model: Model,
    lean?: boolean,
    id?: string,
    events?: $ReadOnlyArray<string>,
    paginate?: {
      max: number,
      default: number,
    },
  };

  declare export default function service<App, Doc>(options: Options): Service<App, Doc>;
}
