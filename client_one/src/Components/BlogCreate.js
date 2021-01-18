import React, { useState } from "react";
import axios from "axios";
import uniqid from "uniqid";
import { Redirect } from "react-router-dom";
import Login from "./Login";
import BlogForm from "./BlogForm";

const BlogCreate = ({ routeInfo }) => {
  console.log(routeInfo);
  const [state, setState] = useState({ title: "", content: "" });
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [BlogCreate, setBlogCreate] = useState("");
  const [isAuth, setIsAuth] = useState(null);

  const axios_blogCreate = async () => {
    const jwtData = JSON.parse(localStorage.getItem("jwtData"));
    console.log(jwtData);

    if (jwtData) {
      const headers = {
        authorization: `Bearer ${jwtData.jwt.token}`,
      };
      try {
        const response = await axios({
          method: routeInfo.method,
          url: routeInfo.url,
          data: state,
          headers: headers,
        });
        setLoading(false);
        setBlogCreate(response);
        setErrors([]);
        setIsAuth(true);
      } catch (err) {
        setLoading(false);
        setIsAuth(false);
        setErrors(err.response.data);
      }
    } else {
      setLoading(false);
      setIsAuth(false);
    }
  };

  return (
    <div className="BlogCreate">
      <BlogForm
        state={state}
        setState={setState}
        loading={loading}
        setLoading={setLoading}
        errors={errors}
        setErrors={setErrors}
        props={{ axios_blogCreate: axios_blogCreate }}
        isAuth={isAuth}
        BlogCreate={BlogCreate}
      />
    </div>
  );
};

export default BlogCreate;
