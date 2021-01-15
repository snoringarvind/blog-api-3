const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const utils = require("../libs/utils");
const passport = require("passport");

exports.login_get = (req, res, next) => {
  res.json({ msg: "not implemented login form" });
};
exports.protected_route = [
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    console.log(req.cookies, "kkk");
    console.log(req.user);
    return res.json({ msg: "protected route" });
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
          const token = utils.issueJWT(result);
          res.cookie("jwt", token, { maxAge: 24 * 60 * 60 * 1000 });
          return res.json({ token: token });
        }
      });
    }
  },
];
