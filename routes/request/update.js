const express = require("express");
const app = express();
const Request = require("../../models/request");


app.post("/request/update", (req, res, next) => {
  debugger

  let requestId = req.query.requestId;

  Request
    .findByIdAndUpdate(
      {_id:requestId}, 
      {comments:req.body.comments},
      {new:true}
    )
    .then((request) => {
        res.status(200).json({comments:request.comments})
    })
    .catch((err) => {
      res.status(500).json({errorMessage:"error while updating comments"})
      next(err);
    });
});

module.exports = app;
