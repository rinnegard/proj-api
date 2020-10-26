const bcrypt = require('bcryptjs');
require('dotenv').config()
const mongo = require('mongodb').MongoClient;

const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;


mongo.connect('mongodb://localhost:27017', function(error, client){
    if(error){
        throw error;
    }
});

const auth = {
    register: function(res, email, password) {
        if (!email || !password) {
            return res.status(401).json({
                errors: {
                    status: 401,
                    source: "/register",
                    title: "Email or password missing",
                    detail: "Email or password missing in request"
                }
            });
        }

        bcrypt.hash(password, 10, function(err, hash) {
            if (err) {
                return res.status(500).json({
                    errors: {
                        status: 500,
                        source: "/register",
                        title: "bcrypt error",
                        detail: "bcrypt error"
                    }
                });
            }

            db.run("INSERT INTO users (email, password) VALUES (?, ?)",
                email,
                hash, (err) => {
                    if (err) {
                        return res.status(500).json({
                            errors: {
                                status: 500,
                                source: "/register",
                                title: "Database error",
                                detail: err.message
                            }
                        });
                    }

                    return res.status(201).json({
                        data: {
                            message: "User successfully registered."
                        }
                    });
                });
        });
    },

    login: function(res, email, password) {
        if (!email || !password) {
            return res.status(401).json({
                errors: {
                    status: 401,
                    source: "/login",
                    title: "Email or password missing",
                    detail: "Email or password missing in request"
                }
            });
        }

        db.get("SELECT * FROM users WHERE email IS (?)",
            email, (err, rows) => {
                if (err) {
                    return res.status(500).json({
                        errors: {
                            status: 500,
                            source: "/login",
                            title: "Database error",
                            detail: err.message
                        }
                    });
                }

                if (rows === undefined) {
                    return res.status(401).json({
                        errors: {
                            status: 401,
                            source: "/login",
                            title: "User not found",
                            detail: "User with provided email not found."
                        }
                    });
                }

                bcrypt.compare(password, rows.password, function(err, result) {
                    console.log(result);
                    if (err) {
                        return res.status(500).json({
                            errors: {
                                status: 500,
                                source: "/login",
                                title: "bcrypt error",
                                detail: "bcrypt error"
                            }
                        });
                    }

                    if (result) {
                        const payload = { email: email };
                        const token = jwt.sign(payload, secret, { expiresIn: '24h'});
                        return res.json({
                            data: {
                                type: "success",
                                message: "User logged in",
                                user: payload,
                                token: token
                            }
                        });
                    }

                    return res.status(401).json({
                        errors: {
                            status: 401,
                            source: "/login",
                            title: "Wrong password",
                            detail: "Password is incorrect."
                        }
                    });
                })
            });
    },

    verify: function(req, res, next) {
        const token = req.headers['authorization'].split(" ")[1];

        jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
            if (err) {
                return res.status(500).json({
                    errors: {
                        status: 500,
                        title: "Wrong token",
                        detail: "Token is incorrect."
                    }
                });
            }

            next();
        });
    }
}

module.exports = auth;
