import mongoose from 'mongoose';

import announcers from '../../../config/announcers';
import emojiSets from '../../../config/emoji-sets';
import oneOf from '../../utils/validators/one-of';
import steamId from '../../utils/validators/steam-id';

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
  },

  volume: {
    type: Number,
    min: 0,
    max: 100,
  },

  emojiSet: {
    type: String,
    validate: oneOf(Object.keys(emojiSets), {}),
  },
}));

