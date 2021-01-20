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

  // console.log(props);

  const [responseFromGet, setResponseFromGet] = responseFromGetValue;
  const [tempComment, setTempComment] = useState([]);
  const [comment_get, setComment_get] = comment_getValue;
  const [currentLink, setCurrentLink] = useState("");
  const [componenetMount, setComponentMount] = useState(false);

  useEffect(() => {
    //use aysnc parallel here later
    get_blog();
    setResponseFromGet(null);
  }, []);

  useEffect(() => {
    get_comments();
  }, []);

  const get_comments = () => {
    cb.get_comments(props);
  };

  const get_blog = () => {
    const url = `http://localhost:3000/api/blog/${props.match.params.id}`;
    const method = "GET";
    cb.get_blog(url, method);
    setting_responseFromGet();
  };

  const setting_responseFromGet = () => {
    if (responseFromGet !== null) {
      console.log(responseFromGet.length);
      setComponentMount(true);
      console.log(componenetMount);
    }
  };

  if (componenetMount) {
    console.log(responseFromGet);
  }
  // console.log(tempComment);
  useEffect(() => {
    setTempComment([...comment_get]);
  }, [comment_get]);

  return (
    <div className="BlogDetail">
      {!componenetMount && <LoadingOverlay />}
      {componenetMount && (
        <>
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
        </>
      )}
    </div>
  );
};

export default BlogDetail;
