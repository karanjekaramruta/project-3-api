const express = require("express");
const app = express();
const Request = require("../../models/request");
var bodyParser = require("body-parser");

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);


//get list of rented books for a given user
app.get("/comments/all", (req, res, next) => {
  debugger

  Request.findById(req.query.requestId)
    .then((request) => {
        res.json({comments:request.comments});
    })
    .catch((err) => {
      res.status(500).json({errorMessage:err});
    });
});


module.exports = app;
