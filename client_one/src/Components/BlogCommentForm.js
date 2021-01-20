import React, { useContext } from "react";
import { UpdateCreateContext } from "./UpdateCreateContext";
import { Redirect } from "react-router-dom";

const BlogCommentForm = ({ props }) => {
  const { commentStateValue, comment_postValue, cb } = useContext(
    UpdateCreateContext
  );

  const [commentState, setCommentState] = commentStateValue;
  const [comment_post, setComment_post] = comment_postValue;

  const changeHandler = (e) => {
    const { name, value } = e.target;
    // console.log(commentState);
    setCommentState({ ...commentState, [name]: value });
  };

  const submitHandler = () => {
    cb.post_comment(props);
  };

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
      {comment_post && <Redirect to={`/api/blog/${props.match.params.id}`} />}
    </div>
  );
};

export default BlogCommentForm;
