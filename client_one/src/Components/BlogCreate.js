import React, { useState } from "react";
import axios from "axios";
import uniqid from "uniqid";
import { Redirect } from "react-router-dom";
import Login from "./Login";

const BlogCreate = () => {
  const [state, setState] = useState({ title: "", content: "" });
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [BlogCreate, setBlogCreate] = useState("");

  const axios_blogCreate = async () => {
    const jwtData = JSON.parse(localStorage.getItem("jwtData"));

    if (jwtData) {
      const headers = {
        authorization: `Bearer ${jwtData.jwt.token}`,
      };
      try {
        const response = await axios.post(
          "http://localhost:3000/api/blogs",
          state,
          { headers: headers }
        );
        setLoading(false);
        setBlogCreate(response);
        setErrors([]);
        setIsSubmit(true);
      } catch (err) {
        setLoading(false);
        setErrors(err.response.data);
      }
    } else {
      return <Login />;
    }
  };

  const displayError = () => {
    let arr = [];

    if (!Array.isArray(errors)) {
      setErrors([errors]);
    }
    if (errors.length !== 0) {
      for (let i = 0; i < errors.length; i++) {
        arr.push(<li key={uniqid()}>{errors[i].msg}</li>);
      }
      return <ul>{arr}</ul>;
    } else {
      return null;
    }
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    axios_blogCreate();
  };
  return (
    <div className="BlogCreate">
      <form>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            placeholder="Enter title"
            id="title"
            name="title"
            value={state.title}
            onChange={(e) => changeHandler(e)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            placeholder="Enter content"
            name="content"
            onChange={(e) => changeHandler(e)}
            value={state.content}
          />
        </div>
        <div className="error">{displayError()}</div>
        <button className="submit-btn" type="submit" onClick={submitHandler}>
          {loading ? "Submitting" : "Create Blog"}
        </button>
      </form>
      {isSubmit && <Redirect to={`/api/blog/${BlogCreate.data._id}`} />}
    </div>
  );
};

export default BlogCreate;
