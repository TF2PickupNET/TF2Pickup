import mongoose from 'mongoose';

export default mongoose.model('Logs', new mongoose.Schema({
  path: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  createdOn: Number,
  data: {},
}));
