/* eslint-disable @next/next/no-img-element */
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getFetchData } from "../../../../utils/api-client";
import DeleteModal from "../../../Modal/Delete/DeleteModal";
import Preloader from "../../../Preloader/Preloader";
import StoryCommentReplyReport from "../ReportStory/StoryCommentReplyReport";
import StoryCommentReplyEdit from "./EditComents/StoryCommentReplyEdit";
import StoryCommentReplyForm from "./StoryCommentReplyForm";

const StroryCommentReplyShow = ({
  story_comment_id,
  setCmntId,
  cmntId,
  story_id,
  setShowReply,
  showReply,
}) => {
  const auth = useSelector((state) => state.auth);
  const [page, setPage] = useState(0);
  const fetchData = () => {
    setPage(page + 4);
  };
  const [r_comments, setR_Comments] = useState([]);
  const [count, setCount] = useState([]);
  const [load, setLoad] = useState(false);
  const getR_Comments = useCallback(async () => {
    setLoad(true);
    const data = await getFetchData(
      `storyApi/comment/reply?story_comment_id=${story_comment_id}&show=${page}`
    );

    setR_Comments([...r_comments, ...data.reply]);
    setCount(data.count[0].count);
    setLoad(false);
  }, [story_comment_id, page]);

  useEffect(() => {
    getR_Comments();
  }, [getR_Comments]);

  useEffect(() => {
    getR_Comments();
  }, []);

  const [editData, setEditData] = useState(null);
  const [modal, setModal] = useState(false);
  const toggle = (id) => {
    setModal(!modal);
    setEditData(r_comments.find((r) => r.sc_reply_id === id));
  };
  const [reportData, setReportData] = useState(null);
  const [modalReport, setModalReport] = useState(false);
  const toggleReport = (r) => {
    setReportData(r);
    setModalReport(!modalReport);
  };

  //Delete Comment Reply

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
        type={"comment reply"}
        url={`storyApi/comment/reply?sc_reply_id=${id}`}
        redirect={getR_Comments}
      />
      {cmntId === story_comment_id && (
        <StoryCommentReplyForm
          setCmntId={setCmntId}
          cmntId={cmntId}
          story_id={story_id}
          getR_Comments={getR_Comments}
          setShowReply={setShowReply}
        />
      )}

      {showReply && (
        <>
          <>
            {r_comments.map((r) => (
              <>
                <div className="article-comments-reply reply_div" key={r.sc_reply_id}>
                 
                  <div className="text-box">
                   <div className="comment-profile" id="txt">
                   <div className="image-holder">
                    <img
                      src={r.avatar}
                      alt=""
                      className={`img-fluid user_image_rounded`}
                    />
                  </div>
                    <a href={"/user/" + r.user_id + "/" + r.username}>
                      <h3>{r.username}</h3>
                      <span>
                        <small>
                          {moment(r.created_at.split("T")[0]).format(
                            "MM/DD/YY"
                          )}
                        </small>
                      </span>
                    </a>
                    </div>

                    <div className="reply-box">
                      {r.sc_reply_text
                        .replace(/\/+/g, "'")
                        .split("\n")
                        .map((str, index) => (
                          <h4 key={index}>{str}</h4>
                        ))}
                      
                    </div>

                    <div className="d-flex align-items-center justify-content-between">
                    <div></div>
                    {auth.user.user_id && (
                      <ul>
                        {auth.user.user_id === r.user_id && (
                          <>
                            <span>
                              <li>
                                <a onClick={() => toggle(r.sc_reply_id)}>
                                  Edit
                                </a>
                              </li>
                            </span>
                            <span>
                              <li>
                                <a
                                  onClick={() =>
                                    toggleDelete(
                                      r.sc_reply_id,
                                      r.sc_reply_text
                                        .replace(/\/+/g, "'")
                                        .substring(0, 20)
                                    )
                                  }
                                >
                                  Delete
                                </a>
                              </li>
                            </span>
                          </>
                        )}
                        {auth.user.user_id !== r.user_id && (
                          <span>
                            <li>
                              <a onClick={() => toggleReport(r)} className="text-danger">Report</a>
                            </li>
                          </span>
                        )}
                      </ul>
                    )}

                    </div>


                  </div>
                </div>
              </>
            ))}
          </>

          {editData && (
            <StoryCommentReplyEdit
              toggle={toggle}
              modal={modal}
              editData={editData}
              getR_Comments={getR_Comments}
            />
          )}
          {reportData && (
            <StoryCommentReplyReport
              reportData={reportData}
              toggle={toggleReport}
              modal={modalReport}
            />
          )}

         <span onClick={() => setShowReply(false)} className="cursor text-warning reply_text">Hide Replies</span>
          
          {count > r_comments.length &&
            (load ? (
              <Preloader />
            ) : (
              <>
                <span className="ml-5 cursor" onClick={fetchData}>
                  Show More Reply
                </span>
              </>
            ))}

        </>
      )}
    </>
  );
};

export default StroryCommentReplyShow;
