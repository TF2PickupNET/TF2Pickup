declare module 'feathers-mongoose' {
  import { ServerService } from '@feathersjs/feathers';
  import {
    Model,
    Document,
  } from 'mongoose';

  interface Options<Doc extends Document> {
    Model: Model<Doc>,
    lean?: boolean,
    id?: string,
    events?: string[],
    paginate?: {
      max: number,
      default: number,
    },
  }

  export default function service<Doc extends Document>(options: Options<Doc>): ServerService<Doc>;
}
