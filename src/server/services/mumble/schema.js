import { Schema } from 'mongoose';

export default new Schema({
  id: Number,

  pickupId: Number,

  launchedOn: {
    type: Date,
    default: Date.now,
  },

  teams: {
    type: Object,

    red: { type: Object },

    blu: { type: Object },
  },
});
