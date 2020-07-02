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

app.post("/book/add", (req, res, next) => {
  debugger
  const {
    title,
    subtitle,
    authors,
    description,
    publishedDate,
    pageCount,
    averageRating,
    categories,
    imageLinks,
    language
  } = req.body.book.volumeInfo;

  let price=req.body.price;
  let qty=req.body.qty;
  let bookId = req.body.book.id;

  let book = new Book({
    title,
    subtitle,
    authors,
    bookId:bookId,
    description,
    publishedDate,
    pageCount,
    averageRating,
    categories,
    imageLinks,
    language,
    price:price,
    qty:qty
  });

  const userId = req.session.currentUser._id;

  Book.create(book)
    .then((savedBook) => {
      User.findByIdAndUpdate(
        {
          _id: userId,
        },
        {
          $push: {
            listOfOwnedBooks: savedBook,
          },
        }
      ).then((user) => {
        res.status(200).json({bookId:savedBook._id});
      });
    })
    .catch((err) => {
      console.log("error while saving a goal", err);
      next(err);
    });
});

module.exports = app;
