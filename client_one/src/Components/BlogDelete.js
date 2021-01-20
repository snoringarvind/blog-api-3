import React, { useContext, useEffect, useState } from "react";
import { UpdateCreateContext } from "./UpdateCreateContext";
import LoadingOverlay from "./LoadingOverlay";
import { Redirect } from "react-router-dom";
// import { use } from "../../../routes/blogs";
import BlogDeleteYes from "./BlogDeleteYes";

const BlogDelete = ({ props }) => {
  const { responseFromPostValue, responseFromGetValue, cb } = useContext(
    UpdateCreateContext
  );

  // const [responseFromPost, setResponseFromPost] = responseFromPostValue;

  const [responseFromGet] = responseFromGetValue;

  const [cancelState, setCancelState] = useState(false);
  const [deleteState, setDeletestate] = useState(false);

  useEffect(() => {
    get_blog();
  }, []);

  const get_blog = () => {
    const url = `http://localhost:3000/api/blog/${props.match.params.id}`;
    const method = "GET";
    cb.get_blog(url, method);
  };

  const deleteHandler = (e) => {
    // e.preventDefault();
    setDeletestate(true);
  };

  const cancelDelete = (e) => {
    setCancelState(true);
  };

  return (
    <div className="BlogDelete">
      <>
        {!responseFromGet && <LoadingOverlay />}
        {responseFromGet && (
          <>
            <div>Are you sure you want to delete this blog</div>
            <div>{responseFromGet.title}</div>
            <div>{responseFromGet.content}</div>
            <div>
              <button className="delete-btn" onClick={deleteHandler}>
                {deleteState ? <BlogDeleteYes cb={cb} props={props} /> : "Yes"}
              </button>
              <button className="cancel-btn" onClick={cancelDelete}>
                {cancelState ? <Redirect to="/api/blogs" /> : "No"}
              </button>
            </div>
          </>
        )}
      </>
    </div>
  );
};

export default BlogDelete;
