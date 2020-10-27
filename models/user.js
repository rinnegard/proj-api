const mongo = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;

const user = {
    getOne: function(res, id) {
        console.log(id);
        if (!id) {
            return res.status(401).json({
                errors: {
                    status: 401,
                    source: "/insert",
                    title: "Id missing",
                    detail: "Id missing in request"
                }
            });
        }

        mongo.connect('mongodb://localhost:27017', function(error, client){
            if(error){
                throw error;
            }
            let db = client.db('proj');
            let users = db.collection('users');
            let o_id = new ObjectId(id)
            users.findOne({
                _id: o_id,
            },{
                projection: { password: 0}
            }, function(err, doc) {
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
                    doc
                });
            })
        });
    }
}

module.exports = user;
