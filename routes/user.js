const express = require('express');
const router = express.Router();
const auth = require('../models/auth.js');
const user = require('../models/user.js');

router.get('/',
    function(req, res, next) {
        auth.verify(req, res, next)
    },
    function(req, res, next) {
        console.log(req.body);
        user.getOne(res, req.body.email)
});

module.exports = router;
