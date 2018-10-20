// @flow

import mongoose from 'mongoose';

export default mongoose.model('Message', new mongoose.Schema({
  id: { type: String },
}));
