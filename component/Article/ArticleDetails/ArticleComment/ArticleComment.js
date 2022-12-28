import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFetchData } from "../../../../utils/api-client";
import Preloader from "../../../Preloader/Preloader";
import ArticleCommentsForm from "./ArticleCommentForm";
import ArticleCommentShow from "./ArticleCommentShow";

const ArticleComments = ({ article_id }) => {
  const auth = useSelector((state) => state.auth);
  const [page, setPage] = useState(0);
  const fetchData = () => {
    setPage(page + 10);
  };
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [count, setCount] = useState([]);
  const [load, setLoad] = useState(true);
  const getComments = useCallback(async () => {
    setLoad(true);
    const data = await getFetchData(
      `articleApi/comment/main?article_id=${article_id}&show=${page}`
    );
    console.log(data)
    setComments([...comments, ...data.data.comment]);
    setCount(data.data.count[0].count);
    setLoading(false);
    setLoad(false);
  }, [article_id, page]);
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
        <div className="article-comments mt-4">
          {/* Form */}
          {auth.user.user_id && (
            <ArticleCommentsForm
              article_id={article_id}
              getComments={getComments}
              scroll={scroll}
            />
          )}
          {comments.map((cm) => (
            <div className="ref mt-5">
              <ArticleCommentShow
                comment={cm}
                key={cm.article_comment_id}
                story_id={article_id}
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
      )}
    </>
  );
};

export default ArticleComments;
