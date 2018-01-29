import SteamID from 'steamid';
import { Schema } from 'mongoose';
import {
  regions,
  gamemodes,
  announcers,
  roles,
} from '@tf2-pickup/config';
import { flatten } from '@tf2-pickup/utils';

import {
  url,
  steamId,
  isInArray,
} from '../validators';

import { divs as etf2lDivs } from './third-party-services/etf2l/utils';
import { divs as ozfortressDivs } from './third-party-services/ozfortress/get-ozfortress-user-data';

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

const allClasses = flatten(
  Object
    .values(gamemodes)
    .map(gamemode => Object.keys(gamemode.slots)),
);

export default new Schema({
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

  createdOn: {
    type: Date,
    default: Date.now,
  },

  lastPickupId: {
    type: Number,
    default: null,
  },

  services: {
    steam: {
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
    },

    etf2l: {
      id: Number,
      name: String,
      div6v6: etf2lDivSchema('6v6'),
      div9v9: etf2lDivSchema('9v9'),

      isBanned: {
        type: Boolean,
        default: false,
      },
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
      validate: isInArray(Object.keys(regions), {
        nullIsAllowed: true,
        msg: '{VALUE} is not a valid region!',
      }),
      default: null,
    },

    volume: {
      type: Number,
      validate: {
        validator(volume) {
          return volume <= 100 && volume >= 0;
        },
        msg: '{VALUE} is not a valid volume',
      },
      default: 70,
    },

    theme: {
      type: String,
      validate: isInArray(['light', 'dark'], {}),
      default: 'dark',
    },

    announcer: {
      type: String,
      validate: isInArray(Object.keys(announcers), {}),
      default: 'default',
    },
  },

  roles: {
    type: [String],
    validate: {
      validator(userRoles) {
        return userRoles.every(role => roles[role]);
      },
      msg: 'user.roles contains a not valid role',
    },
    default: [],
  },

  boughtAnnouncers: {
    type: [String],
    default: [],
  },

  elos: allClasses.reduce((obj, className) => {
    return {
      ...obj,
      [className]: {
        type: Number,
        default: 1000,
      },
    };
  }, {}),
});
