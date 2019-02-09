import mongoose from 'mongoose';
import SteamID from 'steamid';
import steamId from '@server/utils/validators/steam-id';
import url from '@server/utils/validators/url';
import {
  ETF2LDivisions,
  OZFortressDivisions,
} from '@typings/UserProfile';

function createDivisionType(divs: object) {
  return {
    type: String,
    validate(val: string) {
      return val in divs;
    },
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
    name: String,
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
    id: String,
    name: String,
    div6v6: createDivisionType(ETF2LDivisions),
    div9v9: createDivisionType(ETF2LDivisions),
    isBanned: Boolean,
    bannedUntil: Number,
  },

  twitch: {
    id: String,
    name: String,
  },

  ozfortress: {
    id: String,
    name: String,
    div6v6: createDivisionType(OZFortressDivisions),
    div9v9: createDivisionType(OZFortressDivisions),
    isBanned: Boolean,
    bannedUntil: Number,
  },
}));
