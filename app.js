const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');

const app = express();
const port = 3001;

const http = require('http').createServer(app);
const io = require('socket.io')(http);

io.origins('https://proj.rinnegard.me:443');

const register = require('./routes/register');
const login = require('./routes/login');
const transactions = require('./routes/transactions');
const user = require('./routes/user');


const stock = require('./models/stock');

const corsOptions = {
  exposedHeaders: 'Authorization',
};

app.use(cors(corsOptions));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use((req, res, next) => {
    console.log(req.method);
    console.log(req.path);
    next();
});


app.use('/', transactions);
app.use('/user', user);
app.use('/login', login);
app.use('/register', register);


// Catch 404 and forward to error handler
app.use((req, res, next) => {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    res.status(err.status || 500).json({
        "errors": [
            {
                "status": err.status,
                "title":  err.message,
                "detail": err.message
            }
        ]
    });
});

let gold = {
    name: "gold",
    rate: 1.0003,
    variance: 0.5,
    start: 60
}


let silver = {
    name: "silver",
    rate: 1.0004,
    variance: 0.6,
    start: 40
}

io.on('connection', function(socket) {
    console.log('User connected');
    socket.on('disconnect', function() {
        console.log('User disconnected');
    });
});

setInterval(function () {
    silver.start = stock.getStockPrice(silver);

    let point = {
        price: silver.start,
        time: Date.now()
    }

    io.emit("silver", point);
}, 5000);

setInterval(function () {
    gold.start = stock.getStockPrice(gold)

    let point = {
        price: gold.start,
        time: Date.now()
    }

    io.emit("gold", point);
}, 4000);

// Start up server
http.listen(port, () => console.log(`Example API listening on port ${port}!`));
