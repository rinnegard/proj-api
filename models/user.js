const mongo = require('mongodb').MongoClient;

const user = {
    getOne: function(res, email, money) {
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
            users.findOne({
                email: email,
            }).toArray(function(err, doc) {
                doc = doc[0];
                console.log(doc);
                if (err) {
                    return res.status(500).json({
                        errors: {
                            status: 500,
                            source: "/user",
                            title: "Database error",
                            detail: err.message
                        }
                    });
                }

                return res.status(201).json({
                    data: {
                        doc
                    }
                });
            })
        });
    }
}

module.exports = user;
