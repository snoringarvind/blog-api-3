const User = require("../models/User");
const { body, validationResult } = require("express-validator");

exports.signup_post = [
  body("admin").escape(),
  body("fname", "fname cannot be empty").trim().isLength({ min: 1 }).escape(),
  body("lname", "lname cannot be empty").trim().isLength({ min: 1 }).escape(),
  body("email", "email cannot be empty").trim().isLength({ min: 1 }).escape(),
  body("username", "username cannot be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("password", "password cannot be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  (req, res, next) => {
    const errors = validationResult(req);

    const user = new User({
      admin: req.body.admin,
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    });

    if (!errors.isEmpty()) {
      return res.json({ errors });
    } else {
      user.save((err) => {
        if (err) {
          return res.json(err);
        } else {
          return res.redirect("/blogs");
        }
      });
    }
  },
];
