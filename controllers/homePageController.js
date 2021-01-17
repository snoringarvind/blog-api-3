const Blog = require("../models/Blog");

exports.blog_list = (req, res, next) => {
  Blog.find({}, (err, result) => {
    console.log();
    if (err) return res.status(500).json({ msg: err.message });
    if (result.length == 0) return res.status(200).json({ msg: "no blogs" });
    else {
      return res.status(200).json(result);
    }
  });
};
