import React from "react";
import uniqid from "uniqid";

const BlogComments = ({ props, tempComment, setTempComment }) => {
  const display_Comments = () => {
    let arr = [];

    for (let i = 0; i < tempComment.length; i++) {
      let x = (
        <div key={uniqid()}>
          <div className="user-name">{tempComment[i].user.name}</div>
          <div className="comment">{tempComment[i].comment}</div>
          <div className="dlt-comment-btn">Delete</div>
        </div>
      );
      arr.push(x);
    }
    return arr;
  };

  return <div className="BlogComment">{display_Comments()}</div>;
};

export default BlogComments;
