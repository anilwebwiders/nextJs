/* eslint-disable @next/next/no-img-element */
import moment from "moment";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notifyError, notifySuccess } from "../../../../store/notify/action";
import { deleteData } from "../../../../utils/api-client";
import DeleteModal from "../../../Modal/Delete/DeleteModal";
import StoryCommentReport from "../ReportStory/StoryCommentReport";
import StoryCommentEdit from "./EditComents/StoryCommentEdit";
import StroryCommentReplyShow from "./StroryCommentReplyShow";

const StoryCommentShow = ({ comment, getComments }) => {
  const {
    created_at,
    full_name,
    message,
    story_comment_id,
    story_id,
    user_id,
    username,
    avatar,
    total_replies,
  } = comment;

  const [showReply, setShowReply] = useState(false);

  const auth = useSelector((state) => state.auth);
  const [cmntId, setCmntId] = useState(null);
  const [editData, setEditData] = useState(null);
  const [modal, setModal] = useState(false);
  const toggle = (cmnt) => {
    setModal(!modal);
    setEditData(cmnt);
  };
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
        url={`storyApi/comment/main?story_comment_id=${id}`}
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
            <div>
            <h3>{username}</h3>
            <span className="follow"><img src="/follow-icon.svg" alt=""/>Follow</span>
            </div>
            <span>
              <small className="date_comment">
                {moment(created_at.split("T")[0]).format("MM/DD/YY")}
              </small>
            </span>
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

        <div className={showReply? "d-flex align-items-center justify-content-end mb-3" : "d-flex align-items-center justify-content-between mb-3"}>

        
        {!showReply && (
            <div className="flex">
              <h4
                style={{ cursor: "pointer" }}
                onClick={() => setShowReply(true)}
                className="text-warning reply_text"
              >
                {total_replies > 0 ? `${total_replies} Replies` : ""}
              </h4>
            </div>
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
                            story_comment_id,
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
                  <a onClick={() => setCmntId(story_comment_id)}>Reply</a>
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
          {editData && (
            <StoryCommentEdit
              toggle={toggle}
              modal={modal}
              editData={editData}
              story_comment_id={story_comment_id}
              getComments={getComments}
            />
          )}
          

          </div>
          <StoryCommentReport
            comment={comment}
            toggle={toggleReport}
            modal={modalReport}
          />

          


          <StroryCommentReplyShow
            story_comment_id={story_comment_id}
            setCmntId={setCmntId}
            cmntId={cmntId}
            story_id={story_id}
            showReply={showReply}
            setShowReply={setShowReply
            }
          />
        </div>
      </div>
    </>
  );
};

export default StoryCommentShow;
