import SteamID from 'steamid';
import { Schema } from 'mongoose';

import regions from '@tf2-pickup/configs/regions';

import { divs as etf2lDivs } from './third-party-services/etf2l/utils';
import { divs as ozfortressDivs } from './third-party-services/ozfortress/get-ozfortress-user-data';
import {
  url,
  steamId,
  isInArray,
} from '../validators';

/**
 * Create the schema for the avatar urls.
 *
 * @param {String} name - The name of the avatar.
 * @returns {Object} - Returns the validation object.
 */
function avatarSchema(name) {
  return {
    type: String,
    validate: url({}),
    required: [false, `${name} Avatar is required!`],
  };
}

/**
 * Create the schema for the etf2l divisions.
 *
 * @param {String} gamemode - The gamemodes name.
 * @returns {Object} - Returns the validation object.
 */
function etf2lDivSchema(gamemode) {
  return {
    type: String,
    validate: isInArray(etf2lDivs, {
      msg: `{VALUE} is not a valid etf2l ${gamemode} division`,
      nullIsAllowed: true,
    }),
    default: null,
  };
}

const allowedVolumes = new Array(10)
  .fill(1)
  .map((value, index) => (index + 1) / 10);

export default new Schema({
  id: {
    type: String,
    validate: steamId({}),
    required: [true, 'SteamId on the user object is required!'],
    index: true,
  },

  services: {
    steam: {
      tf2Hours: {
        type: Number,
        min: 0,
        default: null,
      },

      isInBetaGroup: {
        type: Boolean,
        default: false,
      },

      avatar: {
        small: avatarSchema('Small'),
        medium: avatarSchema('Medium'),
        large: avatarSchema('Large'),
      },

      vacBanned: {
        type: Boolean,
        default: false,
      },

      customUrl: {
        type: String,
        validate: {
          validator(value) {
            return /[\w-\d_]+/.test(value);
          },
          message: '{VALUE} is not a valid customUrl',
        },
        default: null,
      },

      isInGroup: {
        type: Boolean,
        default: false,
      },
    },

    etf2l: {
      id: Number,
      username: String,
      banned: {
        type: Boolean,
        default: false,
      },
      banExpiry: {
        type: Date,
        default: null,
      },
      div6v6: etf2lDivSchema('6v6'),
      div9v9: etf2lDivSchema('9v9'),
    },

    ozfortress: {
      id: Number,
      name: String,
      div6v6: {
        type: String,
        validate: isInArray(ozfortressDivs, {
          msg: '{VALUE} is not a valid ozfortress division',
          nullIsAllowed: true,
        }),
        default: null,
      },
    },
  },

  friends: {
    type: [String],
    validate: {
      validator(friends) {
        return friends.every(friend => new SteamID(friend).isValid());
      },
      msg: 'friends contains a not valid Steam ID!',
    },
    default: [],
  },

  settings: {
    region: {
      type: String,
      validate: {
        validator(region) {
          return Object.keys(regions).includes(region) || region === null;
        },
        msg: '{VALUE} is not a valid region!',
      },
      default: null,
    },

    volume: {
      type: Number,
      validate: {
        validator(volume) {
          return allowedVolumes.includes(volume);
        },
        msg: '{VALUE} is not a valid volume',
      },
      default: 0.7,
    },
  },

  name: {
    type: String,
    default: null,
    unique: true,
    trim: true,
  },

  lastUpdate: {
    type: Date,
    default: Date.now,
  },

  online: {
    type: Boolean,
    default: true,
  },

  lastOnline: {
    type: Date,
    default: Date.now,
  },

  hasAcceptedTheRules: {
    type: Boolean,
    default: false,
  },

  createdOn: Date,
});
