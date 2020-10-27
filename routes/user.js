const express = require('express');
const router = express.Router();
const auth = require('../models/auth.js');
const user = require('../models/user.js');

router.get('/:id',
    function(req, res, next) {
        auth.verify(req, res, next)
    },
    function(req, res, next) {
        user.getOne(res, req.params.id)
});

module.exports = router;
