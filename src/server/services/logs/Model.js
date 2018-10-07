// @flow

import mongoose from 'mongoose';

export default mongoose.model('Logs', new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  path: String,
  message: String,
  createdOn: Date,
  data: {},
}));
