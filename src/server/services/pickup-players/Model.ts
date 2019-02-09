import mongoose from 'mongoose';
import oneOf from '@server/utils/validators/one-of';
import maps from '@config/maps';
import steamId from '@server/utils/validators/steam-id';
import classes from '@config/classes';

export default mongoose.model('PickupPlayer', new mongoose.Schema({
  id: { type: mongoose.Types.ObjectId },

  userId: {
    type: String,
    validate: steamId({}),
    required: true,
  },

  map: {
    type: String,
    validate: oneOf(Object.keys(maps), {}),
    required: true,
  },

  isReady: {
    type: Boolean,
    required: true,
  },

  isSubbed: {
    type: Boolean,
    required: false,
  },

  pickupId: {
    type: Number,
    required: true,
  },

  queueId: {
    type: String,
    required: true,
  },

  class: {
    type: String,
    validate: oneOf(Object.keys(classes), {}),
    required: true,
  },

  joinedOn: {
    type: Number,
    required: true,
  },
}));
