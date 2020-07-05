const express = require("express");
const app = express();
const Request = require("../../models/request");


app.post("/request/accept", (req, res, next) => {
  debugger

  let requestId = req.query.requestId;
  console.log('requestId', requestId);
  Request
    .findByIdAndUpdate(
      {_id:requestId}, 
      {status:"Accepted"}
    )
    .then((request) => {
        res.status(200).json({successMessage:"accepted"})
    })
    .catch((err) => {
      console.log("error while creating a request", err);
      next(err);
    });
});

module.exports = app;
