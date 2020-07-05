const express = require("express");
const app = express();
const Request = require("../../models/request");
const User = require("../../models/user");
const Book = require("../../models/book");
var bodyParser = require("body-parser");

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

//get all requests for a given user
app.get("/request/all", (req, res, next) => {

  debugger
  const currentUserEmail = req.session.currentUser.email;

  Request.find({requestedTo:currentUserEmail})
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
