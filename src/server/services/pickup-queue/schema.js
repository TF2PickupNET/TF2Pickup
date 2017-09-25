import { Schema } from 'mongoose';

export default new Schema({
  id: String,

  region: {},

  gamemode: {},

  maps: { type: Array },

  readyUp: {
    type: Date,
    default: null,
  },

  classes: { type: Object },
});
