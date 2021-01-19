import React, { useEffect, useContext } from "react";
import { UpdateCreateContext } from "./UpdateCreateContext";

const BlogComments = ({ props }) => {
  const { cb, comment_getValue } = useContext(UpdateCreateContext);

  const [comment_get, setComment_get] = comment_getValue;
  useEffect(() => {
    get_comments();
  }, []);

  const get_comments = () => {
    cb.get_comments(props);
  };

  const display_comments = () => {
    let arr = [];

    for (let i = 0; i < comment_get.length; i++) {
      arr.push(
        <div className="comment-detail" key={comment_get[i]._id}>
          <div className="comment-detail-user">
            {comment_get[i].user.username}
          </div>
          <div className="comment-detail-comment">{comment_get[i].comment}</div>
        </div>
      );
    }
    return arr;
  };
  return (
    <div className="BlogComments">
      <>
        {comment_get.length > 0 && (
          <div className="comments">{display_comments()}</div>
        )}
      </>
    </div>
  );
};

export default BlogComments;
