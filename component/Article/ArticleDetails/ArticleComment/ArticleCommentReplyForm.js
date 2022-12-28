import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notifyError, notifySuccess } from "../../../../store/notify/action";
import { postData } from "../../../../utils/api-client";
const ArticleCommentReplyForm = ({
  setCmntId,
  cmntId,
  article_id,
  getR_Comments,
  setShowReply
}) => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [comment, setComment] = useState({ replyComment: "" });
  const { replyComment } = comment;
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setComment({ ...comment, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!replyComment) return dispatch(notifyError("Reply can not be empty."));
    if (replyComment.length >= 500) return dispatch(notifyError("Reply can not be more than 500."));

    const post = {
      article_comment_id: cmntId,
      replyComment,
      article_id: article_id,
      user_id: auth.user.user_id,
    };

    const res = await postData(`articleApi/comment/reply`, post, auth.token);
    if (res.err) dispatch(notifyError(res.err));
    setCmntId(null);
    getR_Comments();
    setShowReply(true)
    setComment({ replyComment: "" })
  };

  return (
    <div className="mt-5 ml-5">
      <form onSubmit={handleSubmit}>
        <textarea
          className="form-control"
          name="replyComment"
          onChange={handleChangeInput}
          value={comment.replyComment}
          placeholder="Write here...."
        />
        <div className="d-flex justify-content-between p-2">
          <span>{replyComment.length}/500</span>
        </div>
        <div className="comment-post">
          <button className="btn btn-warning text-white " type="submit">
            Reply
          </button>
          <button
            className="btn btn-warning text-white ml-3"
            type="submit"
            onClick={() => setCmntId(null)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ArticleCommentReplyForm;
