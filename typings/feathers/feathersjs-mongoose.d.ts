declare module 'feathers-mongoose' {
  import { ServerService } from '@feathersjs/feathers';
  import { Model } from 'mongoose';

  interface Options {
    Model: Model<any>,
    lean?: boolean,
    id?: string,
    events?: string[],
    paginate?: {
      max: number,
      default: number,
    },
  }

  export default function service<Doc>(options: Options): ServerService<Doc>;
}
