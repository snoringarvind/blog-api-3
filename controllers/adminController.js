const Blog = require("../models/Blog");
const { body, validationResult, Result } = require("express-validator");
const utils = require("../libs/utils");
const User = require("../models/User");

exports.blog_create_post = [
  body("title", "title cannot be empty").trim().isLength({ min: 1 }).escape(),
  body("content", "content cannot be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  (req, res, next) => {
    console.log("okay", req.body);
    const errors = validationResult(req);

    const blog = new Blog({
      title: req.body.title,
      content: req.body.content,
    });

    if (!errors.isEmpty()) {
      console.log(errors.array());
      res.status(400).json(errors.array());
    } else {
      blog.save((err) => {
        console.log(blog.url);
        if (err) return res.status(500).json(err);
        console.log("blog_url", blog.url);
        res.status(200).json(blog);
      });
    }
  },
];

exports.blog_create_get = (req, res, next) => {
  res.json({ msg: "not implemented" });
};

exports.blog_update_get = (req, res, next) => {
  res.json({ msg: "not implemented" });
};

exports.blog_update_put = [
  body("title", "title cannot be empty").trim().isLength({ min: 1 }).escape(),
  body("content", "content cannot be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  (req, res, next) => {
    const blog = new Blog({
      title: req.body.title,
      content: req.body.content,
      _id: req.params.id,
    });

    // console.log("blog", blog);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json(errors, blog);
    } else {
      Blog.findByIdAndUpdate(req.params.id, blog, {}, (err, theblog) => {
        if (err) return res.json(err);
        else {
          return res.json(theblog);
        }
      });
    }
  },
];

exports.blog_delete = (req, res, next) => {
  Blog.findByIdAndRemove(req.params.id, (err, theblog) => {
    if (err) return res.json(err);
    else {
      return res.json(theblog);
    }
  });
};

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
    // console.log("errors", errors);
    if (!errors.isEmpty()) {
      return res.status(401).json(errors.array());
    } else {
      User.findOne({ username: req.body.username }, (err, result) => {
        if (err) return res.status(500).json(err);
        if (result == null) {
          return res
            .status(401)
            .json({ msg: "no such user with that username" });
        }
        if (result.admin) {
          res.locals.plainPassword = req.body.password;
          res.locals.user = result;
          // console.log(res.locals);
          next();
        } else {
          return res
            .status(401)
            .json({ msg: "you are not authorized to see this route" });
        }
      });
    }
  },

  utils.comparePassword,
  (req, res, next) => {
    if (!res.locals.isPassTrue) {
      return res.status(401).json({ msg: "wrong password" });
    } else {
      const jwtResponse = utils.issueJWT(res.locals.user);
      return res.status(200).json({ jwt: jwtResponse });
    }
  },
];

exports.isVerified = (req, res, next) => {
  if (res.locals.isAuthenticated) {
    // console.log("hiiiiiiiiiiiiiiiiiiiiiiiiiiii");
    return res.status(200).json({ msg: { isAuthenticated: true } });
  }
};
