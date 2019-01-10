import mongoose from 'mongoose';
import SteamID from 'steamid';

import oneOf from '../../utils/validators/one-of';
import steamId from '../../utils/validators/steam-id';
import url from '../../utils/validators/url';

import { divs as etf2lDivs } from './services/etf2l/utils';
import { divs as ozfortressDivs } from './services/ozfortress/utils';

function createDivisionType(divs: string[]) {
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
    ref: 'User',
  },

  lastUpdate: Date,

  steam: {
    id: {
      type: String,
      validate: steamId({}),
      required: [true, 'SteamId on the userId object is required!'],
    },
    friends: {
      type: [String],
      validate: [
        (friends: string[]) => friends.every(id => new SteamID(id).isValid()),
      ],
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
