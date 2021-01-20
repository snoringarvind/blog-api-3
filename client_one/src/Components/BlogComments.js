import React from "react";
import uniqid from "uniqid";
import BlogDisplayComments from "./BlogDisplayComments";

const BlogComments = ({ props, tempComment, setTempComment }) => {
  return (
    <div className="BlogComment">
      {tempComment.map((value, index) => {
        return (
          <BlogDisplayComments
            key={uniqid()}
            comment={value}
            tempComment={tempComment}
            setTempComment={setTempComment}
            index={index}
            props={props}
          />
        );
      })}
    </div>
  );
};

export default BlogComments;
