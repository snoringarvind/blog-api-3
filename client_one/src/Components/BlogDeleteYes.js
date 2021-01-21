import React, { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import LoadingOverlay from "./LoadingOverlay";
import { UpdateCreateContext } from "./UpdateCreateContext";

const BlogDeleteYes = ({ props }) => {
  const url = `http://localhost:3000/api/blog/${props.match.params.id}`;
  const method = "DELETE";

  const [redirect, setRedirect] = useState(false);
  const { cb, responseFromPostValue, responseFromGetValue } = useContext(
    UpdateCreateContext
  );
  const [responseFromGet, setResponseFromGet] = responseFromGetValue;
  const [responseFromPost, setResponseFromPost] = responseFromPostValue;

  useEffect(() => {
    console.log(responseFromPost);
    console.log(responseFromGet);
    // setResponseFromGet(null);
    cb.submitForm(url, method);
  }, []);

  useEffect(() => {
    if (responseFromPost != null) {
      setRedirect(true);
    }
  }, [responseFromPost]);

  // console.log(redirect);
  return (
    <>
      {!redirect && <LoadingOverlay />}
      {redirect && <Redirect to="/api/blogs" />}
    </>
  );
};

export default BlogDeleteYes;
