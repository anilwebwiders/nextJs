import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notifyError } from "../../../../store/notify/action";
import { postData } from "../../../../utils/api-client";

const ArticleCommentsForm = ({article_id, getComments, scroll}) => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [comment, setComment] = useState({ commentTxt: "" });
  const { commentTxt } = comment;
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setComment({ ...comment, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!commentTxt) return dispatch(notifyError("Comment can not be empty."));
    if (commentTxt.length >= 500) return dispatch(notifyError("Comment can not be more than 500."));

    const post = { message: commentTxt, article_id, user_id: auth.user.user_id };
    const res = await postData(`articleApi/comment/main`, post, auth.token);
    if (res.err) dispatch(notifyError(res.err));
    getComments()
    setComment({ commentTxt: "" })
    if (res.success) scroll()
  };

  return (
    <div className="article-comments-write mt-5">
      <h3>Comments</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          className="form-control"
          name="commentTxt"
          placeholder="Write here...."
          value={comment.commentTxt}
          onChange={handleChangeInput}
        />

        <div className="comment-post">
          <button
            className="btn btn-warning text-white mt-3 pl-5 pr-5 pt-3 pb-3"
            type="submit"
          >
            Post
          </button>

          <span>{commentTxt.length}/500</span>
        </div>
      </form>
    </div>
  );
};

export default ArticleCommentsForm;
