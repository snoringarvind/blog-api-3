import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import LoadingOverlay from "./LoadingOverlay";
import { Link, Redirect } from "react-router-dom";
import { UpdateCreateContext } from "./UpdateCreateContext";
import LoadingOverlayComments from "./LoadingOverlayComments";
import BlogCommentForm from "./BlogCommentForm";
import BlogComments from "./BlogComments";

const BlogDetail = ({ props }) => {
  const { responseFromGetValue, comment_getValue, cb } = useContext(
    UpdateCreateContext
  );

  const [responseFromGet] = responseFromGetValue;
  const [tempComment, setTempComment] = useState([]);
  const [comment_get, setComment_get] = comment_getValue;

  useEffect(() => {
    //use aysnc parallel here later
    get_blog_and_comments();
  }, []);

  const get_blog_and_comments = () => {
    cb.get_comments(props);
    cb.get_blog(props);
  };

  useEffect(() => {
    setTempComment([...comment_get]);
  }, [comment_get]);

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
            <BlogCommentForm
              props={props}
              tempComment={tempComment}
              setTempComment={setTempComment}
            />
          </>
          <>
            <BlogComments
              props={props}
              tempComment={tempComment}
              setTempComment={setTempComment}
            />
          </>
        </>
      )}
    </div>
  );
};

export default BlogDetail;
