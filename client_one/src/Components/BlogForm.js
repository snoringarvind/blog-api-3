import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import uniqid from "uniqid";

const BlogForm = ({
  state,
  setState,
  loading,
  setLoading,
  errors,
  setErrors,
  props,
  isAuth,
  BlogCreate,
}) => {
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
    console.log(state);
  };

  const axios_blogCreate = () => {
    props.axios_blogCreate();
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    axios_blogCreate();
    console.log(isAuth);
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

  return (
    <div className="BlogForm">
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
        <button
          className="submit-btn"
          type="submit"
          onClick={(e) => submitHandler(e)}
        >
          {loading ? "Submitting" : "Create Blog"}
        </button>
      </form>
      {isAuth && <Redirect to={`/api/blog/${BlogCreate.data._id}`} />}
    </div>
  );
};

export default BlogForm;
