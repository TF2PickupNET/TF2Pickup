// @flow

import mongoose from 'mongoose';

import { announcers } from '../../../config';
import {
  oneOf,
  steamId,
} from '../../utils/validators';

export default mongoose.model('UserSettings', new mongoose.Schema({
  id: {
    type: String,
    validate: steamId({}),
    required: [true, 'The userId is required'],
    index: true,
    unique: true,
  },

  announcer: {
    type: String,
    validate: oneOf(Object.keys(announcers), {}),
    default: 'default',
  },

  theme: {
    type: String,
    validate: oneOf(['light', 'dark'], { nullIsAllowed: true }),
    default: null,
  },
}));

