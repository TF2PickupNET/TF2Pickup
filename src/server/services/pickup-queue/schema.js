import { Schema } from 'mongoose';

import statuses from '@tf2-pickup/configs/pickup-status';

import gamemodes from '@tf2-pickup/configs/gamemodes';

import regions from '@tf2-pickup/configs/regions';

import { isInArray } from '../validators';

export default new Schema({
  id: String,

  region: {
    type: String,
    validate: isInArray(Object.keys(regions), {}),
    required: true,
  },

  gamemode: {
    type: String,
    validate: isInArray(Object.keys(gamemodes), {}),
    required: true,
  },

  maps: { type: Array },

  status: {
    type: String,
    validate: isInArray(Object.keys(statuses), {}),
    required: true,
  },

  readyUp: {
    type: Date,
    default: null,
  },

  classes: { type: Object },
});
