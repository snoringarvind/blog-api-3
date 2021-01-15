const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const Blog = require("../models/Blog");
const Comment = require("../models/Comment");

//having signup in guest, since the client One is already set
exports.signup_get = (req, res, next) => {
  res.json({ msg: "not implemented" });
};

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
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    });

    if (!errors.isEmpty()) {
      return res.json(errors);
    } else {
      user.save((err) => {
        if (err) {
          return res.json(err);
        } else {
          return res.json(user);
        }
      });
    }
  },
];

exports.blog_detail_get = (req, res, next) => {
  Blog.findById(req.params.id, (err, result) => {
    if (err) return res.json(err);
    if (result == null) return res.status(401).json({ msg: "no blog found" });
    else {
      return res.json(result);
    }
  });
};

exports.comment_create_post = [
  body("comment").trim().isLength({ min: 1 }).escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    const comment = new Comment({
      comment: req.body.comment,
      user: res.locals.user.sub,
    });
    if (!errors.isEmpty()) {
      res.json(errors);
    } else {
      comment.save((err) => {
        if (err) return res.json(err);
        return res.json(comment);
      });
    }
  },
];
