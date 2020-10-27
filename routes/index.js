const express = require('express');
const auth = require('../models/auth.js');
const router = express.Router();

router.get('/', function(req, res, next) {
    let routes = {
        "GET /": "Welcome",
        "POST /login": "login",
        "POST /register": "register"
    }
    res.json(routes);
});

module.exports = router;
