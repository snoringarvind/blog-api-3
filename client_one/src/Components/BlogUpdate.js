import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { UpdateCreateContext } from "./UpdateCreateContext";
import BlogForm from "./BlogForm";

const BlogUpdate = ({ props }) => {
  const { stateValue, errorsValue } = useContext(UpdateCreateContext);
  const [state, setState] = stateValue;
  const [errors, setErrors] = errorsValue;

  console.log("jiiiiiiiiiiiiiiiiiiiiiiii");

  const [loadUpdateForm, setLoadUpdateForm] = useState(true);

  const url = `http://localhost:3000/api/blog/${props.match.params.id}`;
  const method = "PUT";

  useEffect(() => {
    axios_blogUpdateGet();
  }, []);

  const axios_blogUpdateGet = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/blog/${props.match.params.id}`
      );
      setLoadUpdateForm(false);
      setState(response.data);
      console.log("updajdjsd", response);
      // setBlogUpdateGet(response);
      console.log(state);
    } catch (err) {
      setLoadUpdateForm(false);
      console.log(err.message);
      setErrors(err.message);
    }
  };
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
