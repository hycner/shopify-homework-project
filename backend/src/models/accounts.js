// @flow
import mongoose from 'mongoose';

import db from '../lib/mongoClient';

let accountSchema = mongoose.Schema({
  name: String,
  shopifyKey: {type: String, default: ''},
  oauthSecret: {type: String, default: ''},
  created: {type: Date, default: Date.now},
  updated: {type: Date, default: Date.now},
});

export default db.model('accounts', accountSchema);
