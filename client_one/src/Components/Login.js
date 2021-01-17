import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import uniqid from "uniqid";
import LoadingOverlay from "./LoadingOverlay";

const Login = () => {
  const [state, setState] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
    // console.log(state);
  };

  useEffect(() => {
    <LoadingOverlay />;
  }, [!loading]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/blogs/login",
        state
      );
      const JWTdata = JSON.stringify(response.data);
      localStorage.setItem("JWTdata", JWTdata);
      setLoading(false);
      setErrors([]);
    } catch (err) {
      setErrors(err.response.data);
    }
  };

  const displayError = () => {
    const errArray = [];
    if (!Array.isArray(errors)) {
      setErrors([errors]);
    } else {
      if (errors.length === 0) {
        return null;
      } else {
        for (let i = 0; i < errors.length; i++) {
          errArray.push(<li key={uniqid()}>{errors[i].msg}</li>);
        }
        return <ul>{errArray}</ul>;
      }
    }
  };

  return (
    <div className="Login">
      <h1 className="head">Login Page</h1>
      <form>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            placeholder="Enter username"
            name="username"
            onChange={(e) => changeHandler(e)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="text"
            id="password"
            placeholder="Enter Password"
            name="password"
            onChange={(e) => changeHandler(e)}
          />
        </div>
        <div className="errors">{displayError()}</div>
        <button className="submit-btn" type="submit" onClick={submitHandler}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
