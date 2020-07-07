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
app.get("/book/rentedBooks", (req, res, next) => {
  debugger

  //const currentUserEmail = req.session.currentUser.email;

  Request.find({$and:[{status:{$eq:"Accepted"}},{requestedTo:{$eq:'ankita@gmail.com'}}]},'bookId')
    .populate('bookId')
    .then((listOfRentedBooks) => {
        res.json(listOfRentedBooks);
    })
    .catch((err) => {
      res.status(500).json({errorMessage:err});
    });
});


module.exports = app;
