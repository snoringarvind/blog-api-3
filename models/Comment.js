const mongoose = require("mongoose");
const connection = require("../config/database");

const CommentSchema = mongoose.Schema({
  comment: { type: String, required: true },
  commenter: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const CommentModel = connection.model("Comment", CommentSchema);

module.exports = CommentModel;
