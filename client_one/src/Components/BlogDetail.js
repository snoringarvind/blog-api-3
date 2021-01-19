import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import LoadingOverlay from "./LoadingOverlay";
import { Link, Redirect } from "react-router-dom";
import { UpdateCreateContext } from "./UpdateCreateContext";
import LoadingOverlayComments from "./LoadingOverlayComments";
import BlogCommentForm from "./BlogCommentForm";

const BlogDetail = ({ props }) => {
  const {
    responseFromGetValue,
    cb,
    errorsValue,
    comment_getValue,
  } = useContext(UpdateCreateContext);
  const [responseFromGet] = responseFromGetValue;
  const [comment_get, setComment_get] = comment_getValue;
  // const [errors, setErrors] = errorsValue;

  // const []

  useEffect(() => {
    get_blog();
    get_comments();
  }, []);

  const get_blog = () => {
    cb.get_blog(props);
  };

  const get_comments = () => {
    cb.get_comments(props);
  };

  const display_comments = () => {
    let arr = [];
    for (let i = 0; i < comment_get.length; i++) {
      arr.push(
        <div className="comment-detail" key={comment_get[i]._id}>
          <div className="comment-detail-user">
            {comment_get[i].user.username}
          </div>
          <div className="comment-detail-comment">{comment_get[i].comment}</div>
        </div>
      );
    }
    return arr;
  };

  // console.log(comment_get.length);
  // console.log(responseFromGet);
  // console.log(errors);

  return (
    <div className="BlogDetail">
      {!responseFromGet && <LoadingOverlay />}
      {responseFromGet && (
        <>
          <div className="card">
            <div className="card-title">{responseFromGet.title}</div>
            <div className="card-content">{responseFromGet.content}</div>

            <Link
              className="update-btn"
              to={`/api/blog/${responseFromGet._id}/update`}
            >
              Update
            </Link>
            <Link
              className="delete-btn"
              to={`/api/blog/${responseFromGet._id}/delete`}
            >
              Delete
            </Link>
          </div>
          <>
            <BlogCommentForm props={props} />
          </>
          <>
            {comment_get.length > 0 && (
              <div className="comments">{display_comments()}</div>
            )}
          </>
        </>
      )}
    </div>
  );
};

export default BlogDetail;
