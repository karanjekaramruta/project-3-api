const express = require("express");
const app = express();
const Request = require("../../models/request");
var bodyParser = require("body-parser");

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);


app.get("/request/sent", (req, res, next) => {

  debugger
  const currentUserId = req.session.currentUser._id;

  Request.find({requestedFrom:currentUserId})
      .populate('bookId requestedFrom')
      .then((requests) => {
          res.status(200).json({requests})
        })          
      .catch((err) => {
          console.log("error while reading requests for a given user", err);
          next(err);
      });
});

module.exports = app;