import React, { useCallback, useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { getFetchData } from "../../../../utils/api-client";
import Preloader from "../../../Preloader/Preloader";
import StoryCommentsForm from "./StoryCommentsForm";
import StoryCommentShow from "./StoryCommentShow";

const StoryComments = ({ story_id }) => {
  const auth = useSelector((state) => state.auth);
  const [page, setPage] = useState(0);
  const fetchData = () => {
    setPage(page + 10);
  };
  const [comments, setComments] = useState([]);
  const [count, setCount] = useState([]);
  const [load, setLoad] = useState(true);
  const [loading, setLoading] = useState(true);

  const getComments = useCallback(async () => {
    const data = await getFetchData(
      `storyApi/comment/main?story_id=${story_id}&show=${page}`
    );
    setComments([...comments, ...data.data.comment]);
    setCount(data.data.count[0].count);
    setLoad(false);
    setLoading(false);
  }, [story_id, page]);
  useEffect(() => {
    getComments();
  }, [getComments]);

  useEffect(() => {
    getComments();
  }, []);

  const scroll = () => {
    const section = document.querySelector(".ref");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      {loading ? (
        <h4
          className="text-warning text-center"
          style={{ cursor: "pointer" }}
          onClick={fetchData}
        >
          <Preloader />
        </h4>
      ) : (
        <div className="article-comments">
          {/* Form */}
          {auth.user.user_id && (
            <StoryCommentsForm
              story_id={story_id}
              getComments={getComments}
              scroll={scroll}
            />
          )}
          <div className="comment-show">
          <h2 class="recent-comments__titel">Recent Comments (25)</h2>
          {comments.map((cm) => (
            <div className="ref">
              <StoryCommentShow
                comment={cm}
                key={cm.story_comment_id}
                story_id={story_id}
                getComments={getComments}
              />
            </div>
          ))}
          {count > comments.length && (
            <h4
              className="text-warning text-center"
              style={{ cursor: "pointer" }}
              onClick={fetchData}
            >
              {load ? <Preloader /> : "Show More Comments"}
            </h4>
          )}
          </div>
        </div>
      )}
    </>
  );
};

export default StoryComments;
