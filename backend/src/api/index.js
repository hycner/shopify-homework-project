// @flow
import {Router} from 'express';

import migrateAPI from './migrate';
import oauthAPI from './oauth';

const router = Router();

export default () => {
  router.use('/migrate', migrateAPI);
  router.use('/oauth', oauthAPI);

  return router;
};
