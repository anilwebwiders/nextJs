/* eslint-disable @next/next/no-img-element */
import moment from "moment";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notifyError, notifySuccess } from "../../../../store/notify/action";
import { deleteData } from "../../../../utils/api-client";
import DeleteModal from "../../../Modal/Delete/DeleteModal";
import Preloader from "../../../Preloader/Preloader";
import ArticleCommentReport from "../ReportArticle/ArticleCommentReport";
import ArticleCommentReplyShow from "./ArticleCommentReplyShow";
import ArticleCommentEdit from "./CommentEdit/ArticleCommentEdit";

const ArticleCommentShow = ({ comment, getComments }) => {
  const {
    article_comment_id,
    article_id,
    avatar,
    created_at,
    message,
    user_id,
    username,
    total_replys,
  } = comment;
  const [showReply, setShowReply] = useState(false);

  const [cmntId, setCmntId] = useState(null);
  const [editData, setEditData] = useState(null);
  const [modal, setModal] = useState(false);
  const toggle = (cmnt) => {
    setModal(!modal);
    setEditData(cmnt);
  };
  const auth = useSelector((state) => state.auth);
  const [modalReport, setModalReport] = useState(false);
  const toggleReport = () => {
    setModalReport(!modalReport);
  };

  //Delete

  const [modalDelete, setModalDelete] = useState(false);
  const [id, setId] = useState(null);
  const [title, setTitle] = useState(null);
  const toggleDelete = (id, data) => {
    setModalDelete(!modalDelete);
    setId(id);
    setTitle(data);
  };

  return (
    <>
      <DeleteModal
        toggleDelete={toggleDelete}
        modalDelete={modalDelete}
        auth={auth}
        title={title}
        type={"comment"}
        url={`articleApi/comment/main?article_comment_id=${id}`}
        redirect={getComments}
      />
      <div className="article-comments-reply">
        
        <div className="text-box">

          <div className="comment-profile">
          <div className="image-holder">
          <img
            src={avatar}
            alt="avatar"
            className={`img-fluid user_image_rounded`}
          />
        </div>
        <a href={"/user/" + user_id + "/" + username}>
             <div><h3>{username}</h3> 
             <span class="follow"><img src="/follow-icon.svg" alt=""/>Follow</span>
             </div>
             <span><small className="date_comment">{moment(created_at.split("T")[0]).format("MM/DD/YY")}</small></span>
          </a>
          </div>
          
          <div className="reply-box">
            {message
              .replace(/\/+/g, "'")
              .split("\n")
              .map((str, index) => (
                <h4 key={index}>{str}</h4>
              ))}
           
          </div>
          <div class={showReply? "d-flex align-items-center justify-content-end mb-3" : "d-flex align-items-center justify-content-between mb-3"}>

           {!showReply && (
            <h4
              style={{ cursor: "pointer" }}
              onClick={() => setShowReply(true)}
              className="text-warning"
            >
              {total_replys > 0 ? `${total_replys} Replies` : ""}
            </h4>
          )}

          {auth.user.user_id && (
            <ul>
              {auth.user.user_id === user_id && (
                <>
                  <span>
                    <li>
                      <a onClick={() => toggle(comment)}>Edit</a>
                    </li>
                  </span>
                  <span>
                    <li>
                      <a
                        onClick={() =>
                          toggleDelete(
                            article_comment_id,
                            message.replace(/\/+/g, "'").substring(0, 20)
                          )
                        }
                      >
                        Delete
                      </a>
                    </li>
                  </span>
                </>
              )}
              <span>
                <li>
                  <a onClick={() => setCmntId(article_comment_id)}>Reply</a>
                </li>
              </span>
              {auth.user.user_id !== user_id && (
                <span>
                  <li>
                    <a onClick={toggleReport}>Report</a>
                  </li>
                </span>
              )}
            </ul>
          )}
          </div>
          <ArticleCommentReport
            comment={comment}
            toggle={toggleReport}
            modal={modalReport}
          />
          {editData && (
            <ArticleCommentEdit
              toggle={toggle}
              modal={modal}
              editData={editData}
              article_comment_id={article_comment_id}
              getComments={getComments}
            />
          )}
         

          <ArticleCommentReplyShow
            article_comment_id={article_comment_id}
            setCmntId={setCmntId}
            cmntId={cmntId}
            article_id={article_id}
            showReply={showReply}
            setShowReply={setShowReply}
          />
        </div>
      </div>
    </>
  );
};

export default ArticleCommentShow;
