import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import BlogForm from "./BlogForm";
import BlogCreate from "./BlogCreate";
import BlogUpdate from "./BlogUpdate";
import { Redirect } from "react-router-dom";

export const UpdateCreateContext = createContext();

export const UpdateCreateProvider = ({ children }) => {
  const [state, setState] = useState({ title: "", content: "" });
  const [errors, setErrors] = useState([]);
  const [loading_btn, setLoading_btn] = useState(false);
  const [responseFromPost, setResponseFromPost] = useState(null);
  const [responseFromGet, setResponseFromGet] = useState(null);
  const [jwtData, setJwtData] = useState("");
  const [commentState, setCommentState] = useState({ comment: "" });
  const [comment_get, setComment_get] = useState([]);
  const [comment_post, setComment_post] = useState(null);
  const [commentErrors, setCommentErrors] = useState([]);

  const ifJwtData = () => {
    const jwtData = JSON.parse(localStorage.getItem("jwtData"));
    setJwtData(jwtData);
    return jwtData;
  };

  const submitForm = async (url, method) => {
    // console.log(x);
    const jwtData = ifJwtData();
    // ifJwtData();
    if (jwtData) {
      const headers = {
        authorization: `Bearer ${jwtData.jwt.token}`,
      };

      // console.log(jwtData);
      // console.log(state);
      // console.log(url);
      // console.log(method);
      // console.log(headers);
      try {
        const response = await axios({
          method: method,
          url: url,
          data: state,
          headers: headers,
        });
        // console.log(response);
        setLoading_btn(false);
        setErrors([]);
        setResponseFromPost(response.data);
      } catch (err) {
        console.log("error=", err);
        setLoading_btn(false);
        setResponseFromPost(false); //setting response false so we can know that the user is not authenticated
        if (err.response) {
          setErrors(err.response.data);
        } else {
          setErrors(err.message);
        }
      }
    } else {
      setLoading_btn(false);
      setResponseFromPost(false);
    }
  };

  //not hard coding get blog GET because it is used for blo_list and blog_detail
  const get_blog = async (url, method) => {
    // console.log();
    try {
      const response = await axios({ method: method, url: url });
      // console.log(response);
      setResponseFromGet(response.data);
    } catch (err) {
      console.log("err=", err.message);
      setErrors(err.message);
      setResponseFromGet(false);
    }
  };

  const get_comments = async (props) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/blog/${props.match.params.id}/comment`
      );
      // console.log(response);
      setComment_get(response.data);
      setCommentErrors([]);
    } catch (err) {
      setCommentErrors(err.message);
    }
  };

  const post_comment = async (props) => {
    const jwtData = ifJwtData();
    console.log(jwtData);
    if (jwtData) {
      const headers = { authorization: `Bearer ${jwtData.jwt.token}` };
      try {
        const response = await axios({
          method: "POST",
          url: `http://localhost:3000/api/blog/${props.match.params.id}/comment`,
          data: commentState,
          headers: headers,
        });
        console.log(response);

        setCommentErrors([]);
        setComment_post(response.data);
        console.log(comment_post);
      } catch (err) {
        setCommentErrors(err.response.data);
        setComment_post(false); //setting comment false so we can know that the user is not authenticated
      }
    } else {
      setComment_post(false);
    }
  };

  return (
    <UpdateCreateContext.Provider
      value={{
        stateValue: [state, setState],
        errorsValue: [errors, setErrors],
        loading_btnValue: [loading_btn, setLoading_btn],
        responseFromPostValue: [responseFromPost, setResponseFromPost],
        responseFromGetValue: [responseFromGet, setResponseFromGet],
        jwtDataValue: [jwtData, setJwtData],
        cb: {
          submitForm: submitForm,
          get_blog: get_blog,
          get_comments: get_comments,
          post_comment: post_comment,
        },
        commentStateValue: [commentState, setCommentState],
        comment_getValue: [comment_get, setComment_get],
        comment_postValue: [comment_post, setComment_post],
        commentErrorsValue: [commentErrors, setCommentErrors],
      }}
    >
      {children}
    </UpdateCreateContext.Provider>
  );
};
