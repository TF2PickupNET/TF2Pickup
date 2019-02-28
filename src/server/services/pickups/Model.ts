import mongoose from 'mongoose';

export default mongoose.model('Pickup', new mongoose.Schema({
  id: { type: Number },
}));
