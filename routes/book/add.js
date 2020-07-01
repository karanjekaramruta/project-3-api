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
  const {
    title,
    subtitle,
    authors,
    bookId,
    description,
    publishedDate,
    pageCount,
    averageRating,
    categories,
    imageLinks,
    language,
  } = req.body.volumeInfo;

  let book = new Book({
    title,
    subtitle,
    authors,
    bookId,
    description,
    publishedDate,
    pageCount,
    averageRating,
    categories,
    imageLinks,
    language,
  });

  //const userId = req.session.currentUser;

  Book.create(book)
    .then((savedBook) => {
      User.findByIdAndUpdate(
        {
          _id: "5efcaa0363f16a8a34bc7ec2",
        },
        {
          $push: {
            listOfOwnedBooks: savedBook,
          },
        }
      )
        .then((user) => {
          res.status(200).json({ book: savedBook });
        })
        .catch((err) => {
          res
            .status(500)
            .json({errorMessage: "error in associating book with user"});
        });
    })
    .catch((err) => {
      res.status(500).json({ errorMessage: "Error in adding a book" });
    });
});

module.exports = app;
