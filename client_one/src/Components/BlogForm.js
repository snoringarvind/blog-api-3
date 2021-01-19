import React, { useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import uniqid from "uniqid";
import { UpdateCreateContext } from "./UpdateCreateContext";
import LoadingOverlay from "./LoadingOverlay";

const BlogForm = ({ loadUpdateForm, title, url, method }) => {
  const {
    stateValue,
    errorsValue,
    loading_btnValue,
    responseFromPostValue,
    cb,
  } = useContext(UpdateCreateContext);

  const [state, setState] = stateValue;
  const [errors, setErrors] = errorsValue;
  const [loading_btn, setLoading_btn] = loading_btnValue;
  const [responseFromPost, setResponseFromPost] = responseFromPostValue;

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
    // console.log(state);
  };

  const submitForm = () => {
    cb.submitForm(url, method);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading_btn(true);
    submitForm();
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
  console.log(responseFromPost);
  return (
    <div className="BlogForm">
      {loadUpdateForm && <LoadingOverlay />}
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
          {loading_btn ? "Submitting" : title}
        </button>
      </form>
      {responseFromPost && (
        <Redirect to={`/api/blog/${responseFromPost._id}`} />
      )}
    </div>
  );
};

export default BlogForm;
