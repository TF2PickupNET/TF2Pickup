import mongoose from 'mongoose';
import regions from '@config/regions';
import gamemodes from '@config/gamemodes';
import oneOf from '@server/utils/validators/one-of';
import pickupStates from '@config/queue-states';
import maps from '@config/maps';

export default mongoose.model('Queue', new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },

  state: {
    type: String,
    validate: oneOf(Object.keys(pickupStates), {}),
    required: true,
  },

  region: {
    type: String,
    validate: oneOf(Object.keys(regions), {}),
    required: true,
  },

  gamemode: {
    type: String,
    validate: oneOf(Object.keys(gamemodes), {}),
    required: true,
  },

  readyUpEnd: {
    type: Number,
  },

  maps: {
    type: [String],
    min: 3,
    max: 3,
    validate(val: string[]) {
      return val.every(map => map in maps);
    },
    required: true,
  },
}));
