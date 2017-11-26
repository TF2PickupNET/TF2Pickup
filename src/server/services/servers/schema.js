import { Schema } from 'mongoose';

import { isInArray } from '../validators';

export default new Schema({
  id: {
    type: Number,
    unique: true,
    index: true,
  },

  type: {
    type: String,
    validate: isInArray(['serveme'], {}),
    required: true,
  },

  ip: {
    type: String,
    required: true,
  },

  port: {
    type: Number,
    required: true,
  },

  password: String,

  rconPassword: String,

  stvPort: Number,
  stvPassword: String,

  reservationId: Number,
});
