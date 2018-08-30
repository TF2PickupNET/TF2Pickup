// @flow

import mongoose from 'mongoose';

import {
  oneOf,
  steamId,
  url,
} from '../../utils/validators';

import { divs as etf2lDivs } from './services/etf2l/utils';
import { divs as ozfortressDivs } from './services/ozfortress/utils';

function createDivisionType(divs) {
  return {
    type: String,
    validate: oneOf(divs, {}),
    default: 'N/A',
  };
}

export default mongoose.model('UserProfile', new mongoose.Schema({
  id: {
    type: String,
    validate: steamId({}),
    required: [true, 'SteamId on the userId object is required!'],
    unique: true,
  },

  lastUpdate: {
    type: Date,
    default: Date.now,
  },

  steam: {
    id: {
      type: String,
      validate: steamId({}),
      required: [true, 'SteamId on the userId object is required!'],
    },
    friends: {
      type: [String],
      validate: [],
    },
    isBanned: Boolean,
    bannedUntil: Date,
    customUrl: {
      type: String,
      validate: url({}),
    },
    avatar: {
      small: {
        type: String,
        validate: url({}),
      },
      medium: {
        type: String,
        validate: url({}),
      },
      large: {
        type: String,
        validate: url({}),
      },
    },
  },

  etf2l: {
    id: Number,
    name: String,
    div6v6: createDivisionType(etf2lDivs),
    div9v9: createDivisionType(etf2lDivs),
    isBanned: Boolean,
    bannedUntil: Date,
  },

  twitch: {
    id: Number,
    name: String,
  },

  ozfortress: {
    id: Number,
    name: String,
    div6v6: createDivisionType(ozfortressDivs),
    div9v9: createDivisionType(ozfortressDivs),
    isBanned: Boolean,
    bannedUntil: Date,
  },
}));
