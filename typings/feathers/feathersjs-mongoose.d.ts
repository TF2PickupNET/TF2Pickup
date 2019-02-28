declare module 'feathers-mongoose' {
  import {
    ServerService,
    DefaultDocument,
  } from '@feathersjs/feathers';
  import {
    Model,
    Document,
  } from 'mongoose';

  interface Options<MongooseDocument extends Document> {
    Model: Model<MongooseDocument>,
    lean?: boolean,
    id: 'id',
    events?: string[],
    paginate?: {
      max: number,
      default: number,
    },
  }

  export default function service<MongooseDocument extends Document, Doc extends DefaultDocument>(
    options: Options<MongooseDocument>
  ): ServerService<Doc>;
}
