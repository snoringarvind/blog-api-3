import React, { useContext } from "react";
import uniqid from "uniqid";
import { UpdateCreateContext } from "./UpdateCreateContext";

const BlogDisplayComments = ({
  comment,
  tempComment,
  setTempComment,
  index,
  props,
}) => {
  const { cb } = useContext(UpdateCreateContext);

  const dlt_btn_handler = () => {
    const url = `http://localhost:3000/api/blog/${props.match.params.id}/comment/${comment._id}`;
    const method = "DELETE";
    cb.submitForm(url, method);
    tempComment[index] = "";
    setTempComment(tempComment);
    console.log(comment.id);
  };
  return (
    <>
      {comment && (
        <div>
          <div className="user-name">{comment.user.name}</div>
          <div className="comment">{comment.comment}</div>
          <div className="dlt-comment-btn">
            <button onClick={dlt_btn_handler}>Delete</button>
          </div>
        </div>
      )}
    </>
  );
};

export default BlogDisplayComments;
