// @flow

import mongoose from 'mongoose';

import {
  gamemodes,
  regions,
} from '../../../config';
import { oneOf } from '../../utils/validators';
import pickupStatus from '../../../config/pickup-status';

export default mongoose.model('PickupQueue', new mongoose.Schema({
  id: {
    type: String,
    required: true,
    validate: [
      (id) => {
        const match = id.match(/(\w+)-(\w+)/);

        return match
          && Object.keys(regions).includes(match[1])
          && Object.keys(gamemodes).includes(match[2]);
      },
    ],
  },

  status: {
    type: String,
    required: true,
    validate: [
      status => Object.keys(pickupStatus).includes(status),
    ],
  },

  region: {
    type: String,
    required: true,
    validate: oneOf(Object.keys(regions), {}),
  },

  gamemode: {
    type: String,
    required: true,
    validate: oneOf(Object.keys(gamemodes), {}),
  },

  readyUpEnd: { type: Date },

  players: {
    type: [mongoose.Types.ObjectId],
    ref: 'pickupPlayers',
  },
}));