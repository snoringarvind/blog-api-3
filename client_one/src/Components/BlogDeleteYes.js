import React, { useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { UpdateCreateContext } from "./UpdateCreateContext";

const BlogDeleteYes = ({ cb, props }) => {
  const url = `http://localhost:3000/api/blog/${props.match.params.id}`;
  const method = "DELETE";

  const { responseFromGetValue } = useContext(UpdateCreateContext);

  const [responseFromGet, setResponseFromGet] = responseFromGetValue;

  console.log(responseFromGet);

  useEffect(() => {
    setResponseFromGet(null);
    return () => cb.submitForm(url, method);
  }, []);

  return (
    <>
      <Redirect to="/api/blogs" />
    </>
  );
};

export default BlogDeleteYes;
