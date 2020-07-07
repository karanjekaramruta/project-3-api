const express = require("express");
const app = express();
const User = require("../../models/user");
const bcrypt = require("bcrypt");

app.post("/login", (req, res, next) => {
  if (req.body.email === "" || req.body.password === "") {
    res.status(403).json({
      errorMessage: "Please enter both, username and email to log in.",
    });
    return;
  }

  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        res.status(403).json({
          errorMessage: "The user does not exist.",
        });
        return;
      }

      bcrypt.compare(req.body.password, user.password, function (err, match) {
        if (match) {
          req.session.currentUser = user;
          res.json(user);
        } else {
          res.status(401).json({
            errorMessage: "Incorrect credentials.",
          });
        }
      });
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = app;
