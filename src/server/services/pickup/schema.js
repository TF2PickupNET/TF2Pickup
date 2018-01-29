import { Schema } from 'mongoose';
import gamemodes from '@tf2-pickup/configs/gamemodes';
import regions from '@tf2-pickup/configs/regions';

import { isInArray } from '../validators';

export default new Schema({
  id: {
    type: Number,
    index: true,
    unique: true,
  },

  status: {
    type: String,
    validate: isInArray([
      'setting-up-server',
      'waiting-for-game-to-start',
      'game-is-live',
      'game-finished',
      'server-configuration-error',
      'server-reservation-error',
    ], {}),
    required: true,
    default: 'setting-up-server',
  },

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
    type: Number,
    default: null,
  },

  demosTFUrl: {
    type: String,
    default: null,
  },

  scores: {
    type: Object,
    default: {
      red: 0,
      blu: 0,
    },

    red: {
      type: Number,
      default: 0,
    },

    blu: {
      type: Number,
      default: 0,
    },
  },

  serverId: Number,

  logSecret: String,

  teams: {
    type: Object,

    red: { type: Object },

    blu: { type: Object },
  },
});
