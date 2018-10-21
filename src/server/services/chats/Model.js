// @flow

import mongoose from 'mongoose';

export default mongoose.model('Chat', new mongoose.Schema({ id: { type: String } }));
