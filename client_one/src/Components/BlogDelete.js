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

  const [responseFromGet, setResponseFromGet] = responseFromGetValue;
  const [responseFromPost, setResponseFromPost] = responseFromPostValue;

  const [cancelState, setCancelState] = useState(false);
  const [deleteState, setDeletestate] = useState(false);
  const [tempDelete, setTempDelete] = useState(null);
  const [didmount, setDidMount] = useState(false);

  useEffect(() => {
    get_blog();
    setResponseFromPost(null);
    setDidMount(true);
  }, []);

  const get_blog = () => {
    const url = `http://localhost:3000/api/blog/${props.match.params.id}`;
    const method = "GET";
    cb.get_blog(url, method);
  };

  useEffect(() => {
    if (responseFromGet != null) {
      setTempDelete(responseFromGet);
    }
  }, [responseFromGet]);

  useEffect(() => {
    if (tempDelete != null) {
      setResponseFromGet(null);
    }
  }, [tempDelete]);

  // console.log(tempDelete);

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
        {!tempDelete && <LoadingOverlay />}
        {tempDelete && (
          <>
            <div>Are you sure you want to delete this blog</div>
            <div>{tempDelete.title}</div>
            <div>{tempDelete.content}</div>
            <div>
              <button className="delete-btn" onClick={deleteHandler}>
                Yes
              </button>
              {deleteState && <BlogDeleteYes props={props} />}
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
