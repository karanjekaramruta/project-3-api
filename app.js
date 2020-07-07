require("dotenv").config();
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

//db setup
require("./configs/db.config");

//create app using express
var app = express();

//cors
app.use(cors({
    origin: true,
    credentials: true
}))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Session
require('./configs/session.config')(app);

app.use((req, res, next) => {
    if (req.session.currentUser) {
      res.locals.loggedIn = true;
      res.locals.user = req.session.currentUser;
    }
    next();
});


//all routes
app.use("/", require("./routes/auth/signup"));
app.use("/", require("./routes/auth/login"));
app.use("/", require("./routes/auth/logout"));
app.use("/", require("./routes/book/add"));
app.use("/", require("./routes/book/ownedBooks"));
app.use("/", require("./routes/book/rentedBooks"));
app.use("/", require("./routes/request/add"));
app.use("/", require("./routes/request/received"));
app.use("/", require("./routes/request/sent"));
app.use("/", require("./routes/request/accept"));
app.use("/", require("./routes/request/reject"));
app.use("/", require("./routes/request/detail"));
app.use("/", require("./routes/request/update"));

module.exports = app;
