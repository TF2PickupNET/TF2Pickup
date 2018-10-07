// @flow

import mongoose from 'mongoose';

import { oneOf } from '../../utils/validators';
import maps from '../../../config/maps';
import classes from '../../../config/classes';

export default mongoose.model('PickupPlayer', new mongoose.Schema({
  id: mongoose.Types.ObjectId,

  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'user',
  },

  joinedOn: {
    type: Date,
    default: Date.now,
  },

  map: {
    type: String,
    validate: oneOf(Object.keys(maps), {}),
  },

  class: {
    type: String,
    validate: oneOf(Object.keys(classes), {}),
  },
}));
