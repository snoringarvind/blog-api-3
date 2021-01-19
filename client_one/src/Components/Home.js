import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import LoadingOverlay from "./LoadingOverlay";
import uniqid from "uniqid";

const Home = () => {
  const [blogList, setBlogList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios_blogList();
  }, []);

  const axios_blogList = async () => {
    const response = await axios.get("http://localhost:3000/api/blogs");
    setLoading(false);
    setBlogList(response.data);
  };

  const displayBlogs = () => {
    const arr = [];
    let blog;
    for (let i = 0; i < blogList.length; i++) {
      blog = (
        <div className="card" key={uniqid()}>
          <Link to={`/api/blog/${blogList[i]._id}`} className="Link">
            <div className="card-title">{blogList[i].title}</div>
            <div className="card-content">{blogList[i].content}</div>
          </Link>
        </div>
      );
      arr.push(blog);
    }
    return arr;
  };
  // console.log(blogList);
  return (
    <div className="Home">
      {loading && <LoadingOverlay />}
      {displayBlogs()}
    </div>
  );
};

export default Home;
