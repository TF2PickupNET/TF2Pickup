import mongoose from 'mongoose';

import regions from '@config/regions';
import gamemodes from '@config/gamemodes';
import oneOf from '@server/utils/validators/one-of';
import pickupStates from '@config/pickup-states';
import PickupQueue from '@typings/PickupQueue';
import maps from '@config/maps';

export default mongoose.model('PickupQueue', new mongoose.Schema({
  id: {
    type: String,
    validate(this: PickupQueue, id: string) {
      const [region, gamemode] = id.split('-');

      return region === this.region && gamemode === this.gamemode;
    },
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
    required: true,
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
