// @flow
import mongoose from 'mongoose';

import env from './env';

let user = encodeURIComponent(env.MONGODB_USER);
let pass = encodeURIComponent(env.MONGODB_PASS);

let path = `mongodb://${user}:${pass}@${env.MONGODB_URL}:${env.MONGODB_PORT}/${env.MONGODB_DATABASE}?ssl=true&authSource=admin`;
let db = mongoose.createConnection(path, {
  useMongoClient: true,
});

export default db;
