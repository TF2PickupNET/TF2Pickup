// @flow

import mongoose from 'mongoose';

import {
  announcers,
  emojiSets,
} from '../../../config';
import {
  oneOf,
  steamId,
} from '../../utils/validators';
import { defaultSet } from '../../../config/emoji-sets';

export default mongoose.model('UserSettings', new mongoose.Schema({
  id: {
    type: String,
    validate: steamId({}),
    required: [true, 'The userId is required'],
    unique: true,
    ref: 'User',
  },

  announcer: {
    type: String,
    validate: oneOf(Object.keys(announcers), {}),
    default: 'default',
  },

  volume: {
    type: Number,
    default: 70,
    min: 0,
    max: 100,
  },

  emojiSet: {
    type: String,
    validate: oneOf(Object.keys(emojiSets), {}),
    default: defaultSet,
  },
}));

