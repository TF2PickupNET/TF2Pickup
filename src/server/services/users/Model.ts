import mongoose from 'mongoose';

import roles from "../../../config/roles";
import steamId from "../../utils/validators/steam-id";
import regions from "../../../config/regions";
import oneOf from "../../utils/validators/one-of";

const roleNames = Object.keys(roles);

export default mongoose.model('User', new mongoose.Schema({
  id: {
    type: String,
    validate: steamId({}),
    required: [true, 'SteamId on the userId object is required!'],
    unique: true,
    index: true,
  },

  name: {
    type: String,
    trim: true,
  },

  region: {
    type: String,
    validate: oneOf(Object.keys(regions), { nullIsAllowed: true }),
  },

  roles: {
    type: [String],
    validate: (value: Array<keyof typeof roles>) => value.every(role => roleNames.includes(role)),
  },

  online: Boolean,
  lastOnline: Date,
  hasAcceptedTheRules: Boolean,
  createdOn: Date,
  lastPickup: Number,
  hasCompletedSignUp: Boolean,
}));
