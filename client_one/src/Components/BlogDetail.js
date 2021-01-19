import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import LoadingOverlay from "./LoadingOverlay";
import { Link, Redirect } from "react-router-dom";
import { UpdateCreateContext } from "./UpdateCreateContext";
import LoadingOverlayComments from "./LoadingOverlayComments";
import BlogCommentForm from "./BlogCommentForm";
import BlogComments from "./BlogComments";

const BlogDetail = ({ props }) => {
  const { responseFromGetValue, cb } = useContext(UpdateCreateContext);
  const [responseFromGet] = responseFromGetValue;

  useEffect(() => {
    get_blog();
  }, []);

  const get_blog = () => {
    cb.get_blog(props);
  };

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
            <BlogComments props={props} />
          </>
        </>
      )}
    </div>
  );
};

export default BlogDetail;
