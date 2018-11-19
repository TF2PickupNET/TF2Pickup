// @flow

import mongoose from 'mongoose';

import { steamId } from '../../utils/validators';

export default mongoose.model('Warning', new mongoose.Schema({
  from: {
    type: String,
    validate: steamId({}),
    required: true,
  },

  for: {
    type: String,
    validate: steamId({}),
    required: true,
  },

  message: {
    type: String,
    required: true,
  },

  read: {
    type: Boolean,
    default: false,
  },

  createdOn: {
    type: Date,
    default: Date.now,
  },

  readOn: {
    type: Date,
    default: null,
  },
}));
