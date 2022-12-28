/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAll } from "../../../utils/api-client";
import Paginate from "../../Paginate/Paginate";
import Preloader from "../../Preloader/Preloader";
import CommonArticles from "./CommonArticles/CommonArticles";
import CustomArticles from "./CustomArticles/CustomArticles";

const RecentArticle = ({ type, fetchData, articlePage }) => {
  const { user } = useSelector((state) => state.auth);
  const [loader, setloader] = useState(true);
  const [articles, setArticles] = useState([]);
  const [articlesCount, setArticlesCount] = useState([]);

  const pageCount = Math.ceil(articlesCount / 12);

  const getRecentArticle = useCallback(async () => {

      setloader(true);
      const data = await getAll(`articleApi/recent/${type}?page=${articlePage}&user_id=${user?.user_id}`);
      setArticles(data.data)
      setArticlesCount(data.count)
      setloader(false);

  }, [articlePage, type]);

  useEffect(() => {
    getRecentArticle();
  }, [getRecentArticle]);

  return (
     <div>
     {loader ? (
       <div className="article-stories-box my">
         <span className="text-center">
           <Preloader />
         </span>
       </div>
     ) : (
      <CustomArticles articles={articles} />
     )}
     <Paginate pageCount={pageCount} fetchData={fetchData} />
   </div>
  );
};

export default RecentArticle;
