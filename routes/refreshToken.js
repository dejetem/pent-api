const express = require('express');
const router = express.Router();
const refreshTokenCtrl = require('../controller/refreshToken');

router.post('/refresh', refreshTokenCtrl.handleRefreshToken);

module.exports = router;