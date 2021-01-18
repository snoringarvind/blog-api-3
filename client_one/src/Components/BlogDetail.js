import axios from "axios";
import React, { useEffect, useState } from "react";
import LoadingOverlay from "./LoadingOverlay";
import { Link } from "react-router-dom";

const BlogDetail = ({ props }) => {
  console.log(props);
  const [blogDetail, setBlogDetail] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("hihih");
    axios_blogDetail();
  }, []);

  const axios_blogDetail = async () => {
    const response = await axios.get(
      `http://localhost:3000/api/blog/${props.match.params.id}`
    );
    setLoading(false);
    setBlogDetail(response.data);
  };

  return (
    <div className="BlogDetail">
      {loading && <LoadingOverlay />}
      <Link to={`/api/blog/${blogDetail._id}/update`}>
        <div className="update-btn">Update</div>
      </Link>
      <div className="card">
        <div className="card-title">{blogDetail.title}</div>
        <div className="card-content">{blogDetail.content}</div>
      </div>
    </div>
  );
};

export default BlogDetail;
