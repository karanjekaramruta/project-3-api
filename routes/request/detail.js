const express = require("express");
const app = express();
const Request = require("../../models/request");
var bodyParser = require("body-parser");

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

//get all requests for a given user
app.get("/request/detail", (req, res, next) => {

  debugger
  const requestId = req.query.requestId;

  Request.findById(requestId)
      .populate('bookId requestedFrom')
      .then((request) => {
          res.status(200).json({request})
        })          
      .catch((err) => {
          console.log("error while reading requests for a given user", err);
          next(err);
      });
});



module.exports = app;
