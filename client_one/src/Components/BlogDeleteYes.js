import React, { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import LoadingOverlay from "./LoadingOverlay";
import { UpdateCreateContext } from "./UpdateCreateContext";

const BlogDeleteYes = ({ props }) => {
  const url = `http://localhost:3000/api/blog/${props.match.params.id}`;
  const method = "DELETE";

  const [redirect, setRedirect] = useState(false);
  const { cb, responseFromPostValue } = useContext(UpdateCreateContext);
  // const [responseFromGet, setResponseFromGet] = responseFromGetValue;
  const [responseFromPost, setResponseFromPost] = responseFromPostValue;

  useEffect(() => {
    // console.log(responseFromPost);
    cb.submitForm(url, method);
  }, []);

  useEffect(() => {
    if (responseFromPost != null) {
      setRedirect(true);
    }
  }, [responseFromPost]);

  console.log(redirect);
  return <div>{redirect && <Redirect to="/api/blogs" />}</div>;
};

export default BlogDeleteYes;
