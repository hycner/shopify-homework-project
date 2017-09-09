// @flow
import mongoose from 'mongoose';

import db from '../lib/mongoClient';

let productSchema = mongoose.Schema({
  id: String,
});

export default db.model('Product', productSchema);
