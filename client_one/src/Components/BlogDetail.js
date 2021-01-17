import axios from "axios";
import React, { useEffect, useState } from "react";
import LoadingOverlay from "./LoadingOverlay";

const BlogDetail = ({ props }) => {
  console.log(props);
  const [blogDetail, setBlogDetail] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("hihih");
    axios_blogDetail();
  }, []);

  const axios_blogDetail = async () => {
    console.log("memememme");
    const response = await axios.get(
      `http://localhost:3000/api/blog/${props.match.params.id}`
    );
    setLoading(false);
    setBlogDetail(response.data);
    console.log(blogDetail);
  };

  return (
    <div className="BlogDetail">
      {loading && <LoadingOverlay />}
      <div className="card">
        <div className="card-title">{blogDetail.title}</div>
        <div className="card-content">{blogDetail.content}</div>
      </div>
    </div>
  );
};

export default BlogDetail;
