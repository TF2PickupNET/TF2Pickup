// @flow

import mongoose from 'mongoose';

export default mongoose.model('Message', new mongoose.Schema({
  userId: {
    type: String,
    ref: 'User',
  },
  chatId: {
    type: String,
    ref: 'Chat',
  },
  message: String,

  createdOn: {
    type: Date,
    default: Date,
  },
}));
