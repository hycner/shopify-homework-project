// @flow
const {Router} = require('express');

import migrateAccount from './migrateAccount';

const router = Router();

router.post('/', migrateAccount);

module.exports = router;
