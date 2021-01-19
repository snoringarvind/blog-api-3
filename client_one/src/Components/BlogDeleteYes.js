import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";

const BlogDeleteYes = ({ cb, props }) => {
  const url = `http://localhost:3000/api/blog/${props.match.params.id}`;
  const method = "DELETE";

  useEffect(() => {
    return () => cb.submitForm(url, method);
  }, []);

  return (
    <>
      <Redirect to="/api/blogs" />
    </>
  );
};

export default BlogDeleteYes;
