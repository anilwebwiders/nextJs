/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";
import { getAll } from "../../../utils/api-client";
import Preloader from "../../Preloader/Preloader";
import CustomArticles from "./CustomArticles/CustomArticles";
import Paginate from "../../Paginate/Paginate";
import ModalData from "../../Subscribe/LoginSubscription/ModalData";
import { Modal } from "reactstrap";

const SucscribedArticle = ({ type, fetchData, articlePage, auth }) => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const [loader, setloader] = useState(true);
  const [articles, setArticles] = useState([]);
  const [articlesCount, setArticlesCount] = useState([]);

  const pageCount = Math.ceil(articlesCount / 12);

  const getSubscribedArticle = useCallback(async () => {
    if (auth.user.user_id) {
      setloader(true);
      const data = await getAll(
        `articleApi/subscribed?type=${type}&user_id=${auth.user.user_id}&page=${articlePage}`
      );
      setArticles(data.data);
      setArticlesCount(data.count);
      setloader(false);
    }
  }, [articlePage, type, auth]);

  useEffect(() => {
    getSubscribedArticle();
  }, [getSubscribedArticle]);

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
            There are currently no active posts from categories that you are
            subscribed to, you can add or update your community category
            subscription by going here:
          </p>
          <div className="d-flex justify-content-center">
            <button className="main-btn" onClick={toggle}>
              Add Categories
            </button>
          </div>
          {auth.user.username && (
            <Modal isOpen={modal}>
              <div className="categories-modal">
                <ModalData toggle={toggle} auth={auth} />
              </div>
            </Modal>
          )}
        </div>
      ) : (
        <CustomArticles articles={articles} />
      )}
      <Paginate pageCount={pageCount} fetchData={fetchData} />
    </div>
  );
};

export default SucscribedArticle;
