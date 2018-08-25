// @flow

import mongoose from 'mongoose';

import {
  regions,
  roles,
} from '../../../config';
import {
  steamId,
  oneOf,
} from '../../utils/validators';

const roleNames = Object.keys(roles);

export default mongoose.model('User', new mongoose.Schema({
  id: {
    type: String,
    validate: steamId({}),
    required: [true, 'SteamId on the user object is required!'],
    unique: true,
  },

  name: {
    type: String,
    default: null,
    trim: true,
  },

  region: {
    type: String,
    default: Object.keys(regions).length === 1
      ? Object.keys(regions)[0]
      : null,
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

  roles: {
    type: [String],
    default: [],
    validate: [
      value => value.every(role => roleNames.includes(role)),
    ],
  },
}));
