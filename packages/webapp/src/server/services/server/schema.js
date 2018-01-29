import { Schema } from 'mongoose';
import { regions } from '@tf2-pickup/config';

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

  region: {
    type: String,
    validate: isInArray(Object.keys(regions), {}),
    required: true,
  },

  isActive: {
    type: Boolean,
    default: true,
  },

  ip: {
    type: String,
    required: true,
  },

  port: {
    type: Number,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  rconPassword: {
    type: String,
    required: true,
  },

  stvPort: {
    type: Number,
    required: true,
  },

  stvPassword: {
    type: String,
    required: true,
  },

  reservationId: Number,
});
