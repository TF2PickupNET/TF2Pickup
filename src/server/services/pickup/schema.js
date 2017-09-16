import { Schema } from 'mongoose';

export default new Schema({
  id: Number,

  region: {},

  gamemode: {},

  map: {
    type: String,
    required: true,
  },

  launchedOn: {
    type: Date,
    default: Date.now,
  },

  startedOn: {
    type: Date,
    default: null,
  },

  endedOn: {
    type: Date,
    default: null,
  },

  logsTFID: {
    type: String,
    default: null,
  },

  demosTFUrl: {
    type: String,
    default: null,
  },

  score: {
    type: Object,

    red: {
      type: Number,
      default: 0,
    },

    blu: {
      type: Number,
      default: 0,
    },
  },

  teams: {
    type: Object,

    red: { type: Object },

    blu: { type: Object },
  },
});
