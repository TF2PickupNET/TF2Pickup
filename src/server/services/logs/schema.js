import { Schema } from 'mongoose';

import {
  steamId,
  isInArray,
} from '../validators';

export default new Schema({
  id: Schema.Types.ObjectId,

  createdOn: {
    type: Date,
    default: Date.now,
  },

  steamId: {
    type: String,
    validate: steamId({ nullIsAllowed: true }),
    default: null,
  },

  environment: {
    type: String,
    validate: isInArray(['client', 'server'], {}),
    required: [true, 'The environment is required in the logs database!'],
  },

  message: {
    type: String,
    required: [true, 'All logs need a message!'],
  },

  info: {
    type: Object,
    default: null,
  },
});
