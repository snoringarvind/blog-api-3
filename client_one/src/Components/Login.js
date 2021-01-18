import axios from "axios";
import React from "react";
import { useState } from "react";
import uniqid from "uniqid";

const Login = () => {
  const [state, setState] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/blogs/admin-login",
        state
      );
      const jwtData = JSON.stringify(response.data);
      localStorage.setItem("jwtData", jwtData);
      setLoading(true);
      setErrors([]);
    } catch (err) {
      setLoading(false);
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
          {loading ? "Loging-in" : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
