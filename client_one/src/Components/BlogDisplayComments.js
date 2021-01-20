import { set } from "mongoose";
import React, { useEffect, useState } from "react";
// import { comment_get } from "../../../controllers/guestController";
import uniqid from "uniqid";

const BlogDisplayComments = ({
  comment,
  cb,
  props,
  index,
  setComment_get,
  comments,
}) => {
  // console.log(temp.user);

  const deleteCommentHandler = (e) => {
    // e.preventDefault();
    const url = `http://localhost:3000/api/blog/${props.match.params.id}/comment/${comment._id}`;
    const method = "DELETE";
    cb.submitForm(url, method);
    comments[index] = "";
    setComment_get(comments);
    console.log(comments);
  };

  return (
    <>
      {comment.user !== undefined && (
        <>
          <div className="comment-detail">
            <div className="comment-detail-user">{comment.user.username}</div>
            <div className="comment-detail-comment">{comment.comment}</div>

            <button type="submit" onClick={deleteCommentHandler}>
              Delete
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default BlogDisplayComments;
