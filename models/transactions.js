const mongo = require('mongodb').MongoClient;

const transactions = {
    updateMoney: function(res, email, money) {
        console.log(email);
        console.log(money);
        money = Number(money)

        if (!email || !money) {
            return res.status(401).json({
                errors: {
                    status: 401,
                    source: "/insert",
                    title: "Email or money amount missing",
                    detail: "Email or money amount missing in request"
                }
            });
        }

        mongo.connect('mongodb://localhost:27017', function(error, client){
            if(error){
                throw error;
            }
            let db = client.db('proj');
            let users = db.collection('users');
            users.update({
                email: email,
            },
            {
                $inc: {
                    money: money
                }
            }, function(err) {
                if (err) {
                    return res.status(500).json({
                        errors: {
                            status: 500,
                            source: "/insert",
                            title: "Database error",
                            detail: err.message
                        }
                    });
                }

                return res.status(201).json({
                    data: {
                        message: "Money added to user"
                    }
                });
            })
        });
    },
    updateItem: function(res, email, item, amount) {
        console.log(email);
        console.log(item);
        console.log(amount);
        amount = Number(amount)

        if (!email || !item || !amount) {
            return res.status(401).json({
                errors: {
                    status: 401,
                    source: "/insert",
                    title: "Email, item or amount missing",
                    detail: "Email, item or amount missing in request"
                }
            });
        }

        let update = {};
        update[item] = amount


        mongo.connect('mongodb://localhost:27017', function(error, client){
            if(error){
                throw error;
            }
            let db = client.db('proj');
            let users = db.collection('users');
            users.update({
                email: email,
            },
            {
                $inc: update
            }, function(err) {
                if (err) {
                    return res.status(500).json({
                        errors: {
                            status: 500,
                            source: "/buy",
                            title: "Database error",
                            detail: err.message
                        }
                    });
                }

                return res.status(201).json({
                    data: {
                        message: "Item added to user"
                    }
                });
            })
        });
    },
}

module.exports = transactions;
