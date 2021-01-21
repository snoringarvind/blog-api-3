import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { UpdateCreateContext } from "./UpdateCreateContext";
import BlogForm from "./BlogForm";

const BlogUpdate = ({ props }) => {
  const { stateValue, errorsValue, cb, responseFromGetValue } = useContext(
    UpdateCreateContext
  );
  const [state, setState] = stateValue;
  const [errors, setErrors] = errorsValue;
  const [didComponentMount, setDidComponenetMount] = useState(false);
  const [responseFromGet, setResponseFromGet] = responseFromGetValue;

  console.log(responseFromGet);

  const [loadUpdateForm, setLoadUpdateForm] = useState(true);

  useEffect(() => {
    axios_blogUpdateGet();
    setDidComponenetMount(true);
  }, []);

  const axios_blogUpdateGet = async () => {
    const url = `http://localhost:3000/api/blog/${props.match.params.id}`;
    const method = "GET";

    cb.get_blog(url, method);
  };

  useEffect(() => {
    if (didComponentMount) {
      setLoadUpdateForm(false);
      setState(responseFromGet);
    }
  }, [responseFromGet]);

  const url = `http://localhost:3000/api/blog/${props.match.params.id}`;
  const method = "PUT";
  return (
    <div>
      <BlogForm
        loadUpdateForm={loadUpdateForm}
        title={"Update Blog"}
        url={url}
        method={method}
      />
    </div>
  );
};

export default BlogUpdate;
