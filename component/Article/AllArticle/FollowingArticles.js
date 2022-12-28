/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";
import { getAll } from "../../../utils/api-client";
import Preloader from "../../Preloader/Preloader";
import CommonArticles from "./CommonArticles/CommonArticles";
import CustomArticles from "./CustomArticles/CustomArticles";
import Paginate from "../../Paginate/Paginate";
import { Modal } from "reactstrap";
const FollowingArticle = ({ type, fetchData, articlePage, auth }) => {
  const [loader, setloader] = useState(true);
  var [articles, setArticles] = useState([]);
  const [articlesCount, setArticlesCount] = useState([]);

  const pageCount = Math.ceil(articlesCount / 12);

  const getFollowingArticle = useCallback(async () => {
    if (auth.user.user_id) {
      setloader(true);
      const data = await getAll(
        `articleApi/following?type=${type}&user_id=${auth.user.user_id}&page=${articlePage}`
      );
      setArticles(data.data);
      setArticlesCount(data.count);
      setloader(false);
    }
  }, [articlePage, type, auth]);

  useEffect(() => {
    getFollowingArticle();
  }, [getFollowingArticle]);
if (articles == undefined) {
    articles = '';
}

  return (
    <div>
      {loader ? (
        <div className="article-stories-box">
          <span className="text-center">
            <Preloader />
          </span>
        </div>
      ) : articles.length === 0 ? (
        <div className="text-center">
          <p className="p-5">
            This feed shows posts from users you are following but there are
            currently no active posts from users on your “following” list.
            <br></br>
            <b> Please follow additional users to fill up this feed.</b>
          </p>
        </div>
      ) : (
        <CustomArticles articles={articles} />
      )}
      <Paginate pageCount={pageCount} fetchData={fetchData} />
    </div>
  );
};

export default FollowingArticle;
