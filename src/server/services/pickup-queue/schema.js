import { Schema } from 'mongoose';

export default new Schema({
  region: {},

  gamemode: {},

  maps: {
    type: Array,
    required: true,
  },

  readyUp: {
    type: Date,
    default: null,
  },

  classes: { type: Object },
});
