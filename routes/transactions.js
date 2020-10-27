const express = require('express');
const router = express.Router();
const auth = require('../models/auth.js');
const transactions = require('../models/transactions.js');

// router.get('/prod/:id', function(req, res, next) {
//     console.log(req.params.id);
// });
//
// router.get('/', function(req, res, next) {
//     reports.getAll(res);
// });
//
// router.post('/sell',
//     function(req, res, next) {
//         auth.verify(req, res, next)
//     },
//     function(req, res, next) {
//         console.log(req.body);
// });

router.post('/update',
    // function(req, res, next) {
    //     auth.verify(req, res, next)
    // },
    function(req, res, next) {
        console.log(req.body);
        transactions.updateMoney(res, req.body.email, req.body.money)
});

module.exports = router;
