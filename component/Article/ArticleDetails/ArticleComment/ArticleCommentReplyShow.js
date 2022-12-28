/* eslint-disable @next/next/no-img-element */
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notifyError, notifySuccess } from "../../../../store/notify/action";
import { deleteData, getFetchData } from "../../../../utils/api-client";
import DeleteModal from "../../../Modal/Delete/DeleteModal";
import Preloader from "../../../Preloader/Preloader";
import ArticleCommentReplyReport from "../ReportArticle/ArticleCommentReplyReport";
import ArticleCommentReplyForm from "./ArticleCommentReplyForm";
import ArticleCommentReplyEdit from "./CommentEdit/ArticleCommentReplyEdit";

const ArticleCommentReplyShow = ({
  article_comment_id,
  setCmntId,
  cmntId,
  article_id,
  showReply,
  setShowReply,
}) => {
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
      `articleApi/comment/reply?article_comment_id=${article_comment_id}&show=${page}`
    );
    setR_Comments([...r_comments, ...data.reply]);
    setCount(data.count[0].count);
    setLoad(false);
  }, [article_comment_id, page]);

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
    setEditData(r_comments.find((r) => r.ac_reply_id === id));
  };
  const [reportData, setReportData] = useState(null);
  const [modalReport, setModalReport] = useState(false);
  const toggleReport = (r) => {
    setReportData(r);
    setModalReport(!modalReport);
  };
  const auth = useSelector((state) => state.auth);

  //Delete

  const [modalDelete, setModalDelete] = useState(false);
  const [id, setId] = useState(null);
  const [title, setTitle] = useState(null);
  const toggleDelete = (id, data) => {
    setModalDelete(!modalDelete);
    setId(id);
    setTitle(data);
  };

  const dispatch = useDispatch();
  const [loadDelete, setLoadDelete] = useState(null);
  const deleteComment = async (id) => {
    setLoadDelete(id);
    const data = await deleteData(
      `articleApi/comment/reply?ac_reply_id=${id}`,
      auth.token
    );
    setLoadDelete(null);
    if (data.err) return dispatch(notifyError(data.err));
    getR_Comments();
    if (data.success) return dispatch(notifySuccess(data.success));
  };

  return (
    <>
      <DeleteModal
        toggleDelete={toggleDelete}
        modalDelete={modalDelete}
        auth={auth}
        title={title}
        type={"comment reply"}
        url={`articleApi/comment/reply?ac_reply_id=${id}`}
        redirect={getR_Comments}
      />

      {cmntId === article_comment_id && (
        <ArticleCommentReplyForm
          setCmntId={setCmntId}
          cmntId={cmntId}
          article_id={article_id}
          getR_Comments={getR_Comments}
          setShowReply={setShowReply}
        />
      )}

      {showReply && (
        <>
          <>
            {r_comments.map((r) => (
              <>
                <div className="article-comments-reply reply_div article_comment_box" key={r.ac_reply_id}>
                  
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
                   <div>
                   <h3>{r.username}</h3>
                   
                   </div>
                   <span>
                        <small className="date_comment">{moment(r.created_at.split("T")[0]).format("MM/DD/YY")}</small>
                      </span>
                      
                    </a>
                    </div>
                  
                   

                    <div className="reply-box">
                      {r.ac_reply_text
                        .replace(/\/+/g, "'")
                        .split("\n")
                        .map((str, index) => (
                          <h4 key={index}>{str}</h4>
                        ))}
                      
                    </div>

                    {auth.user.user_id && (
                      <ul>
                        {auth.user.user_id === r.user_id && (
                          <>
                            <span>
                              <li>
                                <a onClick={() => toggle(r.ac_reply_id)}>
                                  Edit
                                </a>
                              </li>
                            </span>
                            <span>
                              <li>
                                <a
                                  onClick={() =>
                                    toggleDelete(
                                      r.ac_reply_id,
                                      r.ac_reply_text
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
                              <a onClick={() => toggleReport(r)}>Report</a>
                            </li>
                          </span>
                        )}
                      </ul>
                    )}
                  </div>
                </div>
              </>
            ))}

            {editData && (
              <ArticleCommentReplyEdit
                toggle={toggle}
                modal={modal}
                editData={editData}
                getR_Comments={getR_Comments}
              />
            )}
            {reportData && (
              <ArticleCommentReplyReport
                reportData={reportData}
                toggle={toggleReport}
                modal={modalReport}
              />
            )}

            <span onClick={() => setShowReply(false)} className="cursor text-warning reply_text">
              Hide Replies
            </span>
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
        </>
      )}
    </>
  );
};

export default ArticleCommentReplyShow;
