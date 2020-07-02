const express = require("express");
const app = express();
const Book = require("../../models/book");
const User = require("../../models/user");
var bodyParser = require("body-parser");

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);


//get list of owned books for a given user
app.get("/book/ownedBooks", (req, res, next) => {
  debugger

  const userId = req.session.currentUser._id;

  User.findById(userId,'listOfOwnedBooks')
    .then((listOfOwnedBooks) => {
        res.json(listOfOwnedBooks);
    })
    .catch((err) => {
      res.status(500).json({errorMessage:err});
    });
});

//get list of all owned books
app.get("/book/allOwnedBooks", (req,res,nex) => {
    debugger
    User.find({},'listOfOwnedBooks')
      .then((response)=>{
        let listOfBooks = response.map(res=>res._doc.listOfOwnedBooks);
        console.log(listOfBooks);
        res.json(listOfBooks)
      })
      .catch((err)=>{
        res.status(500).json({errorMessage:err})
      })
})

module.exports = app;
