const express = require("express");
const app = express();
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

  User.findById(userId)
    .populate('listOfOwnedBooks')
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
    User.find({})
      .populate('listOfOwnedBooks')
      .then((response)=>{

        let responseData = response.map((res)=>{
          return {
            listOfBooks:res._doc.listOfOwnedBooks,
            email:res._doc.email,
            firstname:res._doc.firstname,
            lastname:res._doc.lastname,
            postalCode:res._doc.postalCode
          }
        });

        let bookListWithUserDetails = responseData.map((responseDataItem)=>{
  
          let mappedList = responseDataItem.listOfBooks.map((item)=>{
            return {
              book:item,
              email:responseDataItem.email,
              firstname:responseDataItem.firstname,
              lastname:responseDataItem.lastname,
              postalCode:responseDataItem.postalCode
            }
          })

          return mappedList
        })

        res.json(bookListWithUserDetails)
      })
      .catch((err)=>{
        res.status(500).json({errorMessage:err})
      })
})

module.exports = app;
