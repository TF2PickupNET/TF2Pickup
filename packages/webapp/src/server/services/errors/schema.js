import { Schema } from 'mongoose';

import { steamId } from '../validators';

export default new Schema({
  createdOn: {
    type: Date,
    default: Date.now,
  },

  steamId: {
    type: String,
    validate: steamId({ nullIsAllowed: true }),
    default: null,
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
