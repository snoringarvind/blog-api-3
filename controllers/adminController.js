const Blog = require("../models/Blog");
const { body, validationResult } = require("express-validator");

exports.blog_create_post = [
  body("title", "title cannot be empty").trim().isLength({ min: 1 }).escape(),
  body("content", "content cannot be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  (req, res, next) => {
    const errors = validationResult(req);

    const blog = new Blog({
      title: req.body.title,
      content: req.body.content,
    });

    if (!errors.isEmpty()) {
      console.log(errors.array());
      res.status(404).json({ errors: errors.array(), blog });
    } else {
      blog.save((err) => {
        console.log(blog.url);
        if (err) return res.status(500).json(err);
        console.log("blog_url", blog.url);
        res.json(blog);
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

    console.log("blog", blog);
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
