// @flow

import mongoose from 'mongoose';

import { regions } from '../../../config';
import {
  steamId,
  oneOf,
} from '../../utils/validators';

export default mongoose.model('User', new mongoose.Schema({
  id: {
    type: String,
    validate: steamId({}),
    required: [true, 'SteamId on the user object is required!'],
    index: true,
    unique: true,
  },

  name: {
    type: String,
    default: null,
    unique: true,
    trim: true,
  },

  region: {
    type: String,
    default: null,
    validate: oneOf(Object.keys(regions), { nullIsAllowed: true }),
  },

  online: {
    type: Boolean,
    default: false,
  },

  lastOnline: {
    type: Date,
    default: Date.now,
  },

  hasAcceptedTheRules: {
    type: Boolean,
    default: false,
  },

  createdOn: {
    type: Date,
    default: Date.now,
  },

  lastPickup: {
    type: Number,
    default: null,
  },
}));
