/* eslint-disable @next/next/no-img-element */
import moment from "moment";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notifyError, notifySuccess } from "../../../store/notify/action";
import { deleteData } from "../../../utils/api-client";
import Preloader from "../../Preloader/Preloader";
import ArticlesReplyComment from "./ArticlesReplyComment";

const ArticlesComment = ({ comment, auth, getComments, status }) => {
  const {
    article_comment_id,
    article_id,
    avatar,
    created_at,
    message,
    user_id,
    username,
  } = comment;
  const dispatch = useDispatch();
  const [load, setLoad] = useState(null);
  const deleteComment = async (id) => {
    setLoad(id);
    const data = await deleteData(
      `articleApi/comment/main?article_comment_id=${id}`,
      auth.token
    );
    setLoad(null);
    if (data.success == false) return dispatch(notifyError(data.message));
    getComments();
    if (data.success) return dispatch(notifySuccess(data.message));
  };
  return (
    <div className="article-comments-reply">
      <div className="image-holder">
        <img
          src={avatar}
          alt="avatar"
          className="img-fluid user_image_rounded"
        />
      </div>
      <div className="text-box">
        <a href={"/user/" + user_id + "/" + username}>
          <h3>{username}</h3>
        </a>
        <div className="reply-box">
          <h4>{message.replace(/\/+/g, "'")}</h4>
          <span>{moment(created_at.split("T")[0]).format("MM/DD/YY")}</span> 
        </div>

        <ul>
          <span>
            <li>
              {load === article_comment_id ? (
                <a>Deleting</a>
              ) : (
                <a onClick={() => deleteComment(article_comment_id)}>Delete</a>
              )}
            </li>
          </span>
        </ul>
        <ArticlesReplyComment
          article_comment_id={article_comment_id}
          status={status}
        />
      </div>
    </div>
  );
};

export default ArticlesComment;
