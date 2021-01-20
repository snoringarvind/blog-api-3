import React, { useContext, useEffect, useState } from "react";
import { UpdateCreateContext } from "./UpdateCreateContext";
import { Redirect } from "react-router-dom";

const BlogCommentForm = ({ props, tempComment, setTempComment }) => {
  const { commentStateValue, comment_postValue, cb } = useContext(
    UpdateCreateContext
  );

  const [commentState, setCommentState] = commentStateValue;
  const [comment_post, setComment_post] = comment_postValue;

  const [didComponentMount, setDidComponentMount] = useState(false);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setCommentState({ ...commentState, [name]: value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    cb.post_comment(props);
  };

  useEffect(() => {
    console.log(comment_post);
    setDidComponentMount(true);
  }, []);

  const y = () => {
    if (didComponentMount) {
      console.log(comment_post);
      setTempComment([...tempComment, comment_post]);
    }
  };

  useEffect(() => {
    y();
  }, [comment_post]);
  // console.log(tempComment);
  return (
    <div className="BlogCommentForm">
      <form>
        <label htmlFor="comment">Comment:</label>
        <textarea
          id="comment"
          type="text"
          name="comment"
          onChange={(e) => changeHandler(e)}
          value={commentState.comment}
        />
        <button className="comment-btn" onClick={submitHandler}>
          Add Comment
        </button>
      </form>
      {/* {comment_post && <Redirect to={`/api/blog/${props.match.params.id}`} />} */}
    </div>
  );
};

export default BlogCommentForm;
