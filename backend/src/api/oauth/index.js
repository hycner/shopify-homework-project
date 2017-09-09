// @flow
const {Router} = require('express');

import processReturn from './processReturn';

const router = Router();

router.get('/', processReturn);

module.exports = router;
