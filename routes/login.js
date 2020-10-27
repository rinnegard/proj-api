const express = require('express');
const auth = require('../models/auth.js');
const router = express.Router();

router.get('/', function(req, res, next) {
    auth.login(res, req.body.email, req.body.password);
});

module.exports = router;
