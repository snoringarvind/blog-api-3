import React, { useContext, useEffect, useState } from "react";
import { UpdateCreateContext } from "./UpdateCreateContext";
import LoadingOverlay from "./LoadingOverlay";
import { Redirect } from "react-router-dom";
// import { use } from "../../../routes/blogs";

const BlogDelete = ({ props }) => {
  const { responseFromPostValue, responseFromGetValue, cb } = useContext(
    UpdateCreateContext
  );

  // const [responseFromPost, setResponseFromPost] = responseFromPostValue;

  const [responseFromGet] = responseFromGetValue;

  const [cancelState, setCancelState] = useState(false);
  const [deleteState, setDeletestate] = useState(false);

  const url = `http://localhost:3000/api/blog/${props.match.params.id}`;
  const method = "DELETE";

  useEffect(() => {
    get_blog();
  }, []);

  const get_blog = () => {
    cb.get_blog(props);
  };

  const deleteHandler = () => {
    cb.submitForm(url, method);
    setDeletestate(true);
  };

  const cancelDelete = () => {
    setCancelState(true);
  };

  return (
    <div className="BlogDelete">
      {deleteState && <Redirect to="/api/blogs" />}
      {cancelState && <Redirect to="/api/blogs" />}
      {/* Always put this code after delete because after deleing this route this code can't render and will result in an error */}
      {!deleteState && (
        <>
          {!responseFromGet && <LoadingOverlay />}
          {responseFromGet && (
            <>
              <div>Are you sure you want to delete this blog</div>
              <div>{responseFromGet.title}</div>
              <div>{responseFromGet.content}</div>
              <div>
                <button className="delete-btn" onClick={deleteHandler}>
                  {deleteState ? "Deleting" : "Yes"}
                </button>
                <button className="cancel-btn" onClick={cancelDelete}>
                  {cancelState ? "Cancelling Delete" : "No"}
                </button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default BlogDelete;
