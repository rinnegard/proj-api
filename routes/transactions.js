const express = require('express');
const router = express.Router();
const auth = require('../models/auth.js');
const transactions = require('../models/transactions.js');

router.post('/updateMoney',
    function(req, res, next) {
        auth.verify(req, res, next)
    },
    function(req, res, next) {
        console.log(req.body);
        transactions.updateMoney(res, req.body.email, req.body.money)
});

router.post('/updateItem',
    function(req, res, next) {
        auth.verify(req, res, next)
    },
    function(req, res, next) {
        console.log(req.body);
        transactions.updateItem(res, req.body.email, req.body.item, req.body.amount)
});

module.exports = router;
