import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import LoadingOverlay from "./LoadingOverlay";
import uniqid from "uniqid";
import { UpdateCreateContext } from "./UpdateCreateContext";

const Home = () => {
  const [blogList, setBlogList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { cb, responseFromGetValue } = useContext(UpdateCreateContext);
  const [responseFromGet, setResponseFromGet] = responseFromGetValue;
  const [didComponentMount, setDidComponentMount] = useState(false);

  useEffect(() => {
    axios_blogList();
    setDidComponentMount(true);
  }, []);

  const axios_blogList = async () => {
    const url = "http://localhost:3000/api/blogs";
    const method = "GET";
    cb.get_blog(url, method);
  };

  useEffect(() => {
    if (didComponentMount) {
      setLoading(false);
    }
  }, [responseFromGet]);

  const displayBlogs = () => {
    const arr = [];
    let blog;
    if (responseFromGet.length > 0) {
      for (let i = 0; i < responseFromGet.length; i++) {
        blog = (
          <div className="card" key={uniqid()}>
            <Link to={`/api/blog/${responseFromGet[i]._id}`} className="Link">
              <div className="card-title">{responseFromGet[i].title}</div>
              <div className="card-content">{responseFromGet[i].content}</div>
            </Link>
          </div>
        );
        arr.push(blog);
      }
    }
    return arr;
  };
  console.log(responseFromGet);
  return (
    <div className="Home">
      {loading && <LoadingOverlay />}
      {!loading && displayBlogs()}
    </div>
  );
};

export default Home;
