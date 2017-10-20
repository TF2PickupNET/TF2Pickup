import { Schema } from 'mongoose';

import { isInArray } from '../validators';

export default new Schema({
  id: Number,

  status: {
    type: String,
    validate: isInArray([
      'setting-up-server',
      'waiting-for-game-to-start',
      'game-is-live',
      'game-finished',
      'server-configuration-error',
    ], {}),
    required: true,
  },

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

  serverId: {
    type: Number,
    required: true,
  },

  logSecret: {
    type: String,
    required: true,
  },

  teams: {
    type: Object,

    red: { type: Object },

    blu: { type: Object },
  },

  mumbleChannel: { type: String },
});
