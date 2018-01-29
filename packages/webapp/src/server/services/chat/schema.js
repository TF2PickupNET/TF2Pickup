import { Schema } from 'mongoose';
import { regions } from '@tf2-pickup/config';

import {
  isInArray,
  steamId,
} from '../validators';

export default new Schema({
  chat: {
    type: String,
    required: true,
    validate: isInArray([
      'global',
      ...Object.keys(regions),
    ], {}),
  },

  message: {
    type: String,
    required: true,
  },

  userId: {
    type: String,
    required: true,
    validate: steamId({}),
  },

  createdOn: {
    type: Date,
    required: true,
    default: Date.now,
  },

  removed: {
    type: Boolean,
    default: false,
  },

  removedBy: {
    type: String,
    validate: steamId({ nullIsAllowed: true }),
    default: null,
  },
});
