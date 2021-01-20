import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import uniqid from "uniqid";
import { Redirect } from "react-router-dom";
import Login from "./Login";
import BlogForm from "./BlogForm";
import { UpdateCreateContext } from "./UpdateCreateContext";

const BlogCreate = () => {
  const { stateValue } = useContext(UpdateCreateContext);

  const [state, setState] = stateValue;

  useEffect(() => {
    setState({ title: "", content: "" });
  }, []);

  const url = "http://localhost:3000/api/blogs";
  const method = "POST";

  return (
    <div className="BlogCreate">
      <BlogForm title={"Create Blog"} url={url} method={method} />
    </div>
  );
};

export default BlogCreate;
