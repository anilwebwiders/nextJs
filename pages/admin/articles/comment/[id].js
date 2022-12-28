import { useRouter } from "next/dist/client/router";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ArticlesComment from "../../../../component/Admin/Articles/ArticlesComment";
import Preloader from "../../../../component/Preloader/Preloader";
import PreloaderLg from "../../../../component/Preloader/PreloaderLg";
import { getAll, getFetchData } from "../../../../utils/api-client";
import NotFound from "../../../404";


const AdminStoriesComments = (props) => {
  
  const auth = useSelector((state) => state.auth);
  const router = useRouter();
  const article_id = router.query.id;
  const [page, setPage] = useState(0);
  const fetchData = () => {
    setPage(page + 2);
  };
  const [comments, setComments] = useState([]);
  const [count, setCount] = useState([]);
  const [load, setLoad] = useState(true);
  const [url, setUrl] = useState(
    `comment/main`
  );
  const getComments = useCallback(async () => {
    setLoad(true);
    const data = await getFetchData(`adminApi/articles/${url}?article_id=${article_id}&show=${page}`);
    
    setComments([...comments, ...data.comment]);
    setCount(data.count[0].count);
    setLoad(false);
  }, [article_id, page, url]);
  useEffect(() => {
    getComments();
  }, [getComments]);
  const [status, setStatus] = useState(1);
  const handleOrder = (data) => {
    setStatus(data);
  };
  useEffect(() => {
    if (status == 0) {
      setPage(0);
      setComments([]);
      setCount([]);
      setUrl(
        `comment/main/deleted`
      );
    }
    if (status == 1) {
      setPage(0);
      setComments([]);
      setCount([]);
      setUrl(`comment/main`);
    }
  }, [status]);

  if (auth.loading) return <PreloaderLg />;
  if (auth.user.role === "admin") {
    return (
      <div className="p-5">
        <h4 className="p-2">
          Status:
          <select
            className="m-2"
            name="status"
            onChange={(e) => handleOrder(e.target.value)}
          >
            <option className="text-success" value="1" selected={status == "1"}>
              Active
            </option>
            <option className="text-danger" value="0" selected={status == "0"}>
              In Active
            </option>
          </select>
        </h4>
        <h2>Article: {props.article.data.title}</h2>
       
          <>
            {comments.map((comment) => (
              <ArticlesComment
                comment={comment}
                key={comment.article_comment_id}
                auth={auth}
                getComments={getComments}
                status={status}
              />
            ))}
          </>

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
    );
  } else {
    return <NotFound />;
  }
};

export async function getServerSideProps({ query }) {
  const res = await getAll(`articleApi/getArticleDetails?article_id=${query.id}&user_id="undefined"`);

  return {
    props: { article: res }, // will be passed to the page component as props
  };
}


export default AdminStoriesComments;
