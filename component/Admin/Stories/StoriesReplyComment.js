/* eslint-disable @next/next/no-img-element */
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notifyError, notifySuccess } from "../../../store/notify/action";
import { deleteData, getFetchData } from "../../../utils/api-client";
import Preloader from "../../Preloader/Preloader";
const StoriesReplyComment = ({ story_comment_id, status }) => {
    const auth = useSelector((state) => state.auth);
    const [page, setPage] = useState(0);
    const fetchData = () => {
        setPage(page + 2);
    };

    const [url, setUrl] = useState(
        `comment/reply`
        );
        const [r_comments, setR_Comments] = useState([]);
  const [count, setCount] = useState([]);
  
  useEffect(() => {
      if (status == 0) {
      setPage(0);
      setR_Comments([]);
      setCount([]);
      setUrl(
        `comment/reply/deleted`
        );
    }
    if (status == 1) {
        setPage(0);
        setR_Comments([]);
        setCount([]);
        setUrl(`comment/reply`);
    }
}, [status]);



  const [load, setLoad] = useState(true);
  const getR_Comments = useCallback(async () => {
    setLoad(true);
    const data = await getFetchData(`adminApi/stories/${url}?story_comment_id=${story_comment_id}&show=${page}`);
   
    setR_Comments([...r_comments, ...data.reply]);
    setCount(data.count[0].count);
    setLoad(false);
  }, [story_comment_id, page, url]);
  useEffect(() => {
    getR_Comments();
  }, [getR_Comments]);
  //Delete
  const dispatch = useDispatch();
  const [loadDelete, setLoadDelete] = useState(null);
  const deleteComment = async (id) => {
    setLoadDelete(id);
    const data = await deleteData(
      `storyApi/comment/reply?sc_reply_id=${id}`,
      auth.token
    );
    setLoadDelete(null);
    if (data.success == false) return dispatch(notifyError(data.message));
    getR_Comments();
    if (data.success) return dispatch(notifySuccess(data.message));
  };
  return (
    <div>
      {load ? (
        <Preloader />
      ) : (
        <>
          {r_comments.map((r) => (
            <>
              <div className="article-comments-reply" key={r.sc_reply_id}>
                <div className="image-holder">
                  <img
                    src={r.avatar}
                    alt=""
                    className="img-fluid user_image_rounded"
                  />
                </div>
                <div className="text-box" id="txt">
                  <a href={"/user/" + r.user_id + "/" + r.username}>
                    <h3>{r.username}</h3>
                  </a>

                  <div className="reply-box">
                    <h4>{r.sc_reply_text}</h4>
                    <span>
                          {moment(r.created_at.split("T")[0]).format("MM/DD/YY")}
                    </span>
                  </div>
                    <ul>
                      <span>
                        <li>
                          {loadDelete === r.sc_reply_id ? <a>Deleting</a> : <a onClick={() => deleteComment(r.sc_reply_id)}>Delete</a>}
                        </li>
                      </span>
                    </ul>
                
                </div>
              </div>
            </>
          ))}
        </>
      )}
       {count > r_comments.length && (
        <h5
          className="text-warning text-box ml-5"
          style={{ cursor: "pointer" }}
          onClick={fetchData}
        >
          {load ? <Preloader /> : "Show More Reply"}
        </h5>
      )}
    </div>
  );
};

export default StoriesReplyComment;
