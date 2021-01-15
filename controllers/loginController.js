const { body, validationResult, Result } = require("express-validator");
const User = require("../models/User");
const utils = require("../libs/utils");

exports.login_get = (req, res, next) => {
  res.json({ msg: "not implemented login form" });
};

exports.protected_route = [
  utils.verifyJWT,
  (req, res, next) => {
    if (res.locals.isAuthenticated) {
      return res.status(200).json(res.locals.user);
    } else {
      return res.status(403);
    }
  },
];

exports.login_post = [
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
    if (!errors.isEmpty()) {
      return res.json(errors);
    } else {
      User.findOne({ username: req.body.username }, (err, result) => {
        if (err) return res.json({ msg: err });
        if (result == null) {
          return res.json({ msg: "no such user with that username" });
        }
        if (result.password != req.body.password) {
          return res.json({ msg: "wrong password" });
        } else {
          const JWTresponse = utils.issueJWT(result);
          return res.json(JWTresponse);
        }
      });
    }
  },
];
