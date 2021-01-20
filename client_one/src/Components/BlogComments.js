import React, { useEffect, useContext, useState } from "react";
import { UpdateCreateContext } from "./UpdateCreateContext";
import BlogDisplayComments from "./BlogDisplayComments";
// import { comment_get } from "../../../controllers/guestController";
import uniqid from "uniqid";

const BlogComments = ({ props }) => {
  const { cb, comment_getValue } = useContext(UpdateCreateContext);

  const [comment_get, setComment_get] = comment_getValue;

  useEffect(() => {
    get_comments();
  }, []);

  const get_comments = () => {
    cb.get_comments(props);
  };
  console.log(comment_get);

  return (
    <div className="BlogComments">
      {comment_get != null && (
        <>
          {comment_get.map((value, index) => {
            return (
              <BlogDisplayComments
                comment={value}
                key={uniqid()}
                cb={cb}
                index={index}
                props={props}
                comments={comment_get}
                setComment_get={setComment_get}
              />
            );
          })}
        </>
      )}
    </div>
  );
};

export default BlogComments;
