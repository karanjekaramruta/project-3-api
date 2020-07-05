const express = require("express");
const app = express();
const Request = require("../../models/request");
var bodyParser = require("body-parser");

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.post("/request/add", (req, res, next) => {
  debugger
  const {
    bookId,
    requestedTo,
    requestedFrom,
    fromDate,
    toDate,
    status,
    comments
  } = req.body;


  let request = new Request({
    bookId,
    requestedTo,
    requestedFrom,
    fromDate,
    toDate,
    status,
    comments
  });

  //const userId = req.session.currentUser._id;

  Request.create(request)
    .then((request) => {
        res.status(200).json({requestId:request._id})
    })
    .catch((err) => {
      console.log("error while creating a request", err);
      next(err);
    });
});

module.exports = app;
